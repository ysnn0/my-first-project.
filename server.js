const express = require('express');
const path = require('path');
const fs = require('fs'); // Verileri bir JSON dosyasına kaydedebilmek için
const app = express();
const port = 3000;

// Verileri JSON formatında saklamak için bir dosya oluşturuyoruz
const dataFilePath = path.join(__dirname, 'results.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-initial', (req, res) => {
  const { user, score, avgTime, responses } = req.body;

  const resultData = { user, score, avgTime, responses };

  // JSON dosyasına verileri ekliyoruz
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the data file');
    }

    let allResults = [];
    if (data) {
      allResults = JSON.parse(data); // Önceden kaydedilen verileri okuyoruz
    }

    allResults.push(resultData); // Yeni veriyi ekliyoruz

    fs.writeFile(dataFilePath, JSON.stringify(allResults, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving the result');
      }
      res.status(200).send('Result saved successfully');
    });
  });
});

// All results route - Tüm sonuçları göstermek için
app.get('/results', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the data file');
    }

    let allResults = [];
    if (data) {
      allResults = JSON.parse(data);
    }

    res.json(allResults); // JSON formatında tüm sonuçları döndürüyoruz
  });
});

// Başlangıç sayfasına yönlendirme (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'initial-test.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
