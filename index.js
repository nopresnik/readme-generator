const inquirer = require("inquirer");
const fs = require("fs");

// Initalise inquirer
inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "Project title:",
    },
    {
      type: "input",
      name: "description",
      message: "Project description:",
    },
    {
      type: "input",
      name: "installation",
      message: "Installation instructions:",
    },
    {
      type: "input",
      name: "usage",
      message: "Usage information:",
    },
    {
      type: "input",
      name: "contribution",
      message: "Contribution guidelines:",
    },
    {
      type: "input",
      name: "test",
      message: "Test instructions:",
    },
    {
      type: "list",
      name: "license",
      message: "Choose license:",
      choices: [
        "Apache 2.0",
        "BSD 3",
        "BSD 2",
        "GNU GPL",
        "GNU LGPL",
        "MIT",
        "Mozilla",
        "EPL",
      ],
    },
    {
      type: "input",
      name: "github",
      message: "GitHub username:",
    },
    {
      type: "input",
      name: "email",
      message: "Email:",
    },
  ])
  .then((answers) => {
    // Get the answers and write a file containing the return of the buildReadme func.
    fs.writeFile("output.md", buildReadme(answers), (err) => {
      if (err) {
        // Log any errors.
        return console.log("Could not write readme: ", err);
      }

      console.log("Successfully wrote to output.md!");
    });
  })
  .catch((error) => {
    // Log any errors.
    console.log(error);
  });

const buildReadme = (answers) => {
  // Destructure the answers object.
  const {
    title,
    description,
    installation,
    usage,
    contribution,
    test,
    license,
    github,
    email,
  } = answers;

  // Return generated markdown using a template literal
  return `
![License Badge](https://img.shields.io/badge/License-${license}-BLUE)
# ${title}
${description}
## Table Of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contribution](#Contribution)
4. [Tests](#Tests)
5. [Questions](#Questions)

## Installation
${installation}

## Usage
${usage}

## Contribution
${contribution}

## Tests
${test}

## Questions
Feel free to contact me via:

Email: [${email}](mailto:${email})

GitHub: [${github}](https://github.com/${github})`;
};
