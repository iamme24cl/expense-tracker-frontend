class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async postLogin(data) {
    const res = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return await res.json();
  }

  async get(url) {
    const res = await fetch(url);
    return await res.json();
  }

  fetchTransactions(id) {
    return this.get(`${this.baseUrl}/accounts/${id}/transactions`);
  }

  async createTransaction(transaction, accountID) {
    const response = await fetch(`${this.baseUrl}/accounts/${accountID}/transactions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(transaction)
    });
    return await response.json();
  }

  async patchTransaction(transaction, accountID, id) {
    const response = await fetch(`${this.baseUrl}/accounts/${accountID}/transactions/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(transaction)
    });
    return await response.json();
  }

  async destroyTransaction(accountID, id) {
    const response = await fetch(`${this.baseUrl}/accounts/${accountID}/transactions/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: null
    });
    return await response.json();
  }
}