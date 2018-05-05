var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connecting to mlab database
mongoose.connect('mongodb://md:md@ds215370.mlab.com:15370/todo-db');

//creating a schema
var todoSchema = new mongoose.Schema({
    item: String
});

//creating the db model
var Todo = mongoose.model('Todo',todoSchema);



//var data = [{item: 'wake up'},{item: 'exercise'},{item: 'have breakfast'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo',function(req,res){

        //get data from mlab and pass it to the view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        });
        
    });

    app.post('/todo',urlencodedParser,function(req,res){

        //get data from the view and add it to mlab
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){

        //delete the requested from mlab
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        
    });

};