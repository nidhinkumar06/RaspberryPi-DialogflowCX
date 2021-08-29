const {bucket} = require('./env');

const TIME_ZONE = 'Asia/Kolkata';
const DATE_FORMAT = 'DD-MM-YYYY hh:mm:ss a';
const FLUX_QUERIES = {
  'temperature': `from(bucket:"${bucket}") |> range(start: today(), stop: now()) |> filter(fn: (r) => r._measurement == "temp") |> filter(fn: (r) => r["_field"] == "temp") |> filter(fn: (r) => r["sensor"] == "cpu_thermal_input")  |> aggregateWindow(every: 1h, fn: last, createEmpty: false) |> last()`,
  'uptime': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "system") |> filter(fn: (r) => r["_field"] == "uptime") |> last() |> map(fn: (r) => ({r with _value: r._value / 86400}))`,
  'ncpus': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "system") |> filter(fn: (r) => r["_field"] == "n_cpus") |> last()`,
  'systemload': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "system") |> filter(fn: (r) => r["_field"] == "load1") |> last()`,
  'totalmemory': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "mem") |> filter(fn: (r) => r["_field"] == "total") |> last() |> map(fn: (r) => ({r with _value: float(v: r._value) / 1024.0 / 1024.0 / 1024.0}))`,
  'systeminfo': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "system") |> filter(fn: (r) => r["_field"] == "load1" or r["_field"] == "n_cpus" or r["_field"] == "uptime") |> last()`,
  'memoryusage': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "mem") |> filter(fn: (r) => r["_field"] == "used_percent") |> last()`,
  'diskusage': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "disk") |> filter(fn: (r) => r["_field"] == "used_percent") |> last()`,
  'cpusystemusage': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "cpu") |> filter(fn: (r) => r["_field"] == "usage_system") |> last()`,
  'cpuserusage': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "cpu") |> filter(fn: (r) => r["_field"] == "usage_user") |> last()`,
  'cpuidle': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "cpu") |> filter(fn: (r) => r["_field"] == "usage_idle") |> last()`,
  'bandwidth': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "net") |> filter(fn: (r) => r["interface"] == "wlan0") |> filter(fn: (r) => r["_field"] == "bytes_recv" or r["_field"] == "bytes_sent") |> last()`,
  'packets': `from(bucket:"${bucket}") |> range(start: today()) |> filter(fn: (r) => r._measurement == "net") |> filter(fn: (r) => r["interface"] == "wlan0") |> filter(fn: (r) => r["_field"] == "packets_recv" or r["_field"] == "packets_sent") |> last()`,
};
const RPI_FAILUREMESSAGE = [
  'I\'m afraid 😨 that your RaspberryPi has been switched off. Pls check it soon',
  'Looks like the RaspberryPi is not responding ‼️. Pls check it out',
  'Hey, Looks like the RaspberryPi is switched off or it is malfunctioned ‼️. Pls check it soon',
];

const MORE_QUESTIONS = [
  'Would you like to know any other information ?',
  'Do you want any other informations from RPI ?',
  'Any other information would you like to know?',
];

module.exports = {
  TIME_ZONE,
  DATE_FORMAT,
  FLUX_QUERIES,
  RPI_FAILUREMESSAGE,
  MORE_QUESTIONS,
};
