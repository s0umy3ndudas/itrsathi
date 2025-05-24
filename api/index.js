const app = require('./app'); // Ensure this imports the app correctly

const PORT =  5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
