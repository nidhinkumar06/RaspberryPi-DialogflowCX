<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# Google Cloud Function - TICK Stack

## QuickRead 

With this Cloud Function we will call the InfluxDB to extract the metric(s) based on user input.Once we receive the metric(s) we will add the dialog and some transformations in the metric and then it is send back to DialogflowCX.

## Want to know in detail 👇

In this Cloud Function we will receive the parameters from DialogflowCX to get the selected metric from InfluxDB.Once we receive the parameter type in request body we will do the following

* Requested parameter type is matched and then respective function would be called out
* Before calling the respective function we will send the flux query which needs to be used by mapping it with request parameter type
* We will make the call to InfluxDB to extract the data for the current time
* Once the data is received we will format the data and add texts for it and then it is sent to DialogflowCX again
* If we didn't receive any data then it is catched in error block and then a failure message stating the device offline is sent to DialogflowCX
* Once this response is sent to DialogflowCX it will sent the response as DialogflowCX response to the DialogflowAPI Cloud function which we have created earlier
* Then the response message is sent to the user through Twilio

## Packages used

* InfluxDB Client and API - To connect with InfluxDB
* Moment-timezone - To Format the date to your timezone
* Lodash - Javascript library to write more concise and easier to maintain code 

# Installation Steps

1. Once the Code is downloaded navigate to <b>functions -> Webhook</b> directory and then install the dependencies

        npm install

2. Once the node packages are added, Open the code in your favourite code editor

3. Once the code is opened open <b>constant.js</b> file and replace the `TIME_ZONE` if you want else you can skip to `Step 6`.

4. Want to know your `TIME_ZONE` in moment-timezone check it out here 👉 [Moment Time Zone - Hover over your country to get the Timezone details][timezone]

5. Once the `TIME_ZONE` is updated you can save it (If you want to change the DATE_FORMAT or DIALOGS you can do it)

6. Open `env.js` file and update the configurations like the 👇 below video 

**Note:** All the credentials which you see in the video is just for demonstration purpose.Just create a new one for free.

https://user-images.githubusercontent.com/10459220/130834203-6379f82a-a5a9-424b-90aa-87eeafa5995d.mp4

[timezone]: https://momentjs.com/timezone/

All the installation steps are completed.It's time to Deploy 🚀

## Deploy the cloud function

1. Deploy the cloud function

        gcloud functions deploy tickstack --entry-point influxdb --runtime nodejs14 --trigger-http --allow-unauthenticated

2. Once the code is deployed copy the `TRIGGER_URL` from Google Cloud Functions console like below

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131242114-03db2778-2781-405f-9316-693247651d1c.png" height="300" alt="cloudfunction" title="cloudfunction">
</div>

3. Now add the `TRIGGER_URL` which you have copied and go to DialogflowCX console and select your project and then click `Manage` tab and then select `Webhook` and create a new Webhook and give the name `deviceTemperature` and paste the url and click `Save`