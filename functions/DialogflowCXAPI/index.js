const twilioLib = require('twilio');
const {SessionsClient} = require('@google-cloud/dialogflow-cx');

const {PROJECT_ID, LOCATION, AGENT_ID, API_END_POINT, LANGUAGE_CODE, ACCOUNT_SID, AUTH_TOKEN} = require('./env');
const DialogflowCXClient = new SessionsClient({ apiEndpoint: API_END_POINT });

const twilioClient = twilioLib(
  ACCOUNT_SID,
  AUTH_TOKEN
);
const languageCode = LANGUAGE_CODE;

exports.helloWorld = (req, res) => {
  const userMessage = req.body.Body;
  const WhatsappNumber = req.body.From;

  
  detectIntentText(req, userMessage, WhatsappNumber);
};

async function detectIntentText(req, query, WhatsappNumber) {
  const sessionId = req.body.AccountSid;
  const sessionPath = DialogflowCXClient.projectLocationAgentSessionPath(
    PROJECT_ID,
    LOCATION,
    AGENT_ID,
    sessionId
  );
  
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };

  const [response] = await DialogflowCXClient.detectIntent(request);
    
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
      console.log(`Agent Response: ${message.text.text}`);
      sendWhatsappMessage(WhatsappNumber, message.text.text);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
}

function sendWhatsappMessage(whatsappNumber, message) {
  twilioClient.messages
    .create({
      from: 'whatsapp:+14155238886',
      to: whatsappNumber,
      body: message,
    })
    .then(message => {
      console.log(`Message sent successfully ${message.sid}`);
    })
    .catch(err => {
      console.error(`error is ${err}`);
    });
} 
