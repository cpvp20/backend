const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
});

const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';

const toneParams = {
  toneInput: { 'text': text },
  contentType: 'application/json',
};

toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });