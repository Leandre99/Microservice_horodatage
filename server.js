const express = require('express');
const app = express();

// Fonction utilitaire pour gérer la date
function getDateObject(dateParam) {
  let date;

  if (!dateParam) {
    // Date actuelle
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // Timestamp Unix en millisecondes
    date = new Date(parseInt(dateParam));
  } else {
    // Date au format string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
}

// Route avec paramètre de date
app.get('/api/:date', (req, res) => {
  res.json(getDateObject(req.params.date));
});

// Route sans paramètre (date actuelle)
app.get('/api', (req, res) => {
  res.json(getDateObject());
});

// Route racine
app.get('/', (req, res) => {
  res.send('Microservice d\'horodatage');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
