const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// CORS ayarı
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Veritabanı veya localStorage yerine burada basit bir in-memory veri tutacağız
let results = [];

// Test verilerini alacak endpoint
app.post('/submit-initial', (req, res) => {
  const { user, score, avgTime, responses } = req.body;

  // Veriyi alıp results array'ine ekliyoruz
  results.push({ user, score, avgTime, responses });
  console.log("Received result:", req.body);

  // Başarılı bir yanıt döndürüyoruz
  res.status(200).json({ message: "Data saved successfully!" });
});

// Deploy sırasında kullanılacak port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
