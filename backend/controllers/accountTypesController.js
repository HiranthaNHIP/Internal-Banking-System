const database = require("../database");

exports.getAccountTypes = async (request, response) => {
    
    const sql_query = 'SELECT account_type_id, account_type_name, interest_rate FROM accounttype';

    database.query(sql_query, async (error, results) =>{
        if(error){
            return response.status(500).json({message: "Database error!", error: error});
        }
        if(results.length ===0){
            return response.status(404).json({message: "There are no account types in the database"});
        }
        else{
            const account_types = results;    //this is all the results from the database
            return response.status(200).json({account_types: account_types});
        }
    });
}