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

// Reset Transactions list and render content and values
function init() {
  const list = document.getElementById('transactions-list');
  list.innerHTML = '';

  Transaction.all.forEach(transaction => {
    list.innerHTML += transaction.renderListItem();
    updateDOMValues(transaction);
  });

  if (Transaction.all.length === 0) {
    document.getElementById('balance').innerText = `$${0}`;
    document.getElementById('income').innerText = `$${0}`;
    document.getElementById('expense').innerText = `$${0}`;
  }
  
  app.attatchBtnEventListeners();  
}

// Create transactions from fetched data and display them in the DOM
function createTransactions() {
  app.adapter.fetchTransactions().then(transactions => {
    transactions.data.forEach(transaction => {
      // console.log(transaction);
      new Transaction(transaction);      
    });

    init();
  }); 
}

// Add New transaction and update DOM
function addNewTransaction(transaction) {
  new Transaction(transaction);

  init(); 
}

// Update transaction and update DOM
function updateTransaction(transaction, id) {
  const data = {
    description: transaction.description,
    kind: transaction.kind,
    amount: transaction.amount,
    accountBalance: transaction.account.balance,
    totalExpense:  transaction.account.total_expense,
    totalIncome: transaction.account.total_income
  }

  const updatedTransaction = Transaction.findById(+id);

  Object.assign(updatedTransaction, data);

  init();  
}

// Delete Transaction and update the DOM
function deleteTransaction(data) {   
  // console.log(data);
  alert(data.message);

  Transaction.all = [];
  
  createTransactions();
}

// Show Update Form Modal, insert existing data, attach event listener to the 
// update form, and render it
function showUpdateForm(id) {
  document.getElementById('update-modal').classList.add('show-modal');

  const transactionID = id;
  const transaction = Transaction.findById(transactionID);
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
  
  app.adapter.createTransaction(transaction).then(newTransaction => addNewTransaction(newTransaction.data)).catch(error => console.log(error));
  // addNewTransaction(transaction);
  modal.classList.remove('show-modal');
  event.target.reset();
}

function updateFormHandler(event) {
  event.preventDefault();

  const id = +event.target.dataset.id;
  const description = document.getElementById('edit-description').value;
  const kind = document.getElementById('edit-kind').value;
  const amount = +document.getElementById('edit-amount').value;

  const transaction = {
    description: description,
    amount: amount,
    kind: kind
  };
  
  app.adapter.patchTransaction(transaction, id).then(updatedData => updateTransaction(updatedData.data.attributes, updatedData.data.id)).catch(error => console.log(error));

  document.getElementById('update-modal').classList.remove('show-modal');
}

// Get all Transactions & Attach Event Listeners upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  app.attachEventListeners();

  createTransactions();
});
