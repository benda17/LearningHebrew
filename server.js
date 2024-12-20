const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Google Cloud Text-to-Speech Client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: 'AIzaSyDJNZBPUfMG_mXeO5RunzITWd3fdMhJGNI', // Replace with your service account key
});

app.post('/api/synthesize', async (req, res) => {
  const { text } = req.body;

  const request = {
    input: { text },
    voice: { languageCode: 'he-IL', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const filename = `audio-${Date.now()}.mp3`;
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`./public/audio/${filename}`, response.audioContent, 'binary');
    res.json({ audioUrl: `/audio/${filename}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error synthesizing speech');
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
