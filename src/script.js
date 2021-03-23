const expenseApi = 'http://localhost:3000/api/v1/accounts/1/transactions';
const list = document.getElementById('transactions-list');
const toggleBtn = document.getElementById('toggle');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const modal = document.getElementById('modal');
const updateModal = document.getElementById('update-modal');
const closeUpdateModal = document.getElementById('close-update-modal');
const createForm = document.getElementById('form');



// Fetch transactions from api
function getTransactions() {
  fetch(expenseApi)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(transaction => {
        // console.log(transaction);
        // addTransactionsToDOM(transaction);
        const newTransaction = new Transaction(transaction);
        const li = newTransaction.renderListItem();
        list.innerHTML += li;
       

        updateDOM(transaction);

        
        const editBtns = Array.from(document.getElementsByClassName('edit-btn')); 
        editBtns.forEach (btn => {
          btn.addEventListener('click', e => {
            const id = +e.target.dataset.id;
            console.log(id);
            renderUpdateForm(id);
            
          });
        });
        const deleteBtns = Array.from(document.getElementsByClassName('delete-btn')); 

        deleteBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            // console.log(btn.dataset.id);
            console.log(+e.target.dataset.id);
          });
        });

      });
    });
}

// Update the DOM with number values
function updateDOM(transaction, li) {
  const balance = document.getElementById('balance');
  const income = document.getElementById('income');
  const expense = document.getElementById('expense');
  const accountBalance = transaction.attributes.account.balance;

  balance.innerText = `$${accountBalance}`;
  if (accountBalance < 0) {
    balance.classList.add('negative-balance');
  } else {
    balance.classList.remove('negative-balance');
  }

  income.innerText = `+$${transaction.attributes.account.total_income}`;
  expense.innerText = `-$${transaction.attributes.account.total_expense}`;
}



// Add New transaction
function addNewTransaction(transaction) {
  fetch(expenseApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
    .then(response => response.json())
    .then(newTransaction => {
      // addTransactionsToDOM(newTransaction.data);
      const t = new Transaction(newTransaction.data);
      list.innerHTML += t.renderListItem();
      updateDOM(newTransaction.data);

    });
    // .then(newTransaction => console.log(newTransaction.data));
}

// Update Transaction
function updateTransaction(transaction) {
  fetch(`${expenseApi}/${transaction.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
    .then(response => response.json())
    .then(updatedData => {
      console.log(updatedData.data);
      const data = {
        description: updatedData.data.attributes.description,
        kind: updatedData.data.attributes.kind,
        amount: updatedData.data.attributes.amount
      }
      const updatedTransaction = Transaction.findById(+updatedData.data.id);
      Object.assign(updatedTransaction, data);
      init();
      updateDOM(updatedData.data);
    });
}


// Event Listeners
// Get transactions upon DOM load
document.addEventListener('DOMContentLoaded', () => {
  getTransactions();
  
});


// Toggle nav
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

// Show create form Modal 
openModal.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

// Close  create form Modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

// Close Update Form Modal
closeUpdateModal.addEventListener('click', () => {
  updateModal.classList.remove('show-modal');
});


// Close Modal on outside click
window.addEventListener('click', e => {
  e.target == modal ? modal.classList.remove('show-modal') : false;
  if (e.target == modal) {
    modal.classList.remove('show-modal');
  } else if (e.target == updateModal) {
    updateModal.classList.remove('show-modal');
  } 
});

// 
createForm.addEventListener('submit', event => {
  event.preventDefault();
  const description = document.getElementById('description').value;
  const kind = document.getElementById('kind').value;
  const amount = +document.getElementById('amount').value;
  const transaction = {
    description: description,
    amount: amount,
    kind: kind
  };
  addNewTransaction(transaction);
  modal.classList.remove('show-modal');
  event.target.reset();
});

function renderUpdateForm(id) {
  updateModal.classList.add('show-modal');

  const transaction_id = id;
  const transaction = Transaction.findById(transaction_id);
  transaction.renderUpdateFormData();


  const editForm = document.getElementById('edit-form');
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log("submitted");
    const transactionId = +event.target.dataset.id;
    const description = document.getElementById('edit-description').value;
    const kind = document.getElementById('edit-kind').value;
    const amount = +document.getElementById('edit-amount').value;
    const updatedTransaction = {
      id: transactionId,
      description: description,
      amount: amount,
      kind: kind
    };
    updateTransaction(updatedTransaction);
    updateModal.classList.remove('show-modal');
  });
};


function init() {
  list.innerHTML = '';

  Transaction.all.forEach(t => {
    list.innerHTML += t.renderListItem()
  });

  const editBtns = Array.from(document.getElementsByClassName('edit-btn')); 
  
  editBtns.forEach (btn => {
    btn.addEventListener('click', e => {
      const id = +e.target.dataset.id;
      console.log(id);
      renderUpdateForm(id);
      
    });
  });

  const deleteBtns = Array.from(document.getElementsByClassName('delete-btn')); 

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // console.log(btn.dataset.id);
      console.log(+e.target.dataset.id);
    });
  });
}




