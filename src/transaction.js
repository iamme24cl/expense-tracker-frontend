class Transaction {
  constructor(transaction) {
    this.id = transaction.id;
    this.description = transaction.attributes.description;
    this.amount = transaction.attributes.amount; 
    this.kind = transaction.attributes.kind; 
    this.accountBalance = transaction.attributes.account.balance;
    this.totalIncome = transaction.attributes.account.total_income;
    this.totalExpense = transaction.attributes.account.total_expense;
    Transaction.all.push(this);
  }

  renderListItem() {
    let sign = this.kind == "income" ? "+" : "-";

    return `
    <li class="${this.kind}">
      ${this.description} 
      <span class="transaction-amt">${sign}${this.amount}</span>
      <button class="btn btn-danger delete-btn" data-id=${this.id}>
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <button class="btn btn-primery edit-btn" data-id=${this.id}>
        <i class="fa fa-edit"></i>
      </button>
    </li>
    `
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

  renderUpdateForm() {
    form.id = "edit-form";
    document.getElementById('edit-form').setAttribute('data-id', this.id);
    document.getElementById('form-title').innerText = "Edit Transaction";
    document.getElementById('description').value = this.description;
    document.getElementById('kind').value = this.kind;
    document.getElementById('amount').value = this.amount;
  }
}

Transaction.all = [];