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