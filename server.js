const express = require('express');
const app = express();

function getDateObject(dateParam) {
  let date;

  if (!dateParam) {
    // Si pas de date, date actuelle
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // Si c'est un nombre uniquement, traiter comme timestamp Unix en millisecondes
    date = new Date(Number(dateParam));
  } else {
    // Sinon, date string
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

// Route racine
app.get('/', (req, res) => {
  res.send('Microservice d\'horodatage');
});

// Route avec date optionnelle
app.get('/api/:date?', (req, res) => {
  res.json(getDateObject(req.params.date));
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
