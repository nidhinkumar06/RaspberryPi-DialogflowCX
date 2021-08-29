'use strict';

const {InfluxDB} = require('@influxdata/influxdb-client');
const moment = require('moment-timezone');
const {size, find, shuffle, random} = require('lodash');

const {TIME_ZONE, DATE_FORMAT, FLUX_QUERIES, RPI_FAILUREMESSAGE, MORE_QUESTIONS} = require('./constants');
const {url, token, org, timeout} = require('./env');

let message = '';
const randomNumber = random(0, 2);
const otherQuestion = shuffle(MORE_QUESTIONS)[randomNumber];

exports.influxdb = (req, res) => {
  const type = req.body.sessionInfo.parameters.type;
  const query = FLUX_QUERIES[type];
  switch (type) {
    case 'temperature':
      getDeviceTemperature(query, res);
      break;
    case 'systeminfo':
      getDeviceInfo(query, res);
      break;
    case 'totalmemory':
      getTotalMemory(query, res);
      break;
    case 'memoryusage':
      getMemoryUsage(query, res);
      break;
    case 'diskusage':
      getDiskUsage(query, res);
      break;
    case 'cpusystemusage':
      getCPUSystemUsage(query, res);
      break;
    case 'cpuserusage':
      getCPUUserUsage(query, res);
      break;
    case 'cpuidle':
      getCPUIdleUsage(query, res);
      break;
    case 'bandwidth':
      getBandwidthUsage(query, res);
      break;
    case 'packets':
      getPacketsInfo(query, res);
      break;
    default:
      break;
  }
};

/* Gets CPU Temperature in Raspberry Pi */
const getDeviceTemperature = async (query, res) => {
  const temperatureData = await collectInfluxRows(query);

  if (size(temperatureData) > 0) {
    const value = temperatureData[0]._value === null ? 0.0 : temperatureData[0]._value;
    const currentTime = moment.tz(temperatureData[0]._time, TIME_ZONE).format(DATE_FORMAT);

    message = `RaspberryPi has reported a temperature 🌡️ of ${parseFloat(value.toFixed(2))} °C at 🕛 ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets Raspberry Pi device information such as system load, system uptime */
const getDeviceInfo = async (query, res) => {
  const deviceInfoData = await collectInfluxRows(query);

  if (size(deviceInfoData) > 0) {
    const systemLoad = find(deviceInfoData, ['_field', 'load1']);
    const upTime = find(deviceInfoData, ['_field', 'uptime']);
    const cpuCore = find(deviceInfoData, ['_field', 'n_cpus']);
    const currentTime = moment.tz(systemLoad._time, TIME_ZONE).format(DATE_FORMAT);

    const upTimeValue = secondsToDhms(upTime._value);
    message = `Hi Your RaspberryPi named ${systemLoad.host} has been up for ${upTimeValue}. It has ${cpuCore._value} core ncpus. \n Right now the system load of ${systemLoad.host} is ${systemLoad._value}. The above information has been reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets Raspberry Pi total memory information */
const getTotalMemory = async (query, res) => {
  const deviceMemoryData = await collectInfluxRows(query);

  if (size(deviceMemoryData) > 0) {
    const totalMemory = deviceMemoryData[0];
    message = `Hi Your RaspberryPi named ${totalMemory.host} has a total memory of ${parseFloat(totalMemory._value.toFixed(2))} GB. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets the current memory usage of Raspberry Pi */
const getMemoryUsage = async (query, res) => {
  const memoryUsageData = await collectInfluxRows(query);

  if (size(memoryUsageData) > 0) {
    const memoryUsage = memoryUsageData[0];
    const currentTime = moment.tz(memoryUsage._time, TIME_ZONE).format(DATE_FORMAT);
    message = `Hi Your RaspberryPi device has a memory usage of ${parseFloat(memoryUsage._value).toFixed(1)} %. The above information was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets the Raspberry Pi Disk space */
const getDiskUsage = async (query, res) => {
  const diskUsageData = await collectInfluxRows(query);

  if (size(diskUsageData) > 0) {
    const diskUsage = diskUsageData;
    const fsTypeone = find(diskUsage, {'fstype': 'vfat', 'mode': 'ro'});
    const currentTime = moment.tz(diskUsage[0]._time, TIME_ZONE).format(DATE_FORMAT);

    message = `About ${parseFloat(fsTypeone._value).toFixed(2)} % of disk space has been utilized in your RaspberryPi. The above information was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets RaspberryPi CPU System usage */
const getCPUSystemUsage = async (query, res) => {
  const systemUsageData = await collectInfluxRows(query);

  if (size(systemUsageData) > 0) {
    const usageData = find(systemUsageData, ['cpu', 'cpu-total']);
    const currentTime = moment.tz(usageData._time, TIME_ZONE).format(DATE_FORMAT);

    message = `Here is the CPU System usage for RaspberryPi, usage ${parseFloat(usageData._value).toFixed(2)} %. It was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets RaspberryPi CPU User usage  */
const getCPUUserUsage = async (query, res) => {
  const userUsageData = await collectInfluxRows(query);

  if (size(userUsageData) > 0) {
    const usageData = find(userUsageData, ['cpu', 'cpu-total']);
    const currentTime = moment.tz(usageData._time, TIME_ZONE).format(DATE_FORMAT);

    message = `Here is the CPU User usage for RaspberryPi, usage ${parseFloat(usageData._value).toFixed(2)} %. It was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets RaspberryPi CPU Idle usage */
const getCPUIdleUsage = async (query, res) => {
  const idleUsageData = await collectInfluxRows(query);

  if (size(idleUsageData) > 0) {
    const usageData = find(idleUsageData, ['cpu', 'cpu-total']);
    const currentTime = moment.tz(usageData._time, TIME_ZONE).format(DATE_FORMAT);

    message = `Here is the CPU Idle usage for RaspberryPi, usage ${parseFloat(usageData._value).toFixed(2)} %. It was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets RaspberryPi Bandwidth usage */
const getBandwidthUsage = async (query, res) => {
  const bandwidthData = await collectInfluxRows(query);

  if (size(bandwidthData) > 0) {
    const currentTime = moment.tz(bandwidthData[0]._time, TIME_ZONE).format(DATE_FORMAT);
    const bytesReceived = find(bandwidthData, ['_field', 'bytes_recv']);
    const bytesSent = find(bandwidthData, ['_field', 'bytes_sent']);

    const bytesSentSize = bytesToSize(bytesSent._value);
    const bytesRecvSize = bytesToSize(bytesReceived._value);

    message = `Here is the network usage information for the WAN interface from RaspberryPi Bytes Sent ${bytesSentSize}, Bytes Received ${bytesRecvSize}. It was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Gets RaspberryPi Network packet informations */
const getPacketsInfo = async (query, res) => {
  const packetsData = await collectInfluxRows(query);

  if (size(packetsData) > 0) {
    const currentTime = moment.tz(packetsData[0]._time, TIME_ZONE).format(DATE_FORMAT);
    const packetsReceived = find(packetsData, ['_field', 'packets_recv']);
    const packetsSent = find(packetsData, ['_field', 'packets_sent']);

    message = `Here is the packets information for the WAN interface from RaspberryPi Packets Sent ${parseFloat(packetsSent._value).toFixed(2)}, Packets Received ${parseFloat(packetsReceived._value).toFixed(2)}. The above information was reported at ${currentTime}. ${otherQuestion}`;
  } else {
    message = shuffle(RPI_FAILUREMESSAGE)[randomNumber];
  }

  sendFulfillmentResponse(message, res);
};

/* Below function is to collect the rows from InfluxDB */
const collectInfluxRows = async (query) => {
  const fluxData = [];
  const influxApi = new InfluxDB({url, token, timeout}).getQueryApi(org);

  await influxApi
      .collectRows(query)
      .then((datas) => {
        datas.forEach((data) => {
          fluxData.push(data);
        });
      })
      .catch((error) => {
        console.error(error);
        console.log('\nError in receiving record from InfluxDB');
      });
  console.log('fluxdata is', fluxData);
  return fluxData;
};

/* Below functions sends the response which is received from InfluxDB to DialogflowCX */
const sendFulfillmentResponse = (message, res) => {
  const returnResponse = {
    fulfillmentResponse: {
      messages: [
        {
          text: {
            text: [message],
          },
        },
      ],
    },
  };

  return res.status(200).send(returnResponse);
};

/* Function to convert seconds to Relative time */
const secondsToDhms = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600*24));
  const h = Math.floor(seconds % (3600*24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

/* Function to convert bytes to Size */
const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
