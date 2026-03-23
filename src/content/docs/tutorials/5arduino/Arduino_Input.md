---
title: "Arduino Input"
sidebar:
  attrs: { id: tutorial }
---


## Arduino Input
### 1. Switch
We can use swith to control the circuit, in this case we use pin 7 as input port
![](https://gitlab.com/picbed/bed/uploads/52a1ceb83850823feb5775e01e0a5ba5/Screen_Shot_2020-10-23_at_09.07.12.png)

```cpp
const int LED1=12;
const int LED2=13;
int val=0; 
void setup()
{ 
  pinMode(LED1, OUTPUT); 
  pinMode(LED2, OUTPUT); 
  pinMode(7, INPUT);     
}
void loop(){
val=digitalRead(7);
  if(val==HIGH)
{
    digitalWrite(LED1,HIGH);
    digitalWrite(LED2,LOW);
}
else
{ 
    digitalWrite(LED2,HIGH);
    digitalWrite(LED1,LOW);  
}
delay(1000);
}
```


### 2. Ultrasonic sensor 

![](https://gitlab.com/picbed/bed/uploads/75ab6091513646289bb1d6b29de9baef/45e34-7ba12-3228a-edc97-69296-118153703ac9ae.gif)

![](https://gitlab.com/picbed/bed/uploads/cb2d11556c943940d47e17bbc0404606/997f3-ac7e9-a5dc0-8bc3a-ec0e5-15730a9aa6c424.gif)

```
Distance=time * speed
if time is 500us, speed=340m/s=0.034cm/us
So,real Distance=Distance/2=0.034*500/2=8.5cm
```

|Name|Parameter|
|----|----|
|Voltage|DC 5V|
|Current|15mA|
|Ultrasonic frequence|40KHz|
|Distance|20mm~4000mm|
|Precision|3mm|
|Degree|15|
|Signal|10us TTL|




![](https://gitlab.com/picbed/bed/uploads/eb2b5536c5f8a9e503398720c0a1cc4d/Screen_Shot_2020-10-22_at_11.44.00.png)

```cpp
// circuit

/*
Arduino		SR04
5V		---	VCC
A0		---	Trig
A1		---	Echo
GND		---	GND
*/

// pin setting

#define TrigPin A0	
// __|^|_____________
// 10us or more HITH SIGNAL will drive it work for one time

#define EchoPin A1	
// ______|^^^^^^^^|__ 
// PULSE WIDTH stand for distance(the time of ultrasound transmit, both go and back)
// pulse width WILL NOT long than 38ms, it means timeout
// Distance = Speed x Time
// Speed of sound ~= 340m/s = 0.340mm/us

int count = 0;

long duration;
// PULSE WIDTH

void setup() {
    // set Serial communication
    Serial.begin(115200);
    // set pin mode
    pinMode(TrigPin, OUTPUT);
    pinMode(EchoPin, INPUT);
    // init pin
    digitalWrite(TrigPin, LOW);
    delay(1);
}

void loop() {
    Serial.println(count++);
    Serial.println(getDistance());
    Serial.println("");
    Serial.println("");
    delay(1000);
}

long getDistance() {
    // trig
    digitalWrite(TrigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(TrigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(TrigPin, LOW);
    // echo
    duration = pulseIn(EchoPin, HIGH); 	// unit: us
    return duration * 0.34029 / 2; 		// unit: mm
}

```










### 3. Temperature sensor
![](https://gitlab.com/picbed/bed/uploads/39121a601bd52777197a4c9b5de46621/temperature_tmp36pinout.gif)
![](https://gitlab.com/picbed/bed/uploads/831b78bcdd7c99281cbcc60f55bf0b5d/TMP36GZ.jpg)

```cpp
const int temperaturePin = 0;

void setup()
{ 
  Serial.begin(9600);
}

void loop()
{

  float voltage, degreesC, degreesF;

  voltage = getVoltage(temperaturePin);
  degreesC = (voltage - 0.5) * 100.0;
  degreesF = degreesC * (9.0/5.0) + 32.0;

  Serial.print("voltage: ");
  Serial.print(voltage);
  Serial.print("  deg C: ");
  Serial.print(degreesC);
  Serial.print("  deg F: ");
  Serial.println(degreesF);
   
  delay(1000); // repeat once per second (change as you wish!)
}

float getVoltage(int pin)
{

  return (analogRead(pin) * 0.004882814);
 
}
```

### 4.Air sensor
 We use MQ-2 air sensor to do this test

 ![](https://gitlab.com/picbed/bed/uploads/015c4cc84f7fe84d194f026fff4d20f9/WX20200415-152026_2x.png)
```cpp
 void setup()
{
    Serial.begin(9600);
}
void loop()
{
    int val;
    val=analogRead(0);
    Serial.println(val,DEC);
    delay(100);
}
```


### 5. DHT-11: Humidity/Temperature sensors

![](https://gitlab.com/picbed/bed/uploads/bf7bc916bb1a43e2ab5e2db77ae4bd92/arduinodht11connect.jpeg)
![](https://gitlab.com/picbed/bed/uploads/b4c2cbfc14b4ddb5258cd1d4aea9fbb9/Arduinodht11.png)


Add Library in   Sketch/Include Library/Manage Libraries ,search DHT Sensor library


```cpp
// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

// REQUIRES the following Arduino libraries:
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor

#include "DHT.h"

#define DHTPIN A0     // Digital pin connected to the DHT sensor
// Feather HUZZAH ESP8266 note: use pins 3, 4, 5, 12, 13 or 14 --
// Pin 15 can work but DHT must be disconnected during program upload.

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// NOTE: If using a board with 3.3V logic like an Arduino Due connect pin 1
// to 3.3V instead of 5V!
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

// Initialize DHT sensor.
// Note that older versions of this library took an optional third parameter to
// tweak the timings for faster processors.  This parameter is no longer needed
// as the current DHT reading algorithm adjusts itself to work on faster procs.
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println(F("DHTxx test!"));

  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.println(F("°F"));
}

```

#### 6. IR-remote

![](https://gitlab.com/picbed/bed/uploads/eabd8ceb348af1596368633ad55794a6/WechatIMG21.png)

![](https://gitlab.com/picbed/bed/uploads/e367029fd38ab5be80796359e0f054e2/WechatIMG22.png)

Add Library in   Sketch/Include Library/Manage Libraries ,search IR-remote




```cpp
/*
 * IRrecvDemo
 * Receive singal and the PCB LED light
 */

#include <IRremote.h>

int RECV_PIN = 11;
int LED_PIN = 13;

IRrecv irrecv(RECV_PIN);

decode_results results;

void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn(); // Start the receiver
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);
}

void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    if (results.value == 0xFFA25D) //light on
    {
      digitalWrite(LED_PIN, LOW);
    } else if (results.value == 0xFF629D) //light off
    {
      digitalWrite(LED_PIN, HIGH);
    }
    irrecv.resume(); // Receive the next value
  }
  delay(100);
}

```





### 7. Keypad

![](https://gitlab.com/picbed/bed/uploads/521c1059e701576e9521f44873db7dd5/Screen_Shot_2020-10-22_at_12.26.43.png)

Add Library in   Sketch/Include Library/Manage Libraries

![](https://gitlab.com/picbed/bed/uploads/06d98b0e17ffa0e3103d49c76a92d632/WX20201022-123119_2x.png)


```cpp

#include <Keypad.h>


 
const byte ROWS = 4; //four rows
const byte COLS = 4; //three columns
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {5, 4, 3, 2}; //connect to the row pinouts of the keypad
byte colPins[COLS] = {9,8, 7, 6}; //connect to the column pinouts of the keypad
 
Keypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );
 
void setup(){
  Serial.begin(9600);
}
  
void loop(){
  char key = keypad.getKey();
  
  if (key){
    Serial.println(key);
  }
}
```
[Library information](https://www.arduino.cc/reference/en/libraries/keypad/)


### 8.Sharp GP2Y10



![](https://gitlab.com/picbed/bed/uploads/6f700260306bc7f920364993e5e7cd44/9770feae06.png
)

```cpp
#define        COV_RATIO                           0.17           // (ug/m3) / mv
#define        NO_DUST_VOLTAGE         600            // mv
#define        SYS_VOLTAGE                     5000          // ADC参考电压    

/*
I/O define
*/
const int iled = 3;                                           //drive the led of sensor
const int vout = 0;                                           //analog input

/*
variable
*/
float density, voltage;
int   adcvalue;

/*
private function
*/
int Filter(int m)
{
  static int flag_first = 0, _buff[10], sum;
  const int _buff_max = 10;
  int i;
  
  if(flag_first == 0)
  {
    flag_first = 1;

    for(i = 0, sum = 0; i < _buff_max; i++)
    {
      _buff[i] = m;
      sum += _buff[i];
    }
    return m;
  }
  else
  {
    sum -= _buff[0];
    for(i = 0; i < (_buff_max - 1); i++)
    {
      _buff[i] = _buff[i + 1];
    }
    _buff[9] = m;
    sum += _buff[9];
    
    i = sum / 10.0;
    return i;
  }
}

void setup(void)
{
  pinMode(iled, OUTPUT);
  digitalWrite(iled, LOW);                                     //iled default closed
  Serial.begin(9600);                                          //send and receive at 9600 baud
}

void loop(void)
{
  /*
  get adcvalue
  */
  digitalWrite(iled, HIGH);
  delayMicroseconds(280);
  adcvalue = analogRead(vout);
  delayMicroseconds(40);
  digitalWrite(iled, LOW);
  
  adcvalue = Filter(adcvalue);
  
  /*
  covert voltage (mv)
  */
  voltage = (SYS_VOLTAGE / 1024.0) * adcvalue * 11;
  
  /*
  voltage to density
  */
  if(voltage >= NO_DUST_VOLTAGE)
  {
    voltage -= NO_DUST_VOLTAGE;
    density = voltage * COV_RATIO;
  }
  else
    density = 0;
    
  
  Serial.print("The current dust concentration is: ");
  Serial.print(density);
  Serial.print(" ug/m3\n");  
  
  delay(1000);
}
```




### [9.Digital infrared sensor](https://374737390.wixsite.com/my-site/autocat)
* Aim:Use the infrared sensor to control the switching state of RGB LED. When the infrared sensor detects an object within the range, the RGB LED turns on and flashes in red, yellow and green. At the same time, the button switch can also control the on state of RGB LED.
* Digital infrared sensor: The sensor module has a strong ability to adapt to environmental light, it has a pair of infrared transmitting and receiving tubes, transmitting tubes emit a certain frequency of infrared light, when the detection direction encounters an obstacle (reflective surface), the infrared light is reflected back to be received by the receiving tube, after the comparator circuit processing, the green indicator will light up, while the signal output interface output digital signal (a low-level signal), can be adjusted through the potentiometer The detection distance of the sensor can be adjusted by potentiometer, the effective distance range 2s30m working voltage is 3.3V-5V. The detection distance of the sensor can be adjusted by potentiometer, with small interference, easy to assemble, easy to use and other characteristics, the mouth is widely used in robot obstacle avoidance, obstacle avoidance car, assembly line counting and black and white line tracing and many other occasions.
   ![](https://gitlab.com/picbed/bed/uploads/5caa064736324b031b24e679a94d57e5/3929200363_1065888284.jpeg)
* Material:1 x Arduino UNO,1 x Infrared Sensor,1 x RGB LED,1 x Bread board,1 x Button,13 x DuPont line

![](https://gitlab.com/picbed/bed/uploads/b4b7c92565274612e59681179ab8a373/微信图片_20211013225434.webp)

* Coding(coming soon)
* Result(coming  soon)
  
[The above Digital infrared sensor from CNFD- team](https://374737390.wixsite.com/my-site/autocat)



## Reference

* [Arduino:HC-SR04  ultrasonic sensor](https://www.qutaojiao.com/8643.html)
* [Arduino in W3CSCHOOL](https://www.w3cschool.cn/arduino/arduino_ultrasonic_sensor.html)
* [Arduino PIR sensor](https://www.w3cschool.cn/arduino/arduino_pir_sensor.html)
* [Digital infrared sensor ](https://374737390.wixsite.com/my-site/autocat)






