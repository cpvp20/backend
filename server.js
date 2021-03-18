require('dotenv');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY,
    }),
    serviceUrl: process.env.URL,
});


app.get('/', function (req, res) {
    res.send('Hello there');
});

app.post('/tone', (req, res) => {
    const text = 'Team, I know that times are tough! Product ' +
        'sales have been disappointing for the past three ' +
        'quarters. We have a competitive product, but we ' +
        'need to do a better job of selling it!';

    const toneParams = {
        toneInput: {
            'text': text
        },
        contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            result = JSON.stringify(toneAnalysis, null, 2);
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})