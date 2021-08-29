<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# DialogflowCX Setup

If you have not done the previous steps kindly do it at first.

1. Export the DialogflowCX Blob file to your DialogflowCX console like below.Create a new project in DialogflowCX and Enable `Billing` and Enable `Dialoflow API`

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131241607-2743a2ce-c7b9-437d-bd87-f1c3a8416439.png" height="300" alt="Dialogflowcx" title="Dialogflowcx">
</div>

2. Create a new agent like below

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131241619-4f3c4ec7-899b-451b-a2bd-874a6487064c.png" height="300" alt="Dialogflowcx" title="Dialogflowcx">
</div>

3.Restore the agent by importing the blob file named `exported_agent_RaspberryPi` blob file

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131241627-04dae1f3-e4cc-48a8-915a-08e0c501741f.png" height="300" alt="Dialogflowcx" title="Dialogflowcx">
</div>

4. Once the agent is imported, Click `Manage` and select `Webhook`.

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131241644-59aecc2e-8d5c-4797-bc87-b11a4ba7a924.png" height="300" alt="Dialogflowcx" title="Dialogflowcx">
</div>

5. Click on the webhook and change the Webhook url which you have deployed in influxdb cloud function.

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131241663-b47409a3-9ba9-46f1-b308-b39e6e1527eb.png" height="300" alt="Dialogflowcx" title="Dialogflowcx">
</div>

6. Save the Webhook and test the agent

Congratulation 👏 You have successfully restored the DialogflowCX agent.