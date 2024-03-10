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
function initializeProject(webpack, html) {
  return executeCommand('mkdir www')
    .then(() => executeCommand('cd www && npm install webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader --save-dev'))
    .then(() => executeCommand('cd www && npm install --save ..\\pkg'))
    .then(() => executeCommand('cd www && mkdir src'))
    .then(() => fs.writeFile('./www/index.js', 'import * as wasm from "physical-engine"; wasm.start();', 'utf-8'))
    .then(() => fs.writeFile('./www/webpack.config.js', webpack, 'utf-8'))
    .then(() => fs.writeFile('./www/index.html', html, 'utf-8'))
    .then(() => console.log("All set up :), now run 'npx webpack serve' in www directory"))
    .catch(error => console.error('An error occurred during project initialization:', error));
}

// Call the function to initialize the project
const webpackTemplate =
  `
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({template: './index.html'})],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true
  }
}
`

const htmlTemplate =
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Physics Engine</title>
    <style>
      body > iframe{
        display:none;
      }
    </style>
  </head>
  <body>
  </body>
  </html>
`
initializeProject(webpackTemplate, htmlTemplate);
