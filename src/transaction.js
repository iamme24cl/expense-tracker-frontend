class Transaction {
  constructor(transaction) {
    this.id = transaction.id;
    this.description = transaction.attributes.description;
    this.amount = transaction.attributes.amount; 
    this.kind = transaction.attributes.kind; 
    Transaction.all.push(this);
  }

  renderListItem() {
    let sign = this.kind == "income" ? "+" : "-";

    return `
    <li class="${this.kind}">
      ${this.description} 
      <span class="transaction-amt">${sign}${this.amount}</span>
      <button class="btn btn-danger delete-btn">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </li>
    `
  }
}

Transaction.all = [];