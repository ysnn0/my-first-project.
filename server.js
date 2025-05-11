const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Tüm verileri bellekte tutacağız
let allResults = [];

// Kullanıcıdan gelen sonuçları kaydet
app.post('/submit-initial', (req, res) => {
  const { user, score, avgTime, responses } = req.body;

  const resultData = { user, score, avgTime, responses };
  allResults.push(resultData);

  res.status(200).json({ message: 'Result saved successfully' });
});

// Tüm sonuçları döndür
app.get('/results', (req, res) => {
  res.status(200).json(allResults);
});

// Ana sayfa yönlendirmesi
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'initial-test.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
