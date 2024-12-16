import fetch from 'node-fetch';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;

app.use(cors({
  origin: 'http://localhost:3001', // Izinkan permintaan dari frontend
}));

// Route untuk mengambil data provinsi dari Raja Ongkir
app.get('/api/province', async (req, res) => {
  try {
    const response = await fetch('https://api.rajaongkir.com/starter/province', {
      headers: {
        'key': 'your-api-key', // Ganti dengan API Key Anda
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
