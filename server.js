const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname)));


const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

app.post('/api/send', async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'missing fields' });
  }

  const lines = [
    'Новая заявка:',
    `Имя: ${name}`,
    `Телефон: ${phone}`
  ];
  if (email) {
    lines.push(`Email: ${email}`);
  }
  const text = lines.join('\n');

  try {
    const tgResp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    const data = await tgResp.json();
    if (!data.ok) {
      return res.status(500).json({ ok: false, error: 'telegram error', data });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

const port = process.env.PORT || 3000;
app.set('trust proxy', 1);
app.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${port}`);

});
