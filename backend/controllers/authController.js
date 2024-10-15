const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require("../database");
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

let loginAttempts = {}; // Store login attempts and timeouts

//register function for employees
exports.login = async (request, response) => {
    //retrieve username and password from the request body
    const { username, password, recaptchaToken } = request.body;

    try{
        // Verify reCAPTCHA
        const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Get your reCAPTCHA secret key from environment variables
        const recaptcha_response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`);
        const { success } = recaptcha_response.data;

        if (!success) {
            return response.status(400).json({ msg: 'reCAPTCHA verification failed' });
        }

        //sql query to select all employees with the given username and password
        const sql_query = `SELECT * FROM employees WHERE Username = ?`;

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
            const user = results[0];    //this is the user we found from the database
            // Check login attempts and lock duration
            const userAttempts = loginAttempts[username] || { count: 0, lockedUntil: null };
            if (userAttempts.lockedUntil && new Date() < userAttempts.lockedUntil) {
                return response.status(429).json({ message: `Account locked. Try again after ${Math.ceil((userAttempts.lockedUntil - new Date()) / 1000)} seconds.` });
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password); //check if the password matches
            if(!isPasswordMatch){   //If the password is not matching
                userAttempts.count++;
                if (userAttempts.count >= 3) {
                    userAttempts.lockedUntil = new Date(Date.now() + (userAttempts.count === 3 ? 30000 : 60000)); // Lock for 30 seconds then increase to 1 minute
                }
                loginAttempts[username] = userAttempts;
                return response.status(401).json({message: "Invalid username or password!"});
            }
            // If credentials are correct, generate a JWT token
            const payload = {
                user: {
                    employee_id: user.employee_id,
                    branch_id: user.branch_id,
                    first_name: user.first_name,
                    position: user.position,
                },
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;

                    // Send the response with the generated token
                    response.status(200).json({ message: "Login successful", token: token, user: payload.user });

                    // Reset login attempts on successful login
                    delete loginAttempts[username];
                }
            );
        });
    }catch(error){
        console.error(error.message);
        response.status(500).json({ msg: 'Server error' });
    }
}


//register function for new employees
exports.register = (request, response) =>{
    //retrieve the values from the request body
    const { employee_id, branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, password, phone_number, dateof_joined } = request.body;
    
    // Hash the password before saving to the database
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return response.status(500).json({ message: "Error hashing password", error: err });
        }

        // Insert query to insert the new employee into the employee table
        const sql_query = `INSERT INTO employees (employee_id, branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, password, phone_number, dateof_joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Execute the SQL query
        database.query(sql_query, [employee_id, branch_id, first_name, last_name, Address, Gender, email, DOB, position, Username, hash, phone_number, dateof_joined], (error, results) => {
            // If there is a server error
            if (error) {
                return response.status(500).json({ message: "Error registering the user, please try again later", error: error });
            } else {
                // If the user is successfully registered
                return response.status(201).json({ message: "User is registered successfully" });
            }
        });
    });
}
