
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const fs=require('fs');
const app = express();
const todos = ['going', 'swimming', 'eating'];

app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log('Server is running...');
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

app.get('/todo', (req, res) => {
    res.send(todos);
});

app.post('/todo', (req, res) => {

    console.log(req.body);
    todos.push(req.body.todo);
    res.send(todos);

});

add.delete('/todo/:todo', (req, res) => {
    let { todo } = req.params;
    todos = todos.filter((x) => x !== todo);

    res.send(todos);
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
    let { username, password } = req.body;
    if (username === 'admin' && password === 'password')
        res.send('success');
    else
        res.sendStatus(401);

});

//5th question
///report route(POST) that gets the example data below and creates a json file based on
// that report in the reports folder. The json file will have the name of customer.
// Example data:
// {
//     "customer": "X Company",
//         "budget": "$200",
//             "submitDate: "22 - 10 - 2019"
// }

app.post('/report', (req, res) => {

    let { customer } = req.body;

    if (fs.existsSync('./report')) 
        fs.mkdirSync('./report');
    
    fs.writeFileSync(`./report/${customer}.json`, JSON.stringify(req.body));
    res.send('saved');

});



