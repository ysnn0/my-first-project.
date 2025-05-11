const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const results = [];

app.post('/submit-initial', (req, res) => {
  const data = req.body;
  if (data.user && data.responses) {
    results.push(data);
    res.status(200).json({ message: "Result saved" });
  } else {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.get('/all-results', (req, res) => {
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
