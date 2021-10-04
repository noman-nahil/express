//Express
const express = require('express');
const app = express();
const studentRouter = require('./Routers/studentRouters')


app.use(express.json());
app.use('/api/students', studentRouter);



//
/*
app.get('/api/students', studentList);
app.post('/api/students', newStudent);
app.get('/api/students/:id', studentDetails);
app.put('/api/students/:id', updateStudent);
app.delete('/api/students/:id', deleteStudent);*/

//
const port = 3000;

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});

