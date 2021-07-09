class Adapter {
  constructor() {
    this.baseUrl = 'https://ancient-inlet-35124.herokuapp.com/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  get(url) {
    return fetch(url).then(res => res.json());
  }

  fetchTransactions() {
    return this.get(`${this.baseUrl}/accounts/1/transactions`);
  }

  createTransaction(transaction) {
    return  fetch(`${this.baseUrl}/accounts/1/transactions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(transaction)
    })
      .then(response => response.json());
  }

  patchTransaction(transaction, id) {
    return fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(transaction)
    })
      .then(response => response.json());
  }

  destroyTransaction(id) {
    return   fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: null
    })
      .then(response => response.json())
  }
}