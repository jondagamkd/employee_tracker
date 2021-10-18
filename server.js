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

// Default response for any other request (Not Found)
app.use((req, res) => {
  console.log('error line 16');
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    function questions() {
    // Inquirer Prompt For First Set of Choices
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'Welcome to the Employee Tracker, please choose from the following options:',
                name: 'mainChoice',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
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
                    console.log('error line 48')
                    return;
                    }
                    console.table(rows)
                    questions()
                    });
                
            }
            else if (data.mainChoice === 'View all roles') {
                const sql = `SELECT role.*, department.name 
                AS department_name 
                FROM role 
                LEFT JOIN department 
                ON role.department_id = department.id`;
                
                db.query(sql, (err, rows) => {
                    if (err) {
                    console.log('error line 64')
                    return;
                    }
                    console.table(rows)
                    questions()
                    });

            }
            else if (data.mainChoice === 'View all employees') {
                const sql = `SELECT 
                employee.id AS employee_id, 
                employee.first_name AS first_name, 
                employee.last_name AS last_name, 
                role.title AS job_title,
                department.name AS department,
                role.salary AS salarie,
                employee.manager_id AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id;`;
                
                db.query(sql, (err, rows) => {
                    if (err) {
                    console.log('error line 64')
                    return;
                    }
                    console.table(rows)
                    questions()
                    });
            }

            else if (data.mainChoice === 'Add a department') {

                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'dept',
                        message: 'Enter the name of the department.'
                    }
                ])
                .then(function(data) {

                    const sql = `INSERT INTO department (name) VALUES (?)`;
                    const params = [data.dept];
                  
                    db.query(sql, params, (err, result) => {
                      if (err) {
                        console.log('error line 113')
                        return;
                      }
                      console.log(data.dept + ' was added.');
                      questions()
                    });

                    
                  });




            }
            
            else if (data.mainChoice === 'Add a role') {

                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'roleName',
                        message: 'Enter the name of the role.'
                    },
                    {
                        type: 'number',
                        name: 'roleSalary',
                        message: 'Enter the salary for this role.'
                    },
                    {
                        type: 'number',
                        name: 'roleDepartment',
                        message: 'Enter the department number for this role.'
                    }
                ])
                .then(function(data) {

                    const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?)`;
                    const params = [data.roleName, data.roleSalary, data.roleDepartment];
                  
                    db.query(sql, params, (err, result) => {
                      if (err) {
                        console.log('error line 155')
                        return;
                      }
                      console.log(data.roleName + ' was added as the role name.');
                      console.log(data.roleSalary + ' was added as the role salary.');
                      console.log(data.roleDepartment + ' was added as the role department number.');
                      questions()
                    });

                    
                  });

            }

            else if (data.mainChoice === 'Add an employee') {

                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the first name of the new employee.'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the last name of the new employee.'
                    },
                    {
                        type: 'number',
                        name: 'roleId',
                        message: 'Enter the role or title id for this employee.'
                    },
                    {
                        type: 'number',
                        name: 'managerId',
                        message: 'Enter the manager id for this employee.'
                    }
                ])
                .then(function(data) {

                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;
                    const params = [data.firstName, data.lastName, data.roleId, data.managerId];
                  
                    db.query(sql, params, (err, result) => {
                      if (err) {
                        console.log('error line 203')
                        return;
                      }
                      console.log(data.firstName + ' was added as the employee first name.');
                      console.log(data.lastName + ' was added as the employee last name.');
                      console.log(data.roleId + ' was added as the role number.');
                      console.log(data.managerId + ' was added as the manager id.');
                      questions()
                    });

                    
                  });

            }

            else if (data.mainChoice === 'Update an employee role') {


                inquirer
                .prompt([
                    {
                        type: 'number',
                        name: 'Eid',
                        message: 'Enter the id number for the employee you wish to update.'
                    },
                    {
                        type: 'number',
                        name: 'Erole_id',
                        message: 'Enter role id for the new title you wish to update them with.'
                    }
                ])
                .then(function(data) {

                    const sql = `UPDATE employee SET role_id = ? 
                    WHERE id = ?`;
                    const params = [data.Erole_id, data.Eid];
                  
                    db.query(sql, params, (err, result) => {
                      if (err) {
                        console.log('error line 242')
                        return;
                      }
                      console.log('Updated.');
                      questions()
                    });

                    
                  });
            }


            else {
                console.log('You choice was: ' + data.mainChoice)
                questions()
            }

        });
    }

    questions()

  });
});
