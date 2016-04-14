var express = require('express');
var app = express();

app.get('/user', function(req, res) {
  var user = {
    name: 'Nathan',
    location: 'Newport Beach'
  }
  res.json(user);
});

app.get('/todos/:user', function(req, res) {
  if (req.params.user === 'Nathan') {
    var todos = ['Learn JavaScript.', 'Go Home.'];
    res.json(todos);
  }
  else {
    res.status(404).send('Sorry, I don\'t know that user');
  }
});

app.use(express.static('./public/'));

var port = process.env.PORT || 8080;
app.listen(port, function(req, res) {
  console.log('Listening on: ' + port + '...');
});
