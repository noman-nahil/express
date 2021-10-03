const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

const getStudentData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            const students = JSON.parse(data);
            resolve(students);
        });
    })
}
const postStudentData = (students) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            resolve("Student Successfully Added");
        })
    })

}

module.exports.getStudentData = getStudentData;
module.exports.postStudentData = postStudentData;

