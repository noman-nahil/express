const express = require('express');
const router = express.Router();
const db = require('../db');

//Named Function
const studentList = (req, res) => {
    db.getStudentData()
        .then(students => {
            res.send(students);
        })
}

const newStudent = (req, res) => {
    const student = req.body;
    db.getStudentData()
        .then(students => {
            students.push(student);
            db.postStudentData(students)
                .then(data => {
                    res.send(student);
                })
        })
}

const studentDetails = (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id)
    db.getStudentData()
        .then(students => {
            const student = students.find(student => student.id === id);
            if (!student) {
                res.status(400).send("Not Found");
            }
            else {
                res.send(student);
            }

        })
}
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id)
    const updateInfo = req.body;
    db.getStudentData()
        .then(students => {
            const student = students.find(student => student.id === id);
            if (!student) {
                res.status(400).send("Not Found");
            }
            else {
                //res.send(updateInfo);
                const index = students.findIndex(student => student.id === id);
                students[index] = updateInfo;
                db.postStudentData(students)
                    .then(data => {
                        res.send(updateInfo);
                    })

            }

        })
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id)
    db.getStudentData()
        .then(students => {
            const student = students.find(student => student.id === id);
            if (!student) {
                res.status(400).send("Not Found");
            }
            else {
                const updatedData = students.filter(student => student.id !== id);
                //res.send(student);
                db.postStudentData(updatedData)
                    .then(data => {
                        res.send(updatedData);
                    })
            }

        })
}

//Refactoring the routes
router.route('/')
    .get(studentList)
    .post(newStudent);

router.route('/:id')
    .get(studentDetails)
    .put(newStudent).
    delete(deleteStudent);

module.exports = router;