const express = require('express');
const router = express.Router();
const { getAccountTypes } = require('../controllers/accountTypesController');

//get all account types
router.get('/', getAccountTypes);

module.exports = router;