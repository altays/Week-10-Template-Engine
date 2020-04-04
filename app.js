const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// restructure based on Kenneth's suggestions - 
// default questions route
// question routes for manager, engineer, and intern

// default route
const mainQuestions = [
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
            `Manager`,
            `Engineer`,
            `Intern`
        ]
    },
]


// refactor from here down - branch 1
const managerQuestion =  [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?',
        when: function(answers) {
          return answers.role === "Manager";
        }
    }]

    // branch 2

const engineerQuestion = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your github?',
        when: function(answers) {
          return answers.role === "Engineer";
        }
    }]

    // branch 3

const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'What is your school?',
        when: function(answers) {
          return answers.role === "Intern";
        }
    }
]

    // final question - use for looping
const loopQuestion = [
    {
        type: `confirm`,
        name: `addMore`,
        message: `Do you want to add more employees?`
    }
]

// restructure based on Kenneth's suggestions
// start with default path of questions
// depending on the role selected, choose a specific question route and create a class using the information gathered
// push that object into the array 
function ask() { 

    return inquirer.prompt(questions).then(answers => {
        let output = [];
        output.push(answers);

        if (answers.addMore) {
            ask();
        }  else {
            
            console.log(output)
            return output
        }
    })
    .catch(error => {
        console.log(error)
    })
}

async function init(){
    try {
        let askAnswer = await ask();
        
        let generatedHTML = await render(askAnswer);

        fs.writeFile(outputPath, generatedHTML, function(err) {
            if (err) {
                return console.log(err);
            } else {
                console.log(`Successfully written to ${outputPath}`);
            }
        });

    } catch (error) {
        console.log(error)
    } finally {
        console.log(`Finally written to ${outputPath}!`);
    }
}

init();


// create HTML -> call render function, pass in array containing all employee objects
// create html file named team.html in /output -> create