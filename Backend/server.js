const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// WhatsApp Business API Configuration
const WHATSAPP_API_URL = 'https://graph.facebook.com/v13.0/405968615925991/messages';
const ACCESS_TOKEN = 'EAAUqacNsdMsBOzA2oA9wqGg78XrBG4fx5XhDioLJBtkgsQeZAraXZCwbMUqDgJniWswaZCtmuAeTGPTtkHxzWFQZBAjpipb1XLGpp5GnPqZAia3djUmZA8FuqawlRCFxiKBuveB6NRgKDU5T6Lp3B3sEanoytK3s7gZAdTwhSdYIme5ZCT3ZBDZBlXpZBHIQdr8OkJlEI4PZCQBvdXet7v7waxwUPsS8';

// Send message to WhatsApp API
app.post('/api/send-message', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: 'whatsapp',
        to: '201001337991', // The phone number to send the message to
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log('WhatsApp API response:', response.data);  // Log WhatsApp API response

    res.json({ status: 'Message sent', data: response.data });
  } catch (error) {
    console.error('Error sending message to WhatsApp:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});
