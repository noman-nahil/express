//Express
const express = require('express');
const fs = require('fs')
const app = express();


app.use(express.json());

//
app.get('/', (req, res) => {
    res.send("Hello from Express");
});

app.get('/api/students', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        console.log(data);
        res.send(JSON.parse(data).students);
    });
});
app.post('/api/students', (req, res) => {
    const student = req.body;
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        const students = JSON.parse(data);
        students.students.push(student);
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            res.send(student);
        })
    })

});


//
const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});

//console.log(app)