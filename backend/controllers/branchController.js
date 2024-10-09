const database = require("../database");

//get all customer details
exports.getBranches = (request, response) => {
    //sql query to retrieve all customers
    const sql_query = `SELECT * FROM bankbranch`;

    //execute the sql query
    database.query(sql_query, (error, results) =>{
        //if there is a server error
        if(error){
            return response.status(500).json({message: "Error retrieving branch details, server error", error: error});
        }
        //if no results are found
        if(results.length === 0){
            return response.status(404).json({message: "No branches found"});
        }
        const branches = results;  //this is the list of customers
        return response.status(200).json({Branches: branches});
    });
}

//get customer details by NIC
exports.getBranchById = (request, response) =>{
    //sql query to get customer details by NIC
    const sql_query = `SELECT * FROM bankbranch WHERE branch_id = ?`;

    //execute the sql query
    database.query(sql_query, [request.params.id], (error, results) =>{
        if(error){
            return response.status(500).json({message: "Error retreiving branch details, server error", error:error});
        }
        if(results.length === 0){
            return response.status(404).json({message: "No branch found with the given id"});
        }

        const branch = results[0];
        return response.status(200).json({Branch: branch});
    });
}