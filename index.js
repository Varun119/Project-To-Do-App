const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

const db = require('./config/mongoose');
const Task = require('./models/task');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/', function(req, res) {

  Task.find({}, function(err, tasks) {
    if (err) {
      console.log("Error in fetching contacts from db.");
      return;
    }
    return res.render('home', {
      title: "To-Do List",
      task_list: tasks
    });
  })

});

app.post('/create-contact', function(req, res) {

  Task.create({
    description: req.body.description,
    date: req.body.dueDate,
    category: req.body.category
  }, function(err, newTask) {
    if (err) {
      console.log('Error in creating a contact!')
      return;
    }
    
    return res.redirect('back');
  })

});


app.listen(port, function(err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log('Yup!My Server is running on Port', port);
});

app.get('/delete-contact/', function(req, res) {

  let id = req.query.id;

  Task.findByIdAndDelete(id, function(err) {
    if(err) {
      console.log("Error in deleting contact from database.");
      return;
    }
    return res.redirect('back');
  })

});
