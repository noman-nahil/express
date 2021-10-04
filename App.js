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


app.get('/api/students/:id', (req, res) => {
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
})

app.put('/api/students/:id', (req, res) => {
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
})


app.delete('/api/students/:id', (req, res) => {
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
})

//
const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});

