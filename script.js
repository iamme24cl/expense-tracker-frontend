const expenseApi = 'http://localhost:3000/api/v1/accounts/1/transactions';
const toggleBtn = document.getElementById('toggle');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('transactions-list');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const modal = document.getElementById('modal');
const form = document.getElementById('form');

// Toggle nav
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

// Show Modal
openModal.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

// Close Modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

// Close Modal on outside click
window.addEventListener('click', e => {
  e.target == modal ? modal.classList.remove('show-modal') : false;
});


// Fetch transactions from api
function getTransactions() {
  fetch(expenseApi)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(transaction => {
        console.log(transaction);
        addTransactionsToDOM(transaction);
      });
    });
}

// Add Transactions to DOM
function addTransactionsToDOM(transaction) {
  
}



// Event Listeners
// Get transactions upon DOM load
// document.addEventListener('DOMContentLoaded', () => {
//   getTransactions();
// });