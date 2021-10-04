//Express
const express = require('express');
const app = express();
const db = require('./db');


app.use(express.json());

//Named Function

const StudentList = (req, res) => {
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

//
app.get('/', (req, res) => {
    res.send("Hello from Express");
});
app.get('/api/students', StudentList);
app.post('/api/students', newStudent);
app.get('/api/students/:id', studentDetails);
app.put('/api/students/:id', updateStudent);
app.delete('/api/students/:id', deleteStudent);

//
const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});

