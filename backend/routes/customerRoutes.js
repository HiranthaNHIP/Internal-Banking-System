const express = require("express");
const router = express.Router();
const { getCustomers, getCustomerByNic, getCustomerAndAccountByNic } = require("../controllers/customerController");

//get all customer details from customerController
router.get("/", getCustomers);

//get customer and account details from customerController
router.get("/customer-account/:NIC", getCustomerAndAccountByNic);

//get customer details by NIC from customerController
router.get("/:NIC", getCustomerByNic);

module.exports = router;