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
