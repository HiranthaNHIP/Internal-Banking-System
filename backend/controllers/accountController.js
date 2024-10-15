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

//create a new account
exports.createAccount = (request, response) => {
    // Get the values from the request body
    const { NIC, account_type_id, interest_rate, customer_name, address, DOB, Tel, Gender, date_opened, branch_id, employee_id } = request.body;

    database.getConnection((error, connection) => {
        if(error){
            return response.status(500).json({ message: "There has been a database error, unable to create a connection" });
        }

        connection.beginTransaction((error) => {
            if(error){
                return response.status(500).json({ message: "Failed to start transaction", error: error });
            }

            // Check if customer exists by NIC
            const checkCustomerQuery = `SELECT CustomerID FROM customer WHERE NIC = ?`;
            connection.query(checkCustomerQuery, [NIC], (error, customerResults) => {
                if (error) {
                    return connection.rollback(() => {
                        return response.status(500).json({ message: "Failed to check customer details", error: error });
                    });
                }

                let customerId;

                if (customerResults.length > 0) {
                    // Customer exists, get their CustomerID
                    customerId = customerResults[0].CustomerID;
                } else {
                    // Customer does not exist, so we need to insert new customer details

                    // Get the last CustomerID and generate the new one
                    const getLastCustomerIdQuery = `SELECT CustomerID FROM customer ORDER BY CustomerID DESC LIMIT 1`;
                    connection.query(getLastCustomerIdQuery, (error, lastCustomerResult) => {
                        if (error) {
                            return connection.rollback(() => {
                                return response.status(500).json({ message: "Failed to get customer id", error: error });
                            });
                        }

                        let newCustomerId;
                        if (lastCustomerResult.length > 0) {
                            const lastCustomerId = lastCustomerResult[0].CustomerID;
                            const numericPart = parseInt(lastCustomerId.replace('CUST', ''), 10); // Get numeric part (e.g., 005)
                            newCustomerId = `CUST${(numericPart + 1).toString().padStart(3, '0')}`; // Increment and format (e.g., CUST006)
                        } else {
                            newCustomerId = 'CUST001'; // First customer if no records exist
                        }

                        // Insert new customer details
                        const insertCustomerQuery = `INSERT INTO customer (CustomerID, Name, NIC, Address, DOB, tel_no, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                        connection.query(insertCustomerQuery, [newCustomerId, customer_name, NIC, address, DOB, Tel, Gender], (error, customerInsertResult) => {
                            if (error) {
                                return connection.rollback(() => {
                                    return response.status(500).json({ message: "Failed to insert customer details", error: error });
                                });
                            }

                            // Set customerId for account creation
                            customerId = newCustomerId;

                            // Proceed to create the account
                            createBankAccount();
                        });
                    });
                }

                // If customer exists, create bank account
                if (customerId) {
                    createBankAccount();
                }

                // Function to handle bank account creation
                function createBankAccount() {
                    // Get the last account number and generate the new one
                    const getLastAccountNoQuery = `SELECT account_no FROM bankaccount ORDER BY account_no DESC LIMIT 1`;
                    connection.query(getLastAccountNoQuery, (error, accountResults) => {
                        if (error) {
                            return connection.rollback(() => {
                                return response.status(500).json({ message: "Failed to retrieve last Account Number", error: error });
                            });
                        }

                        let newAccountNo;
                        if (accountResults.length > 0) {
                            newAccountNo = accountResults[0].account_no + 1; // Increment the last account number
                        } else {
                            newAccountNo = 1001; // First account number if no records exist
                        }

                        // Insert into BankAccount table
                        const insertBankAccountQuery = `INSERT INTO bankaccount (account_no, CustomerID, account_type_id, date_opened, interest_rate, balance, branch_id, employee_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                        connection.query(insertBankAccountQuery, [newAccountNo, customerId, account_type_id, date_opened, interest_rate, 0, branch_id, employee_id], (error, bankAccountInsertResult) => {
                            if (error) {
                                return connection.rollback(() => {
                                    return response.status(500).json({ message: "Failed to create bank account", error: error });
                                });
                            }

                            // Commit the transaction if everything is successful
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        return response.status(500).json({ message: "Transaction commit failed", error: err });
                                    });
                                }
                                return response.status(200).json({ message: "Customer and Bank Account created successfully", customerId: customerId, accountNumber: newAccountNo });
                            });
                        });
                    });
                }
            });
        });
    });
};


