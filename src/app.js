class App {
  constructor() {
    this.adapter = new Adapter();
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
    createForm.addEventListener('submit', event => createFormHandler(event));

    // Listen to submit event on form for updating transaction
    editForm.addEventListener('submit', event => updateFormHandler(event));
  }

  // Attactch Event Listeners to all `edit` and `delete` buttons
  // that are generated dynamically
  attatchBtnEventListeners() {
    const editBtns = Array.from(document.getElementsByClassName('edit-btn')); 
    
    editBtns.forEach (btn => {
      btn.addEventListener('click', e => {
        const editID = +e.target.dataset.id;
        // console.log(editId);
        showUpdateForm(editID);
        
      });
    });
  
    const deleteBtns = Array.from(document.getElementsByClassName('delete-btn')); 
  
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const deleteID = +e.target.dataset.id;
        
        this.adapter.destroyTransaction(deleteID).then(data => deleteTransaction(data));
      });
    });
  }
}