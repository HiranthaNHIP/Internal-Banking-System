const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require("../database");
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

//register function for employees
exports.login = async (request, response) => {
    //retrieve username and password from the request body
    const { username, password, recaptchaToken } = request.body;

    // Manually validate the input fields
    if(!username || !password || !recaptchaToken){
        return response.status(400).json({ message: 'Invalid Username or Password!' });
    }
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return response.status(400).json({ message: 'Invalid Username!' });
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return response.status(400).json({ message: 'Invalid Password' });
    }
    if (!recaptchaToken || typeof recaptchaToken !== 'string' || recaptchaToken.trim() === '') {
        return response.status(400).json({ message: 'reCAPTCHA token is required' });
    }

    try {
        // Verify reCAPTCHA
        const secretKey = process.env.RECAPTCHA_SECRET_KEY; 
        const recaptcha_response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`);
        const { success } = recaptcha_response.data;
    
        if (!success) {
            return response.status(400).json({ msg: 'reCAPTCHA verification failed' });
        }
    
        // SQL query to select the user with the given username
        const sql_query = `SELECT * FROM employees WHERE Username = ?`;
    
        // Execute the SQL query
        database.query(sql_query, [username], async (error, results) => {
            if (error) {
                return response.status(500).json({ message: "Database error", error: error });
            }
    
            if (results.length === 0) {
                return response.status(401).json({ message: "Invalid username or password" });
            }
    
            const user = results[0];    
            const isPasswordMatch = await bcrypt.compare(password, user.password); 
    
            if (!isPasswordMatch) {
                return response.status(401).json({ message: "Invalid username or password!" });
            }
    
            // Query to get the branch name of the user based on the branch_id
            const branchQuery = `SELECT branch_name FROM bankbranch WHERE branch_id = ?`;
            database.query(branchQuery, [user.branch_id], (branchError, branchResults) => {
                if (branchError) {
                    return response.status(500).json({ message: "Database error", error: branchError });
                }
    
                if (branchResults.length === 0) {
                    return response.status(404).json({ message: "Branch not found" });
                }
    
                const branch_name = branchResults[0].branch_name;

                const payload = {
                    user: {
                        employee_id: user.employee_id,
                        branch_id: user.branch_id,
                        branch_name: branch_name, // Add the branch name to the payload
                        first_name: user.first_name,
                        position: user.position,
                    },
                };
                
                // Generate the JWT token with a 10-second expiration
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '1h' }, // Set expiration to 10 seconds for testing
                    (err, token) => {
                        if (err) throw err;
                
                        // Send the response with the generated token
                        response.status(200).json({ message: "Login successful", token: token, user: payload.user });
                    }
                );
            });
        });
    }catch(error){
        console.error(error.message);
        response.status(500).json({ msg: 'Server error' });
    }
}


// Register function for new employees
exports.register = (request, response) => {
    // Retrieve the values from the request body
    const { branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, password, phone_number, dateof_joined } = request.body;
    console.log("Request Body:", request.body);

    // First, get the last employee_id
    const getLastEmployeeIdQuery = `SELECT MAX(employee_id) AS lastId FROM employees`;
    database.query(getLastEmployeeIdQuery, (error, results) => {
        if (error) {
            return response.status(500).json({ message: "Error retrieving the last employee ID", error: error });
        }
        console.log(results);
        // Get the last employee_id and increment it
        const lastId = results[0].lastId || 0; // If no employees exist, start from 0
        const newEmployeeId = lastId + 1;

        // Hash the password before saving to the database
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return response.status(500).json({ message: "Error hashing password", error: err });
            }

            // Insert query to insert the new employee into the employee table
            const sql_query = `INSERT INTO employees (employee_id, branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, password, phone_number, dateof_joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            // Execute the SQL query
            database.query(sql_query, [newEmployeeId, branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, hash, phone_number, dateof_joined], (error, results) => {
                // If there is a server error
                if (error) {
                    return response.status(500).json({ message: "Error registering the user, please try again later", error: error });
                } else {
                    // If the user is successfully registered
                    return response.status(201).json({ message: "User is registered successfully" });
                }
            });
        });
    });
}

