<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# RaspberryPi Monitoring using TICK Stack and DialogflowCX

Don't worry if you don't have RaspberryPi, It will work in your System (If it has any one of the OS - Linux, Windows, Mac) 

## About
We are in the age of Edge Computing where we can get data for every second. But to monitor/view the data we have to open an application(Web/Mobile) every time navigate to different pages, scroll the sliders, filter the dates to view a piece of information.
But what if we can get information in no time through a single message or by asking a single straight question.

Yes with the help of DialogflowCX and InfluxDB we can get the piece of information in no time no need to open the application, no navigation, and even no authentication.

## What we are going to do
1. We will collect the system metrics such as (CPU usage, Network usage, Disk usage, System uptime, and Memory usage) from your Raspberry Pi or from your System.
2. The collected metrics are stored in the Timeseries Database (InfluxDB)
3. We will create the Virtual agent in DialogflowCX to handle user conversation
4. After that we will create CloudFunction to handle the request from Twilio and send it to DialogflowCX using DialogflowCX API
5. Then we would create another CloudFunction which will collect the response from DialogflowCX and pass it to InfluxDB to collect metrics
6. The collected metrics from InfluxDB will be sent to the user Via Twilio using CloudFunction

## Architecture

<div align="center">
<img src="https://user-images.githubusercontent.com/10459220/131242324-bd0fcf28-b08d-4dc3-bcde-e351d3ebf9d1.gif" alt="Monitoringflow" height="400">
</div>

1. User starts a conversation from Whatsapp which is sent to Twilio
2. Twilio will send the user message received from Whatsapp to CloudFunction
3. CloudFunction will destructure the request received from Twilio and sent the message to DialogflowCX API to match the intent
4. DialogflowCX API matches the intent based on user request(message) and calls the Webhook which is added with the page
5. CloudFunction will make a call to the InfluxDB to fetch the data based on the query
6. InfluxDB returns the result to CloudFunction
7. CloudFunction process that information by adding messages and sent back to Twilio
8. Twilio sents that message to the user Whatsapp

### DialogflowCX Architecture
<div align="center">
<img src="https://user-images.githubusercontent.com/10459220/131151105-7312e52b-853c-4b2e-8056-cf22f79ef315.png" alt="DialogflowCX" height="400">
</div>

### Stack used for developing

* Telegraf - Agent which will collect metrics from RaspberryPi
* InfluxDB - Timeseries Database which stores the information collected by Telegraf
* DialogflowCX - Virtual agent that handles conversations
* CloudFunction - Logics to connect Twilio and InfluxDB with DialogflowCXAPI 
* Twilio - Cloud communication platform to send and receive Whatsapp messages

## Get Started
Follow the below steps to complete all the installation process

RaspberryPi - UbuntuOS installation (Optional) - [Click here to view the setup][raspberrysetup]

1. InfluxDB Cloud setup - [Click here to view the setup][influxdbsetup]
2. Telegraf setup - [Click here to view the setup][telegrafsetup]
3. Twilio setup - [Click here to view the setup][twiliosetup]
4. CloudFunction(Connecting Twilio and DialogflowCX) setup - [Click here to view the setup][twiliocloudsetup]
5. CloudFunction(Collecting Metrics from InfluxDB) setup - [Click here to view the setup][influxdbcloudsetup]
6. Importing DialogflowCX - [Click here to view the setup][dialogflowsetup]


## Demo

https://user-images.githubusercontent.com/10459220/131241019-204be19d-2964-4e60-bf08-d05cfba91b3f.mp4

## License

For Apache-2.0 exceptions, see [LICENSING.md][license].

[raspberrysetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/setup/RaspberryPi-setup.md
[influxdbsetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/setup/InfluxDB-setup.md
[telegrafsetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/setup/Telegraf-setup.md
[twiliocloudsetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/functions/DialogflowCXAPI/README.md
[influxdbcloudsetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/functions/Webhook/README.md
[twiliosetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/setup/Twilio-setup.md
[dialogflowsetup]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/setup/Dialogflow-setup.md 
[license]: https://github.com/nidhinkumar06/TICKStackDialogflowCX/blob/main/LICENSE