const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet');


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'hellogoodbyeworld',
    database: 'richmond_db'
  },
  console.log(`Connected to the richmond_db database.`)
);




const firstPrompt = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all Departments', 
                'View all Roles', 
                'View all Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update an Employee Role'
              ]
    }
  ])
    .then((answers) => {
    //console.log(answers.choices);
    switch (answers.choices) {
      case 'View all Departments':
        viewDepartments();
        break;
      case 'View all Roles':
        viewRoles();
        break;
      case 'View all Employees':
        viewEmployees();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployee();
        break;

      default:
        console.log('shoot, switches are hard')

    }
  },)

}

//figlet init
figlet('Employee Tracker!!', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});

firstPrompt();




viewDepartments = () => {
  db.query('SELECT * FROM department;', function (err, results) {
    console.table(results);
    firstPrompt();
});
}

viewRoles = () => {
  db.query('SELECT * FROM roles;', function (err, results) {
    console.table(results);
    firstPrompt();
});
}

viewEmployees = () => {
  db.query('SELECT * FROM employees;', function (err, results) {
    console.table(results);
    firstPrompt();
});
}

addDepartment = () => {
  inquirer.prompt ([
    { 
      type: 'input',
      name: 'name', 
      message: 'What is the name of this Department?' 
    }
  ])
  .then((answers) => {
  const sql = 'INSERT INTO department (name) VALUES(?)';
  db.query(sql, answers.name, function (err, results) {
    console.table(results);
    viewDepartments();
  });
});
}

addRole = () => {
  inquirer.prompt ([
    { 
      type: 'input',
      name: 'name', 
      message: 'What is the name of this Role?' 
    },
    { 
      type: 'input',
      name: 'salary', 
      message: 'What is the salary of this Role?' 
    },
    { 
      type: 'input',
      name: 'depId', 
      message: 'In what department is this role?' 
    }
  ])
  .then((answers) => {
  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)';
  const roleInfo = [answers.name, answers.salary, answers.depId];
  db.query(sql, roleInfo, function (err, results) {
    console.table(results);
    viewRoles();
  });
});
}

addEmployee = () => {
  inquirer.prompt ([
    { 
      type: 'input',
      name: 'firstName', 
      message: 'What is the first name of this Employee?' 
    },
    { 
      type: 'input',
      name: 'lastName', 
      message: 'What is the last name of this Employee?' 
    },
    { 
      type: 'input',
      name: 'roleId', 
      message: "What is this Employee's role Id?" 
    },
    { 
      type: 'input',
      name: 'mngrId', 
      message: "What is their Manager's Id?" 
    }

  ])
  .then((answers) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)';
    const employeeInfo = [answers.firstName, answers.lastName, answers.roleId, answers.mngrId];
    db.query(sql, employeeInfo, function (err, results) {
    console.table(results);
    viewEmployees();
  });
});
}


updateEmployee = () => {
  db.query('SELECT id, first_name, last_name FROM employees;', function (err, results) {
    // console.log(results);
    
    const employeeList = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id}));
    // console.log (employeeList);

    inquirer.prompt ([
      { 
        type: 'list',
        name: 'name', 
        message: 'What is the name of the Employee?', 
        choices: employeeList
      }
    ])
    .then((answer) => {
    empName = answer.name
      db.query('SELECT id, title FROM roles;', function (err, results) {
        // console.log(results);
        rolesList = results.map(({ id, title }) => ({ name: title, value: id }));

        inquirer.prompt ([
          { 
            type: 'list',
            name: 'role', 
            message: 'What is the new role of the Employee?', 
            choices: rolesList
          }
        ])
        .then((answer) => {
          // console.log(empName);
          empRole = answer.role;
          // console.log(empRole);
          const sql = 'UPDATE employees SET role_id = ? WHERE id  = ?';
          const combined = [empRole, empName];
        
          db.query(sql, combined, function (err, results) {
            // console.table(results);
            viewEmployees();
          })
        })
      })
    })
  }) 
}

