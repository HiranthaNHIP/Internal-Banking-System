//Require all the node modules to create the server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require('multer'); // For handling file uploads
const path = require('path');
const helmet = require('helmet');


//make the server use express.js
const app = express();
app.use(cors());
app.use(helmet());

// Increase the payload size limit
app.use(express.json()); // Adjust '10mb' to a value suitable for your needs
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
dotenv.config();
app.use(bodyParser.json());

//require the connection to the database
const database = require("./database");

const storage = multer.diskStorage({
    destination: (request, file, cb) =>{
        cb(null, 'public/images')
    },
    filename: (request, file, cb) =>{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
})

app.post("/accounts/create", upload.single('signature'), (request, response) => {
    // console.log(request.file);
    // Get the values from the request body
    const { NIC, account_no, account_type_id, interest_rate, customer_name, address, DOB, tel_no, gender, date_opened, branch_id, employee_id } = request.body;
    console.log('Request Body:', request.body);
    console.log('Uploaded File:', request.file);
    const image = request.file.filename;

    let customerId;
    let newCustomerId;

    // Step 1: Check if the customer already exists
    const checkCustomerQuery = `SELECT CustomerID FROM customer WHERE NIC = ?`;
    database.query(checkCustomerQuery, [NIC], (error, customerResults) => {
        if (error) {
            return response.status(500).json({ message: 'Error checking customer', error: error.message });
        }

        if (customerResults.length > 0) {
            // Customer exists, retrieve their CustomerID
            customerId = customerResults[0].CustomerID;
            createBankAccount(customerId); // Proceed to create the bank account
        } else {
            // Step 2: Create a new customer if the NIC does not exist
            const getLastCustomerIdQuery = `SELECT CustomerID FROM customer ORDER BY CustomerID DESC LIMIT 1`;
            database.query(getLastCustomerIdQuery, (error, lastCustomerResult) => {
                if (error) {
                    return response.status(500).json({ message: 'Error retrieving last customer ID', error: error.message });
                }

                // Generate the new CustomerID
                if (lastCustomerResult.length > 0) {
                    const lastCustomerId = lastCustomerResult[0].CustomerID;
                    const numericPart = parseInt(lastCustomerId.replace('CUST', ''), 10); 
                    newCustomerId = `CUST${(numericPart + 1).toString().padStart(3, '0')}`;
                } else {
                    newCustomerId = 'CUST001';
                }

                // Insert new customer into the database
                const insertCustomerQuery = `INSERT INTO customer (CustomerID, Name, NIC, Address, DOB, tel_no, Gender, Signature) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                database.query(insertCustomerQuery, [newCustomerId, customer_name, NIC, address, DOB, tel_no, gender, image], (error, insertCustomerResult) => {
                    if (error) {
                        return response.status(500).json({ message: 'Error creating customer', error: error.message });
                    }

                    // Proceed to create the bank account for the new customer
                    customerId = newCustomerId;
                    createBankAccount(customerId);
                });
            });
        }
    });
    // Step 3: Function to create a bank account
    function createBankAccount(customerId) {
        const insertBankAccountQuery = `INSERT INTO bankaccount (account_no, CustomerID, account_type_id, date_opened, interest_rate, balance, branch_id, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        database.query(insertBankAccountQuery, [account_no, customerId, account_type_id, date_opened, interest_rate, 0, branch_id, employee_id], (error, bankAccountInsertResult) => {
            if (error) {
                return response.status(500).json({ message: 'Error creating bank account', error: error.message });
            }

            // Respond with success message
            return response.status(200).json({
                message: 'Bank account created successfully',
                customerId,
                accountNumber: account_no
            });
        });
    }
});

//Import the routes for the backend application
const authentication_routes = require("./routes/authenticationRoutes");
const customer_routes = require("./routes/customerRoutes");
const account_routes = require("./routes/accountRoutes");
const branch_routes = require("./routes/branchRoutes");
const transaction_routes = require("./routes/transactionRoute");
const accountTypes_routes = require("./routes/accountTypesRoute");
const employee_routes = require("./routes/employeeRoutes");

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
//use the employee routes
app.use("/employees", employee_routes);


//console log the port the backend server is running on
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});