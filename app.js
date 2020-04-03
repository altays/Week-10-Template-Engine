const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



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
]

function ask() { 

    let output = [];
    
    return inquirer.prompt(questions).then(answers => {
        output.push(answers);

        // consider pushing to the async function
        if (answers.addMore) {
            ask();
        }  else {
            console.log(`You have entered ${output.length} employees.`)
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
        console.log("start of try")

        // async function to get data
        

        // ask is not looping! 
        let askAnswer = await ask();
        
        //async function to render html

        // this is where the other error is - employee.getRole is not a function
        let generatedHTML = await render(askAnswer);

        // write file
        // fs.writeFile(outputPath, generatedHTML, function(err) {

        //     if (err) {
        //     return console.log(err);
        //     }
        
        //     // log this to a log file
        //     console.log("Success!");
        
        // });

        // console.log("end of try")

    } catch (error) {
        // console.log("start of error")
        console.log(error)
        // console.log("end of error")
    } finally {
        // console.log(newHTML)
        // console.log("start of finally")
        // console.log(answers)
        // console.log("end of finally")
    }
}

init();


// create HTML -> call render function, pass in array containing all employee objects
// create html file named team.html in /output -> create