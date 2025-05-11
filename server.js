const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const results = [];

app.post('/submit-initial', (req, res) => {
  results.push(req.body);
  res.json({ status: 'ok' });
});

app.get('/all-results', (req, res) => {
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
