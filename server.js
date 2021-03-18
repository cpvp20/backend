require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY,
    }),
    serviceUrl: process.env.URL,
});


app.get('/', function (req, res) {
    res.send('Hello there!');
});

app.post('/tone', (req, res) => {

    var text = req.body.texto;

    const toneParams = {
        toneInput: {'text': text},
        contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            result = toneAnalysis;
            // console.log(result);
            res.send(result);
        })
        .catch(err => {
            //console.log('error:', err);
            res.send("ERROR EN TONE ANALYZER - ", err);
        });
});

app.listen(port, () => {
    console.log(`Backend Server Carolina running on port ${port}`);
});