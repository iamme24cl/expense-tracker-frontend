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
      .then(response => response.json());
  }

  patchTransaction(transaction, id) {
    return fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(response => response.json());
  }

  destroyTransaction(id) {
    return   fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/js",
        "Accept": "application/js"
      },
      body: null
    })
      .then(response => response.json())
  }
}