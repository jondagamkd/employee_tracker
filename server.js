const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
//app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Inquirer Prompt For First Set of Choices
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Welcome to the Employee Tracker, please choose from the following options:',
            name: 'mainChoice',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee,', 'Update an employee role']
        }
    ])
    .then(function(data) {

        //console.log('Success!');
        //console.log('You choice was: ' + data.mainChoice)

        // Get all stuff
        if (data.mainChoice === 'View all departments') {
            const sql = `SELECT * FROM department`;
            
            db.query(sql, (err, rows) => {
                if (err) {
                console.log('error line 50')
                return;
                }
                // res.json({
                // message: 'success',
                // data: rows
                console.table(rows)
                });
            //});
        }
        else {
            console.log('You choice was: ' + data.mainChoice)
        }





        });


  });
});
