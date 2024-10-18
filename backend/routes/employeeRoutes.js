const express = require("express");
const router = express.Router();
const { getEmployee } = require("../controllers/employeeController");

//create the post endpoint for employee retreival
router.get("/:branchID", getEmployee);

module.exports = router;