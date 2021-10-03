//Express
const express = require('express');
const app = express();
const db = require('./db');


app.use(express.json());

//
app.get('/', (req, res) => {
    res.send("Hello from Express");
});

app.get('/api/students', (req, res) => {
    db.getStudentData()
        .then(students => {
            res.send(students);
        })
});
app.post('/api/students', (req, res) => {
    const student = req.body;
    db.getStudentData()
        .then(students => {
            students.push(student);
            db.postStudentData(students)
                .then(data => {
                    res.send(student);
                })
        })
});


//
const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});

