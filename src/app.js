class App {
  constructor() {
    this.adapter = new Adapter();
    this.updateDOMValues = this.updateDOMValues.bind(this);
    this.init = this.init.bind(this);
    this.createTransactions = this.createTransactions.bind(this);
    this.addNewTransaction = this.addNewTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.createFormHandler = this.createFormHandler.bind(this);
    this.updateFormHandler = this.updateFormHandler.bind(this);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('toggle');
    const modal = document.getElementById('modal');
    const openModal = document.getElementById('open');
    const closeModal = document.getElementById('close');
    const updateModal = document.getElementById('update-modal');
    const closeUpdateModal = document.getElementById('close-update-modal');
    const createForm = document.getElementById('form');
    const editForm = document.getElementById('edit-form');

    // Toggle nav
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('show-nav');
    });

    // Show Create form Modal 
    openModal.addEventListener('click', () => {
      modal.classList.add('show-modal');
    });

    // Close  Create form Modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show-modal');
    });

    // Close Update form Modal
    closeUpdateModal.addEventListener('click', () => {
      updateModal.classList.remove('show-modal');
    });


    // Close Modal on outside click
    window.addEventListener('click', e => {
      e.target == modal ? modal.classList.remove('show-modal') : false;
      if (e.target == modal) {
        modal.classList.remove('show-modal');
      } else if (e.target == updateModal) {
        updateModal.classList.remove('show-modal');
      } 
    });

    // Listen to submit event on form for new transaction
    createForm.addEventListener('submit', event => this.createFormHandler(event));

    // Listen to submit event on form for updating transaction
    editForm.addEventListener('submit', event => this.updateFormHandler(event));
  }

  // Attactch Event Listeners to all `edit` and `delete` buttons
  // that are generated dynamically
  attatchBtnEventListeners() {
    const editBtns = Array.from(document.getElementsByClassName('edit-btn')); 
    
    editBtns.forEach (btn => {
      btn.addEventListener('click', e => {
        const editID = +e.target.dataset.id;
        // console.log(editId);
        this.showUpdateForm(editID);
        
      });
    });
  
    const deleteBtns = Array.from(document.getElementsByClassName('delete-btn')); 
  
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const deleteID = +e.target.dataset.id;
        
        this.adapter.destroyTransaction(deleteID).then(data => this.deleteTransaction(data));
      });
    });
  }

  // Update the DOM with number values
  updateDOMValues(transaction) {
    const balance = document.getElementById('balance');
    const income = document.getElementById('income');
    const expense = document.getElementById('expense');

    balance.innerText = `$${transaction.accountBalance}`;
    if (transaction.accountBalance < 0) {
      balance.classList.add('negative-balance');
    } else {
      balance.classList.remove('negative-balance');
    }

    income.innerText = `+$${transaction.totalIncome}`;
    expense.innerText = `-$${transaction.totalExpense}`;
  }

  // Reset Transactions list and render content and values
  init() {
    const list = document.getElementById('transactions-list');
    list.innerHTML = '';

    Transaction.all.forEach(transaction => {
      list.innerHTML += transaction.renderListItem();
      this.updateDOMValues(transaction);
    });

    if (Transaction.all.length === 0) {
      document.getElementById('balance').innerText = `$${0}`;
      document.getElementById('income').innerText = `$${0}`;
      document.getElementById('expense').innerText = `$${0}`;
    }
    
    this.attatchBtnEventListeners();  
  }

  // Create transactions from fetched data and display them in the DOM
  createTransactions() {
    this.adapter.fetchTransactions().then(transactions => {
      transactions.data.forEach(transaction => {
        // console.log(transaction);
        new Transaction(transaction);      
      });

      this.init();
    }); 
  }

  // Add New transaction and update DOM
  addNewTransaction(transaction) {
    new Transaction(transaction);

    this.init(); 
  }

  // Update transaction and update DOM
  updateTransaction(transaction, id) {
    const data = {
      description: transaction.description,
      kind: transaction.kind,
      amount: transaction.amount,
      accountBalance: transaction.account.balance,
      totalExpense:  transaction.account.total_expense,
      totalIncome: transaction.account.total_income
    }

    const updatedTransaction = Transaction.findById(+id);

    Object.assign(updatedTransaction, data);

    this.init();  
  }

  // Delete Transaction and update the DOM
  deleteTransaction(data) {   
    // console.log(data);
    alert(data.message);

    Transaction.all = [];
    
    this.createTransactions();
  }

  // Show Update Form Modal, insert existing data, attach event listener to the 
  // update form, and render it
  showUpdateForm(id) {
    document.getElementById('update-modal').classList.add('show-modal');

    const transactionID = id;
    const transaction = Transaction.findById(transactionID);
    transaction.insertUpdateFormData();
  };

  // Form Handlers --------------------------------------

  createFormHandler(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const kind = document.getElementById('kind').value;
    const amount = +document.getElementById('amount').value;

    const transaction = {
      description: description,
      amount: amount,
      kind: kind
    };
    
    this.adapter.createTransaction(transaction).then(newTransaction => this.addNewTransaction(newTransaction.data)).catch(error => console.log(error));
    // addNewTransaction(transaction);
    modal.classList.remove('show-modal');
    event.target.reset();
  }

  updateFormHandler(event) {
    event.preventDefault();

    const id = +event.target.dataset.id;
    const description = document.getElementById('edit-description').value;
    const kind = document.getElementById('edit-kind').value;
    const amount = +document.getElementById('edit-amount').value;

    const transaction = {
      description: description,
      amount: amount,
      kind: kind
    };
    
    this.adapter.patchTransaction(transaction, id).then(updatedData => this.updateTransaction(updatedData.data.attributes, updatedData.data.id)).catch(error => console.log(error));

    document.getElementById('update-modal').classList.remove('show-modal');
  }
}