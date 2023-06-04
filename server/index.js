require('dotenv').config();
const processAudio = require('./processAudio');
const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

const publicDirectoryPath = path.join(__dirname, 'public');

let audioNumber = 0;
// track number of files
fs.readdir(publicDirectoryPath, (err, files) => {
  if (err) {
    console.error(err);
  } else {
    const fileCount = files.length;
    audioNumber = fileCount;
  }
})

app.post('/submit-form', async function(req, res) {
  const  text  = req.body.data;
  audioNumber += 1;
  const filePath = path.join(__dirname, 'public', `audioFile${audioNumber}.wav`);

  try {
    await processAudio(filePath, text, "en-US-RogerNeural");
    const audioFile = `audioFile${audioNumber}.wav`
    res.json({audioFile});
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occured while processing the audio' });
  }
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