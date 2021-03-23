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
      <li class="${this.kind} transaction-li">
        ${this.description} 
        <span class="transaction-amt">${sign}${this.amount}</span>
        <button class="btn btn-primery edit-btn" data-id=${this.id}>
          <i class="fa fa-edit" data-id=${this.id}></i>
        </button>
        <button class="btn btn-danger delete-btn" >
          <i class="fa fa-times" aria-hidden="true" data-id=${this.id}></i>
        </button>
      </li>
    `;
  }

  // updateDOM() {
  //   const balance = document.getElementById('balance');
  //   const income = document.getElementById('income');
  //   const expense = document.getElementById('expense');
  
  //   balance.innerText = `$${this.accountBalance}`;
  //   if (this.accountBalance < 0) {
  //     balance.classList.add('negative-balance');
  //   } else {
  //     balance.classList.remove('negative-balance');
  //   }
  
  //   income.innerText = `+$${this.totalIncome}`;
  //   expense.innerText = `-$${this.totalExpense}`;
  // }

  renderUpdateFormData() {
    document.getElementById('edit-form').setAttribute('data-id', this.id);
    document.getElementById('edit-description').value = this.description;
    document.getElementById('edit-kind').value = this.kind;
    document.getElementById('edit-amount').value = this.amount;
  }
}

Transaction.all = [];