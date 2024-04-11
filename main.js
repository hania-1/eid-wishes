#! /usr/bin/env node

import inquirer from 'inquirer';
import clipboardy from 'clipboardy';
// Predefined Eid greetings
const greetings = [
    'Eid Mubarak!',
    'Wishing you and your family a blessed Eid!',
    'May this Eid bring you joy and prosperity!',
    'Eid Greetings! Have a wonderful celebration!'
];
// Function to generate a random greeting
function generateRandomGreeting() {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}
// Function to prompt user for name input
async function promptForName() {
    const answer = await inquirer.prompt({
        name: 'name',
        message: 'Enter your name (optional):',
        type: 'input'
    });
    return answer.name.trim();
}
// Function to copy greeting to clipboard
function copyToClipboard(greeting) {
    clipboardy.writeSync(greeting);
    console.log('Greeting copied to clipboard!');
}
// Main function to run the application
async function main() {
    console.log('Welcome to Eid Greetings Generator!\n');
    const greetingChoiceAnswer = await inquirer.prompt({
        name: 'choice',
        message: 'Choose an option:',
        type: 'list',
        choices: ['Select a greeting', 'Generate a random greeting']
    });
    let greeting;
    if (greetingChoiceAnswer.choice === 'Select a greeting') {
        const greetingSelectionAnswer = await inquirer.prompt({
            name: 'selection',
            message: 'Choose a greeting:',
            type: 'list',
            choices: greetings
        });
        greeting = greetingSelectionAnswer.selection;
    }
    else {
        greeting = generateRandomGreeting();
    }
    const name = await promptForName();
    if (name !== '') {
        greeting = `${greeting}, ${name}!`;
    }
    console.log(`\n${greeting}\n`);
    const copyAnswer = await inquirer.prompt({
        name: 'copy',
        message: 'Copy greeting to clipboard?',
        type: 'confirm',
        default: true
    });
    if (copyAnswer.copy) {
        copyToClipboard(greeting);
    }
    console.log('\nHave a blessed Eid!\n');
}
// Run the main function
main().catch(error => console.error('An error occurred:', error));
