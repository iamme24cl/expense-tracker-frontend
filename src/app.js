class App {
  attachEventListeners() {
    document.getElementById('transactions-list').addEventListener('click', e => {
      console.log('clicked');
    });

    const toggleBtn = document.getElementById('toggle');
    const modal = document.getElementById('modal');
    const openModal = document.getElementById('open');
    const closeModal = document.getElementById('close');
    const updateModal = document.getElementById('update-modal');
    const closeUpdateModal = document.getElementById('close-update-modal');
    const createForm = document.getElementById('form');

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
    createForm.addEventListener('submit', event => {
      event.preventDefault();
      const description = document.getElementById('description').value;
      const kind = document.getElementById('kind').value;
      const amount = +document.getElementById('amount').value;
      const transaction = {
        description: description,
        amount: amount,
        kind: kind
      };
      addNewTransaction(transaction);
      modal.classList.remove('show-modal');
      event.target.reset();
    });
  }

  attatchBtnEventListeners() {
    const editBtns = Array.from(document.getElementsByClassName('edit-btn')); 
    
    editBtns.forEach (btn => {
      btn.addEventListener('click', e => {
        const editId = +e.target.dataset.id;
        // console.log(editId);
        showUpdateForm(editId);
        
      });
    });
  
    const deleteBtns = Array.from(document.getElementsByClassName('delete-btn')); 
  
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const deleteId = +e.target.dataset.id;
        
        deleteTransaction(deleteId);
      });
    });
  }
}