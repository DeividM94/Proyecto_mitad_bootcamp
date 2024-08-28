const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'job'
});

//test 

connection.connect((err)=>{
  if (err){
    console.log(err.stack);
    return;
    
  }
  console.log("Conectado a db");
})

module.exports = connection;