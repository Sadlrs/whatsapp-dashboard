const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// WhatsApp API Configuration
const WHATSAPP_API_URL = `https://graph.facebook.com/v13.0/${process.env.PHONE_NUMBER_ID}/messages`;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

// Endpoint to send messages via WhatsApp Cloud API
app.post('/api/send-message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: 'whatsapp',
        to: process.env.RECIPIENT_PHONE_NUMBER,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message to WhatsApp:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
