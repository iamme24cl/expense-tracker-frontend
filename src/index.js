const app = new App();

// Attach all Event Listeners and initialize
// fetching and creating transactions  upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  app.attachEventListeners();

  app.createTransactions();
  const mode = document.getElementById('mode');
  
  mode.addEventListener('click', () => {
    document.body.classList.toggle('mode');
    document.getElementById('inc-exp-container').classList.toggle('mode');
    document.getElementsByClassName('fa-edit').classList.toggle('mode');
  });
});

