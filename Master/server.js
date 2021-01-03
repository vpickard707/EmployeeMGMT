var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Beeke@per7!",
  database: "employeeDB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
//--------------------------------
function start() {
  console.log("initial");
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
      ],
    })
    .then(function (answer) {
      // based on their answer, choose from the listed options
      if (answer.main === "Add a department") {
        addDepartment();
      } else if (answer.main === "Add a role") {
        addRole();
      } else if (answer.main === "Add an employee") {
        addEmployee();
      } else if (answer.main === "View departments") {
        viewDepartments();
      } else if (answer.main === "View roles") {
        viewRoles();
      } else if (answer.main === "View employees") {
        viewEmployees();
      } else if (answer.main === "Update employee roles") {
        updateRoles();
      } else {
        connection.end();
      }
    });
}

//============= View Employees ======================//
function viewEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//============= View Roles ==========================//
function viewRoles() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//============= View Employees By Departments ==========================//
function viewDepartments() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}

//================= Select Role Queries Role Title for Add Employee Prompt ===========//
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}
//================= Select Role Queries The Managers for Add Employee Prompt ===========//
var managersArr = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
  return managersArr;
}
//============= Add Employee ==========================//
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter employee's first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter employee's last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Who is their manager?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
}
//============= Update Employee ==========================//
function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      // console.log(res)
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1;
          connection.query(
            "UPDATE employee SET WHERE ?",
            {
              last_name: val.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(val);
              startPrompt();
            }
          );
        });
    }
  );
}
//============= Add Employee Role ==========================//
function addRole() {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}
//============= Add Department ==========================//
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}
