const database = require("../database");

//get all customer details
exports.getCustomers = (request, response) => {
    //sql query to retrieve all customers
    const sql_query = `SELECT * FROM customer`;

    //execute the sql query
    database.query(sql_query, (error, results) =>{
        //if there is a server error
        if(error){
            return response.status(500).json({message: "Error retrieving customers, server error", error: error});
        }
        //if no results are found
        if(results.length === 0){
            return response.status(404).json({message: "No customers found"});
        }
        const customers = results;  //this is the list of customers
        return response.status(200).json({customers: customers});
    });
}

//get customer details by NIC
exports.getCustomerByNic = (request, response) =>{
    //sql query to get customer details by NIC
    const sql_query = `SELECT C.Name, C.NIC, C.Address, C.DOB, C.tel_no, C.Gender, A.Account_no FROM customer C INNER JOIN bankaccount A ON C.CustomerID = A.CustomerID WHERE C.NIC = ?`;

    //execute the sql query
    database.query(sql_query, [request.params.NIC], (error, results) =>{
        if(error){
            return response.status(500).json({message: "Error retreiving customer details, server error", error:error});
        }
        if(results.length === 0){
            return response.status(404).json({message: "No customer found with the given NIC", customer: results});
        }
        // Fetch the last account number in the bankaccount table
        const max_account_no = 'SELECT MAX(Account_no) as max_account_no FROM bankaccount';

        database.query(max_account_no, (account_error, account_result) => {
            if (account_error) {
                return response.status(500).json({ message: "Error retrieving the last account number", error: account_error });
            }

            // Get the last account number or default to 0 if there are no accounts
            const last_account_no = account_result[0].max_account_no || 1000;
            const next_account_no = last_account_no + 1;

            // Get customer details and include the next account number
            const customer = results[0];
            customer.next_account_no = next_account_no; // Add this to the response

            // Return the customer details along with the incremented account number
            return response.status(200).json({ customer: customer });
        });
    });
}

//get customer details by NIC
exports.getCustomerAndAccountByNic = (request, response) =>{
    //sql query to get customer details by NIC
    const sql_query = `SELECT C.CustomerID, C.Name, C.NIC, C.Address, C.DOB, C.tel_no, C.Gender, C.Signature, A.Account_no, A.date_opened, A.balance, AT.account_type_name FROM bankaccount A JOIN customer C ON C.CustomerID = A.CustomerID JOIN accounttype ON A.account_type_id = AT.account_type_id WHERE C.NIC = ?`;

    //execute the sql query
    database.query(sql_query, [request.params.NIC], (error, results) =>{
        if(error){
            return response.status(500).json({message: "Error retreiving customer details, server error", error:error});
        }
        if(results.length === 0){
            return response.status(404).json({message: "No customer found with the given NIC", customer: results});
        }
        const profileDetails = {
            CustomerID: results[0].CustomerID,
            Name: results[0].Name,
            NIC: results[0].NIC,
            Address: results[0].Address,
            DOB: results[0].DOB,
            tel_no: results[0].tel_no,
            Gender: results[0].Gender,
            Signature: results[0].Signature,
            Account_no: results[0].Account_no,
            date_opened: results[0].date_opened,
            balance: results[0].balance,
            account_type_name: results[0].account_type_name,
        }
        response.status(200).send({profile: profileDetails});
    });
}