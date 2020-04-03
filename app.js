const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let output = []

const questions = [
    {
        type: `input`,
        name: `name`,
        message: `Please enter your name`
    },
    {
        type: `input`,
        name: `ID`,
        message: `Please enter your ID`
    },
    {
        type: `input`,
        name: `email`,
        message: `Please enter your email`
    },
    {
        type: `list`,
        name: `role`,
        message: `Please enter your role`,
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?',
        when: function(answers) {
          return answers.role === "Manager";
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your github?',
        when: function(answers) {
          return answers.role === "Engineer";
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is your school?',
        when: function(answers) {
          return answers.role === "Intern";
        }
    },
    {
        type: `confirm`,
        name: `addMore`,
        message: `Do you want to add more employees?`
    },
    // logic to restart questions
]

function ask() {
    inquirer.prompt(questions).then(answers => {
        output.push(answers);
        if (answers.addMore) {
            ask();
        }  else {
            console.log(`You have entered ${output.length} employees.`)
            // console.log(JSON.stringify(output));
            return output
        }
    })
    .catch(error => {
        console.log(error)
    })
}

ask();



