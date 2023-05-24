const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.post('/submit-form', function(req, res) {
  console.log(req.body);

  res.json({message: 'Form submitted successfully!'});
});

const server = app.listen(3001, function() {
  console.log('Server is running on http://localhost:3001');
})