//require the database
const database = require("../database");

//export the functions
//get all account details
exports.getAccount = (request, response) =>{
    //write an sql query to get all account details
    const sql_query = `SELECT * FROM bankaccount`;

    //execute the sql query
    database.query(sql_query, (error, results) => {
        //if database error occurs
        if(error){
            return response.status(500).json({ message: "There has been a database error, unable to retrieve data" });
        }
        //if there are no account details
        if(results.length === 0){
            return response.status(404).json({ message: "No account details are found!" });
        }

        //if account details are available
        const accounts = results;
        return response.status(200).json({ accounts: accounts });
    });
}

//get a specefic account detail by account number
exports.getAccountByNumber = (request, response) =>{
    //write an sql query to get all account details
    const sql_query = `SELECT * FROM bankaccount WHERE Account_no = ?`;
    
    //execute the sql query
    database.query(sql_query, [request.params.account_no], (error, results) => {
        //if database error occurs
        if(error){
            return response.status(500).json({ message: "There has been a database error, unable to retrieve data" });
        }
        //if there are no account details
        if(results.length === 0){
            return response.status(404).json({ message: "No account details are found!" });
        }

        //if account details are available
        const accounts = results[0];
        return response.status(200).json({ accounts: accounts });
    });
}

exports.getNextAccountNumber = (request, response) => {
    // Fetch the last account number in the bankaccount table
    const sql_query = 'SELECT MAX(Account_no) as max_account_no FROM bankaccount';

    database.query(sql_query, (account_error, account_result) => {
        if (account_error) {
            return response.status(500).json({ message: "Error retrieving the last account number", error: account_error });
        }
        
        // Get the last account number or default to 0 if there are no accounts
        const last_account_no = account_result[0].max_account_no || 1000;
        const next_account_no = last_account_no + 1;
        
        return response.status(200).json({ next_account_no: next_account_no });
    });
};

// Create a new account
exports.createAccount = (request, response) => {
    // Get the values from the request body
    const { NIC, account_no, account_type_id, interest_rate, customer_name, address, DOB, tel_no, gender, date_opened, branch_id, employee_id } = request.body;
    console.log('Request Body:', request.body);
    console.log('Uploaded File:', request.file);

    if (!signature) {
        return response.status(400).json({ message: 'No file uploaded' });
    }

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
                database.query(insertCustomerQuery, [newCustomerId, customer_name, NIC, address, DOB, tel_no, gender, signature], (error, insertCustomerResult) => {
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
}; // Make sure this is the final closing brace of the `exports.createAccount` function.

// Get account details to display in withdraw and deposit page
exports.getWithdrawAndDepositDetails = (request, response) => {
    const sql_query = `SELECT ba.Account_no, ba.balance, c.Name, c.NIC, c.Signature, at.account_type_name FROM bankaccount ba JOIN customer c ON ba.CustomerID = c.CustomerID JOIN accounttype at ON ba.account_type_id = at.account_type_id WHERE ba.Account_no = ?;`;
                       
    const accountNo = request.params.account_no; // Assuming you're getting Account_no from request parameters

    database.query(sql_query, [accountNo], (error, results) => {
        if (error) {
            return response.status(500).json({ message: 'Error retrieving account details', error: error.message });
        }

        if (results.length === 0) {
            return response.status(404).json({ message: "Account details not found"});
        }
        const accountDetails = {
            Account_no: results[0].Account_no,
            balance: results[0].balance,
            Name: results[0].Name,
            NIC: results[0].NIC,
            Signature: results[0].Signature,
            account_type_name: results[0].account_type_name,
        }
        response.status(200).send({accounts: accountDetails}); // Send the image blob as the response
    });
};




