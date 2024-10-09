const express = require("express");
const router = express.Router();
const { getCustomers, getCustomerByNic } = require("../controllers/customerController");

//get all customer details from customerController
router.get("/", getCustomers);

//get customer details by NIC from customerController
router.get("/:NIC", getCustomerByNic);

module.exports = router;