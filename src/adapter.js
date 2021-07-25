class Adapter {
  constructor() {
    this.baseUrl = 'https://ancient-inlet-35124.herokuapp.com/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async get(url) {
    const res = await fetch(url);
    return await res.json();
  }

  fetchTransactions() {
    return this.get(`${this.baseUrl}/accounts/1/transactions`);
  }

  async createTransaction(transaction) {
    const response = await fetch(`${this.baseUrl}/accounts/1/transactions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(transaction)
    });
    return await response.json();
  }

  async patchTransaction(transaction, id) {
    const response = await fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(transaction)
    });
    return await response.json();
  }

  async destroyTransaction(id) {
    const response = await fetch(`${this.baseUrl}/accounts/1/transactions/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: null
    });
    return await response.json();
  }
}