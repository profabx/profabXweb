---
title: "Arduino Basic"
sidebar:
  attrs: { id: tutorial }
---


## 1. Layout
![](https://gitlab.com/picbed/bed/uploads/88dcd4c744fc2bffefb9d28712d87114/UNO-TH_Rev3e_sch.jpg)

## 2. Software
We can download Arduino IDE from [www.arduino.cc](https://www.arduino.cc/en/Main/Software) according to your PC's version and then install by youself.
![](https://gitlab.com/picbed/bed/uploads/fc43aa8769dd9935106558474b9dc073/arduino_ui.png
)

In the meantime we can use developers' software as following:

* [S4A](http://s4a.cat/)
* [Mblock](https://www.mblock.cc/zh-cn/)
* [BlockyDuino](https://sourceforge.net/projects/blocklyduinoenhanced/?css-reload=1)
* [motoduino/motoblockly](https://www.motoduino.com/motoblockly/)
* [Webduino Blockly](https://bit.webduino.io/blockly/?lang=zh-hant)
* [Visual Studio Code extension for Arduino](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-arduino)

## 3. Hardware

![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/aduinounor4.png)

![](https://gitlab.com/picbed/bed/uploads/9d4306ae40072cc40857177a01d4f73c/a000066_featured_5.jpg)

| Difference      | R3 |        R4 Minima   |  R4 WiFi  |  
| ------------- | :-----:|:-----:|	:-----:|
|   MCU    |  ATmega3238p| 	Arm Cortex- M4 | Arm Cortex- M4 +ESP32-S3 Mini | 
| WiFi Connectivity | NO|YES|YES	|
|Bluetooth  | NO|YES|YES	|
|12×8 LED Matrix  |NO |YES|YES	|
| CAN Bus |NO |YES|YES	|
|  USB port| |USB-C|USB-C	|
| Digital I/O Pins | 14|14(14-bit)|14(14-bit)	|
|  Analog input pins| 6|6|6	|
| PWM pins | 6|6(12-bit)|	6(12-bit)|
|Input voltage (VIN)  | 6-20V|6-24 V|	6-24 V|
| Memory | 32 kB Flash, 2 kB RAM|256 kB Flash, 32 kB RAM|	256 kB Flash, 32 kB RAM,ESP: 384 kB ROM, 512 kB SRAM|
| Clock speed | 16 MHz|48 MHz|48 MHz,ESP: 240 MHz	|



[ the difference between UNO R3 and UNO R4 boards](https://support.arduino.cc/hc/en-us/articles/9350551575964-What-s-the-difference-between-UNO-R3-and-UNO-R4-boards-)
Arduino Uno is a microcontroller board based on the ATmega328P (datasheet). It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator (CSTCE16M0V53-R0), a USB connection, a power jack, an ICSP header and a reset button. It contains everything needed to support the microcontroller; simply connect it to a computer with a USB cable or power it with a AC-to-DC adapter or battery to get started.. You can tinker with your Uno without worrying too much about doing something wrong, worst case scenario you can replace the chip for a few dollars and start over again. 
"Uno" means one in Italian and was chosen to mark the release of Arduino Software (IDE) 1.0. The Uno board and version 1.0 of Arduino Software (IDE) were the reference versions of Arduino, now evolved to newer releases. The Uno board is the first in a series of USB Arduino boards, and the reference model for the Arduino platform; for an extensive list of current, past or outdated boards see the Arduino index of boards
**reference from [arduino.cc](https://store.arduino.cc/usa/arduino-uno-rev3)**

The following is Arduino  family


**For Entry Level**

![](https://gitlab.com/picbed/bed/uploads/fc61573ce94379ade9d85767694ae594/WX20200414-203551_2x.png
)

**Enhanced Features**
![](https://gitlab.com/picbed/bed/uploads/06f5cc98202d7b25f69f2c09bca24463/WX20200414-203618_2x.png)

**Internet of Things**
![](https://gitlab.com/picbed/bed/uploads/d12b7147bb3be32e74eb2c01125bc710/WX20200414-203634_2x.png)

**Education**
![](https://gitlab.com/picbed/bed/uploads/a49e751018cf2dc054795a7fca38f72f/WX20200414-203646_2x.png)







## 3.Application
[Arduino pro](https://www.arduino.cc/pro) is a complete low-code IoT application development platform, making digital transformation possible for companies in simple, realistic, and measurable steps
![](https://gitlab.com/picbed/bed/uploads/e2ef968d0082d3e31fb685c4e83495fe/1586900339815.jpg)


##  4. Component
  
breadboard
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/Breadboard_Anno.jpeg)

Resistor color 
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/resistorcolor.png)
## 5. Others
1. [Seeedstudio Xiao](https://www.seeedstudio.com/xiao-series-page)
2. [M5stack](https://m5stack.com/zh-cn/)
3. [ESP32](https://www.espressif.com/zh-hans/products/socs/esp32-c2)
4. [DFrobot](https://www.dfrobot.com)
5. [vscode run Arduino](https://medium.com/@thomas.kilmar/arduino-cli-with-visual-studio-code-on-macos-d2ad32ff0276)