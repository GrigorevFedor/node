#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');


const executionDir = process.cwd();


let list = fs.readdirSync('./');
console.log(list);
const checkFile = (filenameFromConsole) => {
    console.log('filenameFromConsole', filenameFromConsole);
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list',
            message: 'Choose a file to read',
            choices: list,
        },
    ])
        .then(({ fileName }) => {
            console.log('fileName', fileName);
            const fullPath = path.join(filenameFromConsole, fileName);
            console.log('fullPath', fullPath);
            if (fs.lstatSync(fullPath).isFile()) {


                fs.readFile(fullPath, 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    else {
                        if (data.includes('127')) {
                            console.log('match');
                        } else {
                            console.log('mismatch')
                        }
                    };
                });
            } else {
                list = fs.readdirSync(fullPath);
                checkFile(fullPath);
            }

        });


}

checkFile(executionDir)

