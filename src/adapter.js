class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1';
  }

  fetchTransactions() {
    return fetch(`${this.baseUrl}/accounts/1/transactions`).then(res => res.json());
  }

  createTransaction(transaction) {
    return  fetch(`${this.baseUrl}/accounts/1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(response => response.json())
  }

  patchTransaction() {
    
  }
}