//require express and account Controller methods
const express = require("express");
const router = express.Router();
const { getAccount, getAccountByNumber, createAccount, getNextAccountNumber } = require("../controllers/accountController");

//create the get endpoint for getting all account details from accountController
router.get("/", getAccount);

//create the get endpoint for getting account details by account number from accountController
router.get("/:account_no", getAccountByNumber);

//create the post endpoint for creating a new account from accountController
router.post("/create", createAccount);

//create the get endpoint for getting the next account number from accountController
router.get("/next", getNextAccountNumber);

module.exports = router;