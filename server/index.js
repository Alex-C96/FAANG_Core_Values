require('dotenv').config()
const { processAudio } = require('./processAudio');
const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

const publicDirectoryPath = path.join(__dirname, 'public');

let audioNumber = 1;

app.post('/submit-form', function(req, res) {
  const  text  = req.body.data;
  const audioFile = path.join(__dirname, 'public', `audioFile${audioNumber}.wav`);
  audioNumber += 1;

  processAudio(audioFile, text, "en-US-RogerNeural");

  res.json({audioFile});
});

app.get('/audios', function(req, res) {
  fs.readdir(publicDirectoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directiony:', err);
      res.status(500).send('Error reading directory');
    } else {
      const wavFiles = files.filter(file => file.endsWith('.wav'));
      const audios = wavFiles.map((file, index) => {
        return {
          id: index + 1,
          src: `http://localhost:3001/public/${file}`
        };
      });
      res.json(audios);
    }
  })
})

app.listen(3001, function() {
  console.log('Server is running on http://localhost:3001');
})