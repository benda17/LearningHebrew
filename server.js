const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS)

app.post('/api/synthesize', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('Text is required');
  }

  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(
      text
    )}&tl=iw`;
    res.json({ audioUrl: ttsUrl });
  } catch (error) {
    console.error('Error fetching sound:', error);
    res.status(500).send('Failed to generate sound');
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
