const express = require("express");
const router = express.Router();
const { getBranches, getBranchById } = require("../controllers/branchController");

//get all customer details from customerController
router.get("/", getBranches);

//get customer details by NIC from customerController
router.get("/:id", getBranchById);

module.exports = router;