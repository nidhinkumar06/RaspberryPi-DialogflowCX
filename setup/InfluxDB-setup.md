<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# InfluxDB Cloud Setup

We are going to use InfluxDB cloud you can even install InfluxDB OSS version in your system or in VM Instance.

1. Go to [InfluxDB Cloud][influxcloud] and click `Login to InfluxDB Cloud 2.0`
2. Click Signup and fill the detail or you can continue with your `Google` or `Microsoft` account
3. Select the `Region` where you need to store your data as well as add your `Organization name` and click Save

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131152859-60a30d22-8374-4866-b604-c9b045565fab.png" height="300" alt="InfluxDB Region" title="InfluxDB Region">
</div>

4. Select the Plan you want you can go with `Free` plan to start with like below

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131153477-8e6ae361-c8de-434f-82eb-43f2cfb85fa0.png" height="300" alt="InfluxDB Plan" title="InfluxDB Plan">
</div>

5. Once the plan is selected you could see the home page. Click `Data` option which is found on the left hand side 

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131158764-6ba8edf1-e4b6-4587-9bf0-1205565bdc9e.png" height="300" alt="InfluxDB" title="InfluxDB">
</div>

6. Now click `Buckets` tab and then create a new bucket like below

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131158870-9e779a95-cd20-468e-9d15-f5bb68457a16.png" height="300" alt="InfluxDB" title="InfluxDB">
</div>

7. Once the Bucket is created click `Telegraf` tab and then select `System` plugin 

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131158913-7a7eddb8-b209-49ea-97f1-3e176864f81e.png" height="300" alt="InfluxDB" title="InfluxDB">
</div>

8. Click `Continue` and then give some descriptions for the telegraf configuration

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131158966-9b1c412b-273d-4d54-83dd-7efad68c8efc.png" height="300" alt="InfluxDB" title="InfluxDB">
</div>

9. Now click `Continue` again which will show `Token` page, Copy the Token from the clipboard and keep it in a document

<div align="center">
  <img src="https://user-images.githubusercontent.com/10459220/131159675-514dce58-820f-4744-a202-b49d077383b5.png" height="300" alt="InfluxDB" title="InfluxDB">
</div>

10. Now click `Finish` and then download the `telegraf` configuration which we have created now

11. Open it in your editor and then replace the `$INFLUX_TOKEN` with the token you have copied earlier

12. Save the configuration file 

We have completed the InfluxDB cloud setup as well as downloaded the `telegraf` configuration file which is needed for the next step.

The final configuration will look like this

**Note:** `inputs.temp` plugin is not available in the `telegraf.conf` which you have downloaded from InfluxDB.Just look at the below snippet for reference

```
# Configuration for telegraf agent
[agent]
  interval = "10s"
  round_interval = true

  metric_batch_size = 1000

  metric_buffer_limit = 10000

  collection_jitter = "0s"

  flush_interval = "10s"
  flush_jitter = "0s"

  precision = ""

  debug = false
  quiet = false
  logfile = ""

  hostname = ""
  omit_hostname = false
[[outputs.influxdb_v2]]
  urls = ["https://us-east-1-1.aws.cloud2.influxdata.com"]

  ## Token for authentication.
  token = "yourinfluxtoken"

  ## Organization is the name of the organization you wish to write to; must exist.
  organization = "yourorganizationname"

  ## Destination bucket to write into.
  bucket = "dialogflowcx"
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = true
  ## Whether to report total system cpu stats or not
  totalcpu = true
  ## If true, collect raw CPU time metrics.
  collect_cpu_time = false
  ## If true, compute and report the sum of all non-idle CPU states.
  report_active = false
[[inputs.disk]]
  ## By default stats will be gathered for all mount points.
  ## Set mount_points will restrict the stats to only the specified mount points.
  # mount_points = ["/"]
  ## Ignore mount points by filesystem type.
  ignore_fs = ["tmpfs", "devtmpfs", "devfs", "overlay", "aufs", "squashfs"]
[[inputs.diskio]]
[[inputs.mem]]
[[inputs.net]]
[[inputs.processes]]
[[inputs.swap]]
[[inputs.system]]
[[inputs.temp]]
```
**Note:** `inputs.temp` plugin is not available in the `telegraf.conf` which you have downloaded.Just add it like the above one

Move on to the `Telegraf` setup  


[influxcloud]: https://www.influxdata.com/products/influxdb-cloud/