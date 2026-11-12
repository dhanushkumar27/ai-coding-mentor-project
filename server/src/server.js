require("dotenv").config();
//dotenv is a Node.js package that loads variables from a .env file into your application's environment.
//"Read the .env file and place all its variables into process.env."

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});