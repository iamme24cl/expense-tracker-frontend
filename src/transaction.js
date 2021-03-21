class Transaction {
  constructor(transaction) {
    this.id = +transaction.id;
    this.description = transaction.attributes.description;
    this.amount = transaction.attributes.amount; 
    this.kind = transaction.attributes.kind; 
    this.accountBalance = transaction.attributes.account.balance;
    this.totalIncome = transaction.attributes.account.total_income;
    this.totalExpense = transaction.attributes.account.total_expense;
    Transaction.all.push(this);
  }

  static findById(id) {
    return this.all.find(transaction => transaction.id === id);
  }

  renderListItem() {
    let sign = this.kind == "income" ? "+" : "-";

    return `
      <li class="${this.kind}">
        ${this.description} 
        <span class="transaction-amt">${sign}${this.amount}</span>
        <button class="btn btn-danger delete-btn" >
          <i class="fa fa-times" aria-hidden="true" data-id=${this.id}></i>
        </button>
        <button class="btn btn-primery edit-btn" data-id=${this.id}>
          <i class="fa fa-edit"></i>
        </button>
      </li>
    `;
  }

  updateDOM() {
    const balance = document.getElementById('balance');
    const income = document.getElementById('income');
    const expense = document.getElementById('expense');
  
    balance.innerText = `$${this.accountBalance}`;
    if (this.accountBalance < 0) {
      balance.classList.add('negative-balance');
    } else {
      balance.classList.remove('negative-balance');
    }
  
    income.innerText = `+$${this.totalIncome}`;
    expense.innerText = `-$${this.totalExpense}`;
  }

  // renderUpdateForm() {
  //   form.id = "edit-form";
  //   document.getElementById('edit-form').setAttribute('data-id', this.id);
  //   document.getElementById('form-title').innerText = "Edit Transaction";
  //   document.getElementById('description').value = this.description;
  //   document.getElementById('kind').value = this.kind;
  //   document.getElementById('amount').value = this.amount;
  // }


  renderUpdateForm() {
    return `
      <button class="close-btn" id="close">
        <i class="fa fa-times"></i>
      </button>
      <div class="modal-header">
        <h4 id="form-title">Edit Transaction</h4>
      </div>
        <form id="edit-form" class="modal-form" data-id="${this.id}">
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" value="${this.description}" class="form-control">
        </div>

        <div class="form-group">
          <label for="kind">Transaction Kind</label>
          <select class="form-control" id="kind" value="${this.kind}">
            <option>Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>           
          </select>
        </div>
      
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="text" id="amount" value="${this.amount}" class="form-control">
        </div>

        <input type="submit" value="Edit" class="submit-btn btn btn-primary">
      </form>
    `;
  }
}

Transaction.all = [];