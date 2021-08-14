class Account {
  constructor(id, name) {
    this.id = +id,
    this.name = name,
    this.balance = 0,
    this.totalIncome = 0,
    this.totalExpense = 0
    
    Account.all.push(this);
  }

  static findById(id) {
    return this.all.find(account => account.id === id);
  }

  updateAccountBalances(transaction) {
    this.balance = transaction.attributes.account.balance;
    this.totalIncome = transaction.attributes.account.total_income;
    this.totalExpense = transaction.attributes.account.total_expense;
  }
}

Account.all = [];