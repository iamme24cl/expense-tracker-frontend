const adapter = new Adapter();
const app = new App();

// Attach all Event Listeners and initialize
// fetching and creating transactions  upon DOM Load
document.addEventListener('DOMContentLoaded', () => {
  let loggedIn = false

  app.attachEventListeners();

  adapter.postLogin({name: "demo", password: "demo"})
  .then(data => {
    console.log('data:', data)
    app.createTransactions(data.id); 
    loggedIn = true
  })
  .catch((error) => {
    console.log('Error:', error);
  });

  setTimeout(() => {
    console.log(loggedIn);
  }, 1000);
});

