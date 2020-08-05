const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const fetch = require('node-fetch');
const fs = require('fs');

global.uatPublicKey = fs.readFileSync('./cert/uat/ICICIPubKey.key');
global.uatPrivateKey = fs.readFileSync('./cert/uat/PrivateKey.key');

app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Server running'));


// Define routes
app.use('/api/uat', require('./routes/api/uat'));
app.use('/api/prod', require('./routes/api/prod'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
