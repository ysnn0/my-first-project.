const express = require('express');
const cors = require('cors');
const path = require('path'); // path modülünü dahil et
const app = express();

// CORS ve JSON parsing middleware
app.use(cors());
app.use(express.json());  // JSON verilerini alabilmek için

// Statik dosyalara erişim sağlamak için
app.use(express.static(path.join(__dirname, 'public'))); // public klasörü içindeki tüm dosyalara erişim sağla

// Sunucu başlatma
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
const fs = require('fs');
const path = require('path');

app.post('/submit-initial', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'data', 'initial-results.json');

  // Klasör yoksa oluştur
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Dosyaya yaz (var olanın üzerine yazar)
  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Hata oluştu:', err);
      return res.status(500).json({ message: 'Veri kaydedilemedi' });
    }
    res.json({ message: 'Başarıyla kaydedildi' });
  });
});
