//require mysql2
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

//create the connection to the database
const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

database.connect((error) =>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Successfully connected to database!");
    }
});

module.exports = database;