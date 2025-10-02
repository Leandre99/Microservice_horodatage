const express = require('express');
const app = express();

// Fonction pour gérer la date
function handleDate(dateParam, res) {
  let date;

  if (!dateParam) {
    date = new Date(); // date actuelle si aucun param
  } else if (/^\d+$/.test(dateParam)) {
    // timestamp Unix
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam); // date string
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
}

// Route pour la date passée en paramètre
app.get('/api/:date', (req, res) => {
  handleDate(req.params.date, res);
});

// Route sans paramètre (date actuelle)
app.get('/api', (req, res) => {
  handleDate(null, res);
});

// Route racine
app.get('/', (req, res) => {
  res.send('Microservice d\'horodatage');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
