class App {
  constructor() {
    this.adapter = new Adapter();

    this.init = this.init.bind(this);
    this.updateDOMValues = this.updateDOMValues.bind(this);
    this.createTransactions = this.createTransactions.bind(this);
    this.addNewTransaction = this.addNewTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.resetTransactions = this.resetTransactions.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
    this.loginFormHandler = this.loginFormHandler.bind(this);
    this.demoHandler = this.demoHandler.bind(this);
    this.signUpFormHandler = this.signUpFormHandler.bind(this);
    this.createFormHandler = this.createFormHandler.bind(this);
    this.updateFormHandler = this.updateFormHandler.bind(this);
    this.loggedIn = false;
  }

  attachEventListeners() {
    const login = document.getElementById('login');
    const demo = document.getElementById('demo-account');
    const signup = document.getElementById('signup');
    const loginModal = document.getElementById('login-modal')
    const closeLoginModal = document.getElementById('close-login-modal')
    const modal = document.getElementById('modal');
    const openModal = document.getElementById('open');
    const closeModal = document.getElementById('close');
    const updateModal = document.getElementById('update-modal');
    const closeUpdateModal = document.getElementById('close-update-modal');
    const loginForm = document.getElementById('login-form');
    const signUpForm = document.getElementById('signup-form')
    const createForm = document.getElementById('form');
    const editForm = document.getElementById('edit-form');
    const mode = document.getElementById('mode');
    const signUpBtn = document.getElementById('sign-up');
    const signupModal = document.getElementById('signup-modal');
    const closeSignupModal = document.getElementById('close-signup-modal');
    
    
    login.addEventListener('click', () => {
      loginModal.classList.remove('hide-modal');
    })

    demo.addEventListener('click', (event) => {
      this.demoHandler(event);
    })

    signup.addEventListener('click', () => {
      signupModal.classList.add('show-modal');
    })

    // Close Login form Modal
    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.add('hide-modal');
      console.log('click')
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

    // Redirect from login to sign up form
    signUpBtn.addEventListener('click', () => {
      loginModal.classList.add('hide-modal')
      signupModal.classList.add('show-modal')
      console.log('clcic')
    })

    // Close Sign Up Modal
    closeSignupModal.addEventListener('click', () => {
      signupModal.classList.remove('show-modal')
    })


    // Close Modal on outside click
    window.addEventListener('click', e => {
      e.target == modal ? modal.classList.remove('show-modal') : false;
      if (e.target == modal) {
        modal.classList.remove('show-modal');
      } else if (e.target == updateModal) {
        updateModal.classList.remove('show-modal');
      } 
    });

    // Toggle Dark and Light Mode
    mode.addEventListener('click', () => {
      mode.classList.toggle('dark-mode')
      document.body.classList.toggle('mode');
      document.getElementById('inc-exp-container').classList.toggle('mode');
      document.getElementById('transactions-list').classList.toggle('mode');
    });

    // Listen to enter keydown on login form
    loginForm.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
       this.loginFormHandler(event);
      }
    })

    // Listen to submit event on login form
    loginForm.addEventListener('submit', event => this.loginFormHandler(event));

    // Listen to submit event on signup form
    signUpForm.addEventListener('submit', event => this.signUpFormHandler(event))

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
        const id = +e.target.dataset.id;
        const transaction = Transaction.findById(id)
        this.adapter.destroyTransaction(transaction.accountID, id)
          .then(data => this.resetTransactions(data));
      });
    });
  }

  // Update the DOM with current Account balances
  updateDOMValues(transaction) {
    
    const balance = document.getElementById('balance');
    const income = document.getElementById('income');
    const expense = document.getElementById('expense');
    
    const account = Account.findById(transaction.accountID);
   
    balance.innerText = `$${account.balance}`;
    if (account.balance < 0) {
      balance.classList.add('negative-balance');
    } else {
      balance.classList.remove('negative-balance');
    }
  
    income.innerText = `+$${account.totalIncome}`;
    expense.innerText = `-$${account.totalExpense}`;
  }

  // Reset Transactions list and render content and values
  init() {
    const heading = document.getElementById('heading');
    // Set the heading of the page with current Account Name
    heading.innerHTML = `Welcome back ${Account.all[0].name}`

    const list = document.getElementById('transactions-list');
    list.innerHTML = '';

    Transaction.all.forEach(transaction => {
      list.innerHTML += transaction.renderListItem();
      this.updateDOMValues(transaction);
    });

    // Set balances to $0 when Transaction array is empty -- no transaction left for reference
    if (Transaction.all.length === 0) {
      document.getElementById('balance').innerText = `$${0}`;
      document.getElementById('income').innerText = `$${0}`;
      document.getElementById('expense').innerText = `$${0}`;
    }
    
    this.attatchBtnEventListeners();  
  }

  // Create transactions from fetched data and display them in the DOM
  createTransactions(accountID) {
    this.adapter.fetchTransactions(accountID)
      .then(transactions => {
        transactions.data.forEach(transaction => {
          // console.log(transaction);
          const newTransaction = new Transaction(transaction); 
        
          newTransaction.updateAccount(transaction);
        });

      this.init();
    }); 
  }

  // Add New transaction and update DOM
  addNewTransaction(transaction) {
    new Transaction(transaction).updateAccount(transaction);

    this.init(); 
  }

  // Update transaction and update DOM
  updateTransaction(transaction) {
    const data = {
      description: transaction.attributes.description,
      kind: transaction.attributes.kind,
      amount: transaction.attributes.amount,
      accountID: +transaction.attributes.account.id
    }

    const transactionToUpdate = Transaction.findById(+transaction.id);

    transactionToUpdate.update(data);

    transactionToUpdate.updateAccount(transaction);

    this.init();  
  }

  // Reset the Transactions array and refetch Transactions
  resetTransactions(data) {   
    Transaction.all = [];
    this.createTransactions(data.id);
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
  loginFormHandler(event) {
    const loginModal = document.getElementById('login-modal')

    event.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const loginData = {name, password}

    this.adapter.postLogin(loginData)
    .then(data => {
      console.log('data:', data)
      this.createTransactions(data.id); 
      data.id ? this.loggedIn = true : false
    })
    .catch((error) => {
      alert('Error:', error);
    });

    console.log(this.loggedIn)
    setTimeout(() => {
      console.log(this.loggedIn);
    }, 1000);

    loginModal.classList.add('hide-modal');
  }

  demoHandler(event) {
    event.preventDefault();
    const loginModal = document.getElementById('login-modal')

    const name = "demo";
    const password = "demo";

    const demoData = {name, password}

    this.adapter.postLogin(demoData)
    .then(data => {
      console.log('data:', data)
      this.createTransactions(data.id); 
      data.id ? this.loggedIn = true : false
    })
    .catch((error) => {
      alert('Error:', error);
    });

    console.log(this.loggedIn)
    setTimeout(() => {
      console.log(this.loggedIn);
    }, 1000);

    loginModal.classList.add('hide-modal')
  }

  signUpFormHandler(event) {
    const signUpModal = document.getElementById('signup-modal')

    event.preventDefault();
    const name = document.getElementById('newName').value;
    const password = document.getElementById('newPassword').value;

    const signUpData = {account: {name, password}}

    this.adapter.postSignUp(signUpData)
    .then(data => {
      console.log('data:', data)
      const newAccount = new Account(data.id, data.name)
      this.createTransactions(newAccount.id); 
      data.id ? this.loggedIn = true : false
    })
    .catch((error) => {
      alert('Error:', error);
    });

    console.log(this.loggedIn)
    setTimeout(() => {
      console.log(this.loggedIn);
    }, 1000);

    signUpModal.classList.remove('show-modal')
  }


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
    
    this.adapter.createTransaction(transaction, Account.all[0].id)
      .then(newTransaction => this.addNewTransaction(newTransaction.data))
      .catch(error => console.log(error));

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
    
    this.adapter.patchTransaction(transaction, transaction.accountID, id)
      .then(updatedData => this.updateTransaction(updatedData.data))
      .catch(error => console.log(error));

    document.getElementById('update-modal').classList.remove('show-modal');
  }
}