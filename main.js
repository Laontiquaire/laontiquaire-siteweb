const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 10004;

// Définition du répertoire contenant les fichiers statiques
app.use(express.static('main'));

// Envoyer le fichier HTML à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
    console.log('Site web démarré sur https://laontiquaire.raphhosting.com');
    console.log('Port: ${port}');
});
