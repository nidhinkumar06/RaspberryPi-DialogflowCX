<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# Google Cloud Function - Twilio DialogflowCX API 

## QuickRead 

With this cloud function we will receive the user request from Twilio.Then the message is passed to the DialogflowCX API to detect the intent and get the response from DialogflowCX API.
Once we receive the response it is sent back to the user using Twilio.


## Want to know in detail 👇

* With this cloud function we will receive the user request from Whatsapp using TWilio and once the request is received we will destructure it (break the request) to extract the messsage send by the user.
* Now we will detect the intent based on the message sent by the user using DialogflowCX API.Once we receive the response from the matched intent it is sent to the user again using Twilio
* Once we receive the request from Twilo we will do the following

1. The request is destructured and then the message is extracted from the request and it is sent to `detectIntentText` function.
2. In the `detectIntentText` function we will get response once the message is matched with  any of the intent
3. That response message is sent to the user using `sendWhatsappMessage` function
4. To maintain a session for the current user we have passed the `AccountSid` which we received from Twilio as `SessionId` to DialogflowCX API

## Packages used

* DialogflowCX API - To connect with Dialogflow CX
* Twilio - To send messages to users via Whatsapp

# Installation Steps

1. Once the Code is downloaded navigate to <b>functions -> DialogflowCXAPI </b> directory and then install the dependencies

        npm install

2. Once the node packages are added, Open the code in your favourite code editor
3. Open `env.js` file and then add the PROJECT_ID, LOCATION, etc., like below video 👇

https://user-images.githubusercontent.com/10459220/131243314-5b10430c-be89-4ecf-850a-cdc8281cb505.mp4

All the installation steps are completed. It's time to Deploy 🚀

## Deploy the cloud function

1. Deploy the cloud function

        gcloud functions deploy helloWorld --runtime nodejs14 --trigger-http --allow-unauthenticated

2. Once the code is deployed copy the `TRIGGER_URL` from Google Cloud Function and paste it in your Twilio Whatsapp sandbox like below 👇

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131226481-cc56387d-4dc7-49a6-a775-835126600b8f.png" height="300" alt="twilio" title="twilio">
</div>


Now test the connection by opening your Whatsapp and create a new contact with the Whatsapp Twilio number which you can see on the Twilio console like below

 <div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131226457-ce41c1ff-1183-4a98-94f2-43cae719ece7.png" height="300" alt="twilio" title="twilio">
</div>

Once the contact is created type the join code which is shown in the Twilio page like below 

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131226457-ce41c1ff-1183-4a98-94f2-43cae719ece7.png" height="300" alt="twilio" title="twilio">
</div>

Once the image is added you can start the conversation by just saying Hi

**Note:** Make sure the telegraf agent is running in your RaspberryPi/ System.