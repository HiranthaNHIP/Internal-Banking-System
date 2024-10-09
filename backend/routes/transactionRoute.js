const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to get account numbers by NIC
router.get('/accounts/:NIC', transactionController.getAccountsByNIC);

// Route to get customer and account details by account number
router.get('/account-details/:account_no', transactionController.getAccountDetails);

// Route to handle deposit
router.post('/deposit', transactionController.depositAmount);

// Route to handle withdrawal
router.post('/withdraw', transactionController.withdrawAmount);

module.exports = router;
