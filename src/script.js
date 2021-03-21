const expenseApi = 'http://localhost:3000/api/v1/accounts/1/transactions';
const list = document.getElementById('transactions-list');
const toggleBtn = document.getElementById('toggle');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const editForm = document.getElementById('edit-form');


// Fetch transactions from api
function getTransactions() {
  fetch(expenseApi)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(transaction => {
        // console.log(transaction);
        // addTransactionsToDOM(transaction);
        const newTransaction = new Transaction(transaction);
        list.innerHTML += newTransaction.renderListItem();
       

        newTransaction.updateDOM();
        const editBtns = Array.from(document.getElementsByClassName('edit-btn'));
        const deleteBtns = Array.from(document.getElementsByClassName('delete-btn'));

        editBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            console.log(btn.dataset.id);
            // console.log(e);
          });
        });

        deleteBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            // console.log(btn.dataset.id);
            console.log(e.target.dataset.id);
          });
        });
      });
    });
}

// Add Transactions to DOM
// function addTransactionsToDOM(transaction) {

//   const list = document.getElementById('transactions-list');
//   let sign = transaction.attributes.kind == "income" ? "+" : "-";
//   const transactionLi = document.createElement('li');

//   transactionLi.innerHTML = `
//   <li class="${transaction.attributes.kind}">
//     ${transaction.attributes.description} 
//     <span class="transaction-amt">${sign}${transaction.attributes.amount}</span>
//     <button class="btn btn-danger delete-btn">
//       <i class="fa fa-times" aria-hidden="true"></i>
//     </button>
//   </li>
//   `
//   list.appendChild(transactionLi);

//   updateDOM(transaction);
// }

// Update the number values in DOM
// function updateDOM(transaction) {
//   const balance = document.getElementById('balance');
//   const accountBalance = transaction.attributes.account.balance;
//   const income = document.getElementById('income');
//   const expense = document.getElementById('expense');

//   balance.innerText = `$${accountBalance}`;
//   if (accountBalance < 0) {
//     balance.classList.add('negative-balance');
//   } else {
//     balance.classList.remove('negative-balance');
//   }

//   income.innerText = `+$${transaction.attributes.account.total_income}`;
//   expense.innerText = `-$${transaction.attributes.account.total_expense}`;
// }

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
      t.updateDOM();
    });
    // .then(newTransaction => console.log(newTransaction.data));
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

// Show Modal
openModal.addEventListener('click', () => {
  modal.classList.add('show-modal');
  form.id = "form";
});

// Close Modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

// Close Modal on outside click
window.addEventListener('click', e => {
  e.target == modal ? modal.classList.remove('show-modal') : false;
});

// 
form.addEventListener('submit', e => {
  e.preventDefault();
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
  e.target.reset();
});

// Show modal when a transaction li is clicked;

// listItems.forEach(item => {
//   console.log(item);
// });
