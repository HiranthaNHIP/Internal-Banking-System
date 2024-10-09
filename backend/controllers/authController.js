const bcrypt = require("bcrypt");
const database = require("../database");

//register function for employees
exports.login = (request, response) => {
    //retrieve username and password from the request body
    const { username, password } = request.body;

    //sql query to select all employees with the given username and password
    const sql_query = `SELECT * FROM employees WHERE username = ?`;

    //execute the sql query
    database.query(sql_query, [username], async (error, results) =>{
        //if there is an error, return the error
        if(error){
            return response.status(500).json({message: "Database error", error: error});
        }
        //check if there are any results, 0 results means that the username or password doesnt exist
        if(results.length ===0){
            return response.status(401).json({message: "Invalid username or password"});
        }
        else{
            const user = results[0];    //this is the user we found from the database
            const isPasswordMatch = await bcrypt.compare(password, user.password); //check if the password matches
            if(!isPasswordMatch){   //If the password is not matching
                return response.status(401).json({message: "Invalid username or password!"});
            }

            //find the role/position of the logged-in user
            const position = user.position.toLowerCase();
            if(position === "manager"){
                //create the JWT token and pass the token to the manager with the expiration time, role
                
                //return the response along with the generated token
                return response.status(200).json({message: "Manager login was successful!"});
            }
            else{
                //create the JWT token and pass the token to the employee with the expiration time, role
                
                //return the response along with the generated token
                return response.status(200).json({message: "Employee login was successful!"});
            }
        }
    });
}


//register function for new employees
exports.register = (request, response) =>{
    //retrieve the values from the request body
    const { username, password, position, email, branch_id, first_name, last_name, phone_number } = request.body;
    
    //Insert query to insert the new employee into the employee table
    const sql_query = `INSERT INTO employees (username, password, position, email, branch_id, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    //execute the sql query
    database.query(sql_query, [username, password, position, email, branch_id, first_name, last_name, phone_number], (error, results) =>{
        //if there is a server error
        if(error){
            return response.status(500).json({ message: "Error registering the user, please try again later", error: error });
        }
        else{
            //if the user is successfully registered
            return response.status(201).json({ message: "User is registered successfully" });
        }
    });
}