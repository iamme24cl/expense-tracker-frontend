class Transaction {
  constructor(transaction) {
    this.id = +transaction.id;
    this.description = transaction.attributes.description;
    this.amount = transaction.attributes.amount; 
    this.kind = transaction.attributes.kind; 
    this.accountID = +transaction.attributes.account.id
    
    Transaction.all.push(this);
  }

  static findById(id) {
    return this.all.find(transaction => transaction.id === id);
  }

  updateAccount(transaction) {
    const account = Account.findById(this.accountID);

    if (account !== undefined) {      
      account.updateAccountBalances(transaction);
    } else {
      const newAccount = new Account(this.accountID);

      newAccount.updateAccountBalances(transaction);
    }
  }



  renderListItem() {
    let sign = this.kind == "income" ? "+" : "-";

    return `
      <li class="${this.kind} transaction-li">
        ${this.description} <span class="transaction-amt">${sign}${this.amount}</span>        

        <button class="btn btn-primery edit-btn" data-id=${this.id}>
          <i class="fa fa-edit" data-id=${this.id}></i>
        </button>

        <button class="btn btn-danger delete-btn" data-id=${this.id}>
          <i class="fa fa-times" aria-hidden="true" data-id=${this.id}></i>
        </button>
      </li>
    `;
  }

  insertUpdateFormData() {
    document.getElementById('edit-form').setAttribute('data-id', this.id);
    document.getElementById('edit-description').value = this.description;
    document.getElementById('edit-kind').value = this.kind;
    document.getElementById('edit-amount').value = this.amount;
  }

  update(transaction) {
    Object.assign(this, transaction);
  }
}

Transaction.all = [];