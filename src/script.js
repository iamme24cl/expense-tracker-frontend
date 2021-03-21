const expenseApi = 'http://localhost:3000/api/v1/accounts/1/transactions';
const list = document.getElementById('transactions-list');
const toggleBtn = document.getElementById('toggle');
const openModal = document.getElementById('open');
const closeModal = document.getElementById('close');
const modal = document.getElementById('modal');
const formModal = document.getElementById('form-modal');
const formTitle = document.getElementById('form-title');


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
          btn.addEventListener('click', () => {
            // console.log(+btn.dataset.id);
            modal.classList.add('show-modal');

            const id = +btn.dataset.id;
            const transaction = Transaction.findById(id);
            formModal.innerHTML = transaction.renderUpdateForm();

            const closeModal = document.getElementById('close');

            // Close Modal
            closeModal.addEventListener('click', () => {
              modal.classList.remove('show-modal');
            });

            const editForm = document.getElementById('edit-form');
            editForm.addEventListener('submit', event => {
              event.preventDefault();
              console.log("submitted")
            });
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

// Show Modal and Reset the form
openModal.addEventListener('click', () => {
  modal.classList.add('show-modal');
  // const editform = document.getElementById('edit-form');
  // if (editForm !== null) {
  //   editForm.id = 'form';
  // }
  // const form = document.getElementById('form');

  // form.setAttribute('data-id', '');
  // form.reset();
  // document.getElementById('form-title').innerText = "Add Transaction";
  const form = document.createElement('form');
  form.id = 'form';
  form.setAttribute('class', 'modal-form');
  formTitle.innerText = "Add Transaction"

  form.innerHTML = `
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" placeholder="Enter description" class="form-control">
      </div>

      <div class="form-group">
        <label for="kind">Transaction Kind</label>
        <select class="form-control" id="kind">
          <option>Select</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>           
        </select>
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="text" id="amount" placeholder="Enter amount" class="form-control">
      </div>

      <input type="submit" value="Submit" class="submit-btn btn btn-primary">
  `;
  formModal.i



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
form.addEventListener('submit', event => {
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

