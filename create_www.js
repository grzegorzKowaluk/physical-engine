const { exec } = require('child_process');
const fs = require('fs').promises;

// Function to execute a command
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        const child = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`An error occurred while executing command: ${command}`, error);
                reject(error);
            } else {
                console.log(`Command executed successfully: ${command}`);
                resolve();
            }
        });
        //child.stdout.on('data', data => console.log(data));
        child.stderr.on('data', data => console.error(data));
    });
}

// Function to initialize the project and execute subsequent commands
function initializeProject() {
    return executeCommand('npm init wasm-app www --yes')
        .then(() => executeCommand('cd www && rmdir /s /q .git'))
        .then(() => executeCommand('cd www && npm install --save ..\\pkg'))
        .then(() => executeCommand('cd www && npm update'))
        .then(() => fs.writeFile('./www/index.js', 'import * as wasm from "physical-engine"; wasm.start();', 'utf-8'))
        .then(() => console.log("All set up :), now run 'npm run start' in www directory"))
        .catch(error => console.error('An error occurred during project initialization:', error));
}

// Call the function to initialize the project
initializeProject();
