
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log('Server is running with port 3000');
});


app.get('/calculator/:id1/:id2/:id3', function (req, res) {
    let num1 = req.params.id1,
        num2 = req.params.id2,
        operator = req.params.id3;

    function calculator(opera) {
        return (opera === '+') ? (num1 + num2) : (opera === '-') ? (num1 - num2) : (opera === '*') ? (num1 * num2)
            : (opera === '/') ? (num1 / num2) : console.log('bad operator');
    }
    if (num1 || num2 || operator)
        res.send('result= ' + calculator(operator));
    else
        res.status(400).send({ msg: 'Bad request' });
});





const database = ['123', '123456', '12345678', '0'];

app.get('/todo', (req, res) => {
    res.send(database);
});

app.post('/todo', (req, res) => {
    database.push(req.body.todo);
    res.send(database);
});

// app.get('/contact',function(req,res){
//     res.send('contact me at:.....');
// });

// app.get('/about',function(req,res){
//     res.send('I am Erdinc');
// })