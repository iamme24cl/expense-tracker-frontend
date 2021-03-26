const app = new App();



// Get all Transactions & Attach Event Listeners upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  app.attachEventListeners();

  app.createTransactions();
});
