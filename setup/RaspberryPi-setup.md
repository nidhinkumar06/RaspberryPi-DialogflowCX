<img src="https://user-images.githubusercontent.com/10459220/130834291-1a197013-91d3-45bb-8942-2cba5778bf60.png" alt="RaspberryPiMonitoring" title="RaspberryPiMonitoring" align="right" height="250" width="250"/>

# RaspberryPi Ubuntu OS installation

We are going to Install Ubuntu OS in RaspberryPi to do that you should need the following

* RaspberryPi4
* SD Card (Min 16GB)
* SD Card Reader

1. In your system download the [RaspberryPi Imager][rpi] and then open the RaspberryPi Imager and then insert the SD card in your system and then 

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131225736-d6b9c893-f493-44c3-bf71-80e8fd7b14d5.png" alt="rpi" title="rpi">
</div>

2. Select `Other General Purpose OS` and choose `Ubuntu`

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131225742-2ea38329-ed05-4374-8077-4c2569520588.png" alt="rpi" title="rpi">
</div>

3. Select `Ubuntu Server OS` with the latest version 

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131225755-aaa6629a-95c9-407f-88af-1fe9da10663b.png" alt="rpi" title="rpi">
</div>

4. Once the OS is selected choose `Storage` and click `Write`

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131225759-1a7fef5d-2839-4922-b2ce-d19bbd1bfceb.png" alt="rpi" title="rpi">
</div>

5. Once the device is flashed now we will add the wifi support open the system-boot and then select network-config file. With the SD card still inserted in the card reader, open the file manager and locate the `system-boot` partition on the card.

6. The file that you are looking for and need to edit is named `network-config`.

7. This process can be done on Windows and MacOS too. Edit the network-config file as already mentioned to add your Wi-Fi credentials.

Firstly, uncomment (remove the hashtag “#” at the beginning) from lines that are included in the rectangular box.

After that, replace myhomewifi with your Wi-Fi network name enclosed in quotation marks, such as nidhin and the “E409933” with the Wi-Fi password enclosed in quotation marks, such as “12345679”.

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131226001-76dc36b7-6471-4e89-bc43-17d9f85dbaa3.png" alt="rpi" title="rpi">
</div>

8. Save the file and insert the micro SD card into your Raspberry Pi. During the first boot, if your Raspberry Pi fails connect to the Wi-Fi network, simply reboot your device.

9. Now the check the new devices connected in your network, In linux use the `nmap` command `sudo nmap -sn 192.168.0.0/24` and get the IP address of RaspberryPi

10. Open a terminal in your system and give the ssh command like below `ssh ubuntu@raspberry_pi_ip_address`

11. Now when asked for the password type `ubuntu` after that you will be asked to reset the password

<div align="center">
   <img src="https://user-images.githubusercontent.com/10459220/131226182-f21adca2-42f3-4260-9536-44037e21bdd6.png" alt="rpi" title="rpi">
</div>

Now you have installed ubuntu OS in RaspberryPi


[rpi]: https://www.raspberrypi.org/software/