<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# Telegraf setup

In this setup we will see how to install the Telegraf agent in your system and create a background service to run the telegraf automatically when the system restarts (Ubuntu and Windows)

### Telegraf Installation

* To install telegraf in your system [click on the telegraf link][telegraf] and then scroll down to `Telegraf` and then select your OS and follow the instructions provided over there
<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131164155-721780cf-99f3-4bf8-9ffc-1deadb09717a.png" height="300" alt="telegraf" title="telegraf">
</div>

* If you are having RaspberryPi and in which if you have installed `Ubuntu` Image then select 
 
 <div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131164207-3593f09a-1895-413a-860d-51fb9d722510.png" height="300" alt="telegraf" title="telegraf">
</div>

## Setup Instructions for Ubuntu

Once the telegraf is installed you could see the folder named telegraf-1.19.3 navigate to that folder and do the following

```
cd telegraf-1.19.3 ; 
sudo cp -rp usr/* /usr ;
sudo cp -rp etc/* /etc ;
sudo cp -rp var/* /var
```

We have moved the telegraf binaries, configuration file and then libraries to the respective locations

Now navigate to `/etc/systemmd/system` and then create a new file named `telegraf.service` and then open that file in your text editor and then add the below contents to start the telegraf service automatically during system restart

```
[Unit]
Description=Telegraf service


[Service]
ExecStart=/usr/bin/telegraf -config /etc/telegraf/telegraf.conf
NotifyAccess=main
#WatchdogSec=10
Restart=on-failure
ProtectHome=true
ProtectSystem=full

[Install]
WantedBy=multi-user.target

```

`Save` the configuration file and then navigate to `/etc/telegraf` and then open `telegraf.conf` file and then clear the contents inside that file and add the contents of the telegraf configuration which you have downloaded during InfluxDB setup

**Note:** If you accidentally deleted the telegraf.conf file no problem, create a new telegraf.conf file and then add the telegraf configurations which you have downloaded earlier.Make sure to give the file permission with the following command

```
//file mode: Telegraf conf: -rwx------ 
sudo chmod 700 telegraf.conf
```


and then enable the service using the below commands in your terminal

```
sudo systemctl enable telegraf.service
sudo systemctl start telegraf.service
sudo systemctl status telegraf.service
```
**Note:** If you make any changes in `telegraf.conf` file then restart the telegraf service using the above command
 
Once the telegraf status is like the below image means then your are good to go

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131166395-701b0b7d-bc11-4824-84a8-788eeb69fe7c.png" height="300" alt="telegraf" title="telegraf">
</div>

## Setup Instructions for Windows

1. Open a Windows shell and navigate to the directory where Telegraf file is downloaded and then install telegraf using the below command

```
.\telegraf.exe --service install --config "pathofyour \telegraf.conf"
```

#### Example

```
C:\Program Files\InfluxData\Telegraf> .\telegraf.exe --service install --config "C:\Program Files\InfluxData\Telegraf\telegraf.conf"
```

In the above case i have created a folder named `InfluxData` in that a sub-folder `Telegraf` downloaded the telegraf binary in that location

2. To start the telegraf service use the below command in that path itself

```
.\telegraf.exe --service start
```

Once the telegraf service is started open your InfluxDB cloud and then click `Explore` and the click the `Bucket` which you have created Now you could see the metrics reported from your system to InfluxDB via Telegraf agent

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131167743-a6ecd696-6294-4539-a535-9d3850558324.png" height="300" alt="telegraf" title="telegraf">
</div>

Congrats you have completed the telegraf setup 

[telegraf]: https://portal.influxdata.com/downloads/