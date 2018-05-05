var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./md'));

//fire controllers
todoController(app);

//listening to port
app.listen(3000);
console.log('listening...');