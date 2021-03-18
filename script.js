const expenseApi = 'http://localhost:3000/api/v1/accounts/1/transactions';

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
document.addEventListener('DOMContentLoaded', () => {
  getTransactions();
});