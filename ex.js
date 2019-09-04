
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log('Server is running with port 3000');
});


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


var todolist = ['HTML','CSS'];
app.post('/todo', (req, res) => {

    
    var addListItem = req.body.addListItem1;
    todolist.push(addListItem);
    res.send('new todo= '+addListItem);
});

app.get('/todo', function (req, res) {

    res.sendfile(__dirname + '/index.html');
    
});
app.get('/todos',(req,res)=>{

    for (let index = 0; index < todolist.length; ++index) {
        res.write((index + 1) + '. item=' + todolist[index]+'\n');
    }
    res.end();
});
