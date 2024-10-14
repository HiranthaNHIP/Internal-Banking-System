//Require all the node modules to create the server
const express = require("express");
const cors = require("cors");
const bodyParer = require("body-parser");
const dotenv = require("dotenv");

//make the server use express.js
const app = express();
app.use(express.json());

//configure the server to use cors, body-parser and dotenv file
app.use(cors());
app.use(bodyParer.json());
dotenv.config();

//require the connection to the database
require("./database");

//Import the routes for the backend application
const authentication_routes = require("./routes/authenticationRoutes");
const customer_routes = require("./routes/customerRoutes");
const account_routes = require("./routes/accountRoutes");
const branch_routes = require("./routes/branchRoutes");
const transaction_routes = require("./routes/transactionRoute");
const accountTypes_routes = require("./routes/accountTypesRoute");

//Use the important routes
app.get("/", (request, response) =>{
    response.send("Welcome to the home endpoint of the backend server!");
});
//use the authentication routes
app.use("/auth", authentication_routes);
//use the customer routes
app.use("/customers", customer_routes);
//use the account routes
app.use("/accounts", account_routes);
//use the branch routes
app.use("/branches", branch_routes);
//use the transaction routes
app.use("/transactions", transaction_routes);
//use the account types routes
app.use("/accountTypes", accountTypes_routes);


//console log the port the backend server is running on
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});