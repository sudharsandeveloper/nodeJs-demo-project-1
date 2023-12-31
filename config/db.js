const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_demo_project_1'
})

connection.connect((err) => {
    if(err){
        console.log('Error:', err);
        return
    }
    console.log('MySQL Database connected');
});

module.exports = connection;