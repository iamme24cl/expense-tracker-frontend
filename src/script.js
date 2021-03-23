const baseUrl = 'http://localhost:3000';
const expenseApi = `${baseUrl}/api/v1/accounts/1/transactions`;
const list = document.getElementById('transactions-list');
const toggleBtn = document.getElementById('toggle');
const modal = document.getElementById('modal');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const updateModal = document.getElementById('update-modal');
const closeUpdateModal = document.getElementById('close-update-modal');
const createForm = document.getElementById('form');


// Fetch all the transactions from Backend
function getTransactions() {
  fetch(expenseApi)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(transaction => {
        // console.log(transaction);
        const newTransaction = new Transaction(transaction);
       
        init(newTransaction);
      });
    });
}

// Update the DOM with number values
function updateDOMValues(transaction) {
  const balance = document.getElementById('balance');
  const income = document.getElementById('income');
  const expense = document.getElementById('expense');

  balance.innerText = `$${transaction.accountBalance}`;
  if (transaction.accountBalance < 0) {
    balance.classList.add('negative-balance');
  } else {
    balance.classList.remove('negative-balance');
  }

  income.innerText = `+$${transaction.totalIncome}`;
  expense.innerText = `-$${transaction.totalExpense}`;
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
    .then(newData => {
      const newTransaction = new Transaction(newData.data);

      // list.innerHTML += t.renderListItem();
      // updateDOM(newData.data);
      init(newTransaction);
    });
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
        amount: updatedData.data.attributes.amount,
        accountBalance: updatedData.data.attributes.account.balance,
        totalExpense:  updatedData.data.attributes.account.total_expense,
        totalIncome: updatedData.data.attributes.account.total_income
      }
      const updatedTransaction = Transaction.findById(+updatedData.data.id);
      Object.assign(updatedTransaction, data);

      init(updatedTransaction);
    });
}

// Show Update Form Modal, insert existing data, attach event listener to the 
// form, and render it
function renderUpdateForm(id) {
  updateModal.classList.add('show-modal');

  const transaction_id = id;
  const transaction = Transaction.findById(transaction_id);
  transaction.insertUpdateFormData();

  const editForm = document.getElementById('edit-form');
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log("submitted");
    const transactionId = +event.target.dataset.id;
    const description = document.getElementById('edit-description').value;
    const kind = document.getElementById('edit-kind').value;
    const amount = +document.getElementById('edit-amount').value;
    const transaction = {
      id: transactionId,
      description: description,
      amount: amount,
      kind: kind
    };
    updateTransaction(transaction);
    updateModal.classList.remove('show-modal');
  });
};

// Reset Transactions list and render content and values
function init(transaction) {
  list.innerHTML = '';

  Transaction.all.forEach(t => {
    list.innerHTML += t.renderListItem()
  });
  updateDOMValues(transaction);
  attatchBtnEventListeners();
  
}

// Attach Event Listeners ------------------------------------------------------

// Attach listeners to all `edit` & `delete` btns that are generated dynamically
function attatchBtnEventListeners() {
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

// Get all Transactions & Attach Event Listeners upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  getTransactions();

  // Toggle nav
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
  });

  // Show Create form Modal 
  openModal.addEventListener('click', () => {
    modal.classList.add('show-modal');
  });

  // Close  Create form Modal
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

  // Listen to submit event on form for new transaction
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
  
});








