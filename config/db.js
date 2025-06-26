const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'UserDATABASE'
});

async function getconnection() {
    
    try{
        const connection = await pool.getConnection();
        console.log("database connected");
    }catch(err){
        console.log(err);
    }
} 

getconnection();
module.exports = pool;
