const baseUrl = 'http://localhost:3000/api/v1';
const expenseApi = `${baseUrl}/accounts/1/transactions`;
const app = new App();


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

//
function createTransactions() {
  app.adapter.fetchTransactions().then(transactions => {
    transactions.data.forEach(transaction => {
      console.log(transaction);
      new Transaction(transaction);      
    });
    init();
  }); 
}

// Add New transaction
function addNewTransaction(transaction) {
  new Transaction(transaction);

  init(); 
}

// Update Transaction
function updateTransaction(transaction) {
  const body = {
    description: transaction.description,
    kind: transaction.kind,
    amount: transaction.amount
  };
  
  fetch(`${expenseApi}/${transaction.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
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

      init();
    });
  
}

// Delete Transaction
function deleteTransaction(transactionId) {
  fetch(`${expenseApi}/${transactionId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/js",
      "Accept": "application/js"
    },
    body: null
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(data.message);

      Transaction.all = [];
      createTransactions();

      // Transaction.all = Transaction.all.filter(transaction => transaction.id !== transactionId);
      // init();
    });
}

// Show Update Form Modal, insert existing data, attach event listener to the 
// update form, and render it
function showUpdateForm(id) {
  document.getElementById('update-modal').classList.add('show-modal');

  const transaction_id = id;
  const transaction = Transaction.findById(transaction_id);
  transaction.insertUpdateFormData();
};

// Form Handlers --------------------------------------

function createFormHandler(event) {
  event.preventDefault();

  const description = document.getElementById('description').value;
  const kind = document.getElementById('kind').value;
  const amount = +document.getElementById('amount').value;

  const transaction = {
    description: description,
    amount: amount,
    kind: kind
  };
  
  app.adapter.createTransaction(transaction).then(newTransaction => addNewTransaction(newTransaction.data));
  // addNewTransaction(transaction);
  modal.classList.remove('show-modal');
  event.target.reset();
}

function updateFormHandler(event) {
  event.preventDefault();

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
  document.getElementById('update-modal').classList.remove('show-modal');
}


// Reset Transactions list and render content and values
function init() {
  const list = document.getElementById('transactions-list');
  list.innerHTML = '';

  Transaction.all.forEach(t => {
    list.innerHTML += t.renderListItem();
    updateDOMValues(t);
  });
  if (Transaction.all.length === 0) {
    document.getElementById('balance').innerText = `$${0}`;
    document.getElementById('income').innerText = `$${0}`;
    document.getElementById('expense').innerText = `$${0}`;
  }
  app.attatchBtnEventListeners();  
}


// Get all Transactions & Attach Event Listeners upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  app.attachEventListeners();

  createTransactions();
});
