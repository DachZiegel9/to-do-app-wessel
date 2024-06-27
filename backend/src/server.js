const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.Port || 3000;

// Middleware aktiveren
app.use(cors());

// HTTP-Anfragen werden in JSOn geparst
app.use(bodyParser.json());
app.use('/routes', routes);


app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});