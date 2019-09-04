
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log('Server is running with port 3000');
});

//1st QUESTION

app.get('/calculator/:id1/:id2/:id3', function (req, res) {
    let num1 = Number(req.params.id1),
        num2 = Number(req.params.id2),
        operator = req.params.id3;

    function calculator(opera) {

        return (opera === '+') ? (num1 + num2) :
            (opera === '-') ? (num1 - num2) :
                (opera === '*') ? (num1 * num2) :
                    (opera === 'b') ? (num1 / num2) :
                        (opera === '%') ? (num1 % num2) : res.sendStatus(404);
    }
    res.send('result= ' + calculator(operator));
});

//2nd question


var todolist = ['HTML', 'CSS', 'JS'];

app.post('/todo', (req, res) => {

    var addListItem = req.body.addListItem1;
    todolist.push(addListItem);
    res.send('new todo= ' + addListItem);
});

app.get('/todo', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/todos', (req, res) => {

    for (let index = 0; index < todolist.length; ++index) {
        res.write((index + 1) + '. item=' + todolist[index] + '\n');
    }
    res.end();
});

app.delete('/todos/:todo', (req, res) => {

    for (let index = 0; index < todolist.length; ++index) {

        if (req.params.todo === todolist[index]);
        {
            todolist.splice(todolist[index], 1);
        }
    }
    res.send('item deleted= ' + req.params.todo);

});

//3RD QUESTION
///future/hours route(GET) that adds given hours to the current datetime and returns result.

app.get('/future/:hours', (req, res) => {
    let hour = Number(req.params.hours);
    res.send('new hour= ' + moment().add(hour, 'hours').format('LT'));
});

//4th question
///login route((POST) that checks if the given username and password is correct 
//or not and will respond with appropriate status code.

app.post('/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if (username === 'admin' && password === 'password')
        res.status(202, { msg: 'accepted' });
    else
        res.status(401, { msg: 'bad' });

});

app.get('/login', (req, res) => {
    res.sendfile(__dirname + '/login.html');
});

//5th question
