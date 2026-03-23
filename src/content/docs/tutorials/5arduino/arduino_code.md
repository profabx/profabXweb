---
title: "Arduino Code"
sidebar:
  attrs: { id: tutorial }
---

## Basic Language Reference
### 1. Digital I/O
![](https://gitlab.com/picbed/bed/uploads/d55faf2d6912be48fd4deb377aae56df/R.jpeg)


```cpp
int ledPin = 13;  // LED connected to digital pin 13
int inPin = 7;    // pushbutton connected to digital pin 7
int val = 0;      // variable to store the read value

void setup() {
  pinMode(ledPin, OUTPUT);  // sets the digital pin 13 as output
  pinMode(inPin, INPUT);    // sets the digital pin 7 as input
}

void loop() {
  val = digitalRead(inPin);   // read the input pin
  digitalWrite(ledPin, val);  // sets the LED to the button's value
}
```

* 1.1 digitalRead()


  * Description: Reads the value from a specified digital pin, either HIGH or LOW.
  * Syntax:digitalRead(pin)
  * Parameters(pin): the Arduino pin number you want to read
  * Returns:HIGH or LOW
  * Example Code(Sets pin 13 to the same value as pin 7, declared as an input.)



* 1.2 digitalWrite()
  * Description:Write a HIGH or a LOW value to a digital pin.If the pin has been configured as an OUTPUT with pinMode(), its voltage will be set to the corresponding value: 5V (or 3.3V on 3.3V boards) for HIGH, 0V (ground) for LOW.If the pin is configured as an INPUT, digitalWrite() will enable (HIGH) or disable (LOW) the internal pullup on the input pin. It is recommended to set the pinMode() to INPUT_PULLUP to enable the internal pull-up resistor. See the Digital Pins tutorial for more information.If you do not set the pinMode() to OUTPUT, and connect an LED to a pin, when calling digitalWrite(HIGH), the LED may appear dim. Without explicitly setting pinMode(), digitalWrite() will have enabled the internal pull-up resistor, which acts like a large current-limiting resistor.
  * Syntax: digitalWrite(pin, value)
  * Parameters:
    * pin: the Arduino pin number.
    * value: HIGH or LOW.
  * Returns:Nothing
  * Example Code:The code makes the digital pin 13 an OUTPUT and toggles it by alternating between HIGH and LOW at one second pace.


* 1.3 pinMode()
  * Description:Configures the specified pin to behave either as an input or an output. See the Digital Pins page for details on the functionality of the pins.
  * Syntax:pinMode(pin, mode)
  * Parameters
    * pin: the Arduino pin number to set the mode of.
    * mode: INPUT, OUTPUT, or INPUT_PULLUP. See the Digital Pins page for a more complete description of the functionality.
  * Returns:Nothing


### 2 Analog I/O
* 2.1 analogRead(pin)
    * Example Code:The code reads the voltage on analogPin and displays it.

  ```cpp
  int analogPin = A3; // potentiometer wiper (middle terminal) connected to analog pin 3
                    // outside leads to ground and +5V
  int val = 0;  // variable to store the value read

  void setup() {
  Serial.begin(9600);           //  setup serial
  }

  void loop() {
  val = analogRead(analogPin);  // read the input pin
  Serial.println(val);          // debug value
  }
  ```

  * Description: Reads the value from the specified analog pin. Arduino boards contain a multichannel, 10-bit analog to digital converter. This means that it will map input voltages between 0 and the operating voltage(5V or 3.3V) into integer values between 0 and 1023. On an Arduino UNO, for example, this yields a resolution between readings of: 5 volts / 1024 units or, 0.0049 volts (4.9 mV) per unit. See the table below for the usable pins, operating voltage and maximum resolution for some Arduino boards.The input range can be changed using analogReference(), while the resolution can be changed (only for Zero, Due and MKR boards) using analogReadResolution().On ATmega based boards (UNO, Nano, Mini, Mega), it takes about 100 microseconds (0.0001 s) to read an analog input, so the maximum reading rate is about 10,000 times a second.

    ![](https://gitlab.com/picbed/bed/uploads/83bba1c5ee8f789279e32afc988395d9/WX20200415-094053_2x.png)

  * Syntax:analogRead(pin)
  * Parameters:pin: the name of the analog input pin to read from (A0 to A5 on most boards, A0 to A6 on MKR boards, A0 to A7 on the Mini and Nano, A0 to A15 on the Mega).
  * Returns:The analog reading on the pin. Although it is limited to the resolution of the analog to digital converter (0-1023 for 10 bits or 0-4095 for 12 bits). Data type: int.

* 2.2 analogWrite(pin)
  * Description:Writes an analog value (PWM wave) to a pin. Can be used to light a LED at varying brightnesses or drive a motor at various speeds. After a call to analogWrite(), the pin will generate a steady rectangular wave of the specified duty cycle until the next call to analogWrite() (or a call to digitalRead() or digitalWrite()) on the same pin. 
![](https://gitlab.com/picbed/bed/uploads/06df60ca8eea67ff7eb5d52f8002a5ad/WX20200415-094509_2x.png)

  * Syntax:analogWrite(pin, value)
  * Parameters:pin: the Arduino pin to write to. Allowed data types: int.
  * value: the duty cycle: between 0 (always off) and 255 (always on). Allowed data types: int.
  * Returns:Nothing
  * Example Code:Sets the output to the LED proportional to the value read from the potentiometer.
 
  ```cpp
  int ledPin = 9;      // LED connected to digital pin 9
  int analogPin = 3;   // potentiometer connected to analog pin 3
  int val = 0;         // variable to store the read value

  void setup() {
  pinMode(ledPin, OUTPUT);  // sets the pin as output
  }

  void loop() {
  val = analogRead(analogPin);  // read the input pin
  analogWrite(ledPin, val / 4); // analogRead values go from 0 to 1023, analogWrite values from 0 to 255
  }
  ```

 ### 3. Math
* 3.1 abs() 
  * Description:Calculates the absolute value of a number.
  * Syntax:abs(x)
  * Parameters  x: the number
  * Returns:  
    * x: if x is greater than or equal to 0.
    * -x: if x is less than 0.
* 3.2 constrain() 
  * Description:Constrains a number to be within a range.
  * Syntax:constrain(x, a, b)
  * Parameters
    * x: the number to constrain Allowed data types: all data types.
    * a: the lower end of the range. Allowed data types: all data types.
    * b: the upper end of the range. Allowed data types: all data types.
  * Returns
    * x: if x is between a and b.
    * a: if x is less than a.
    * b: if x is greater than b.
  * Example Code:The code limits the sensor values to between 10 to 150.
    
    ```cpp
    sensVal = constrain(sensVal, 10, 150); 
    // limits range of sensor values to between 10 and 150

    ```

* 3.3 max()/min() 
  * Description:Calculates the maximum( minimum) of two numbers.
  * Syntax:max(x, y)  /min(x,y)
  * Parameters
    * x: the first number. Allowed data types: any data type.
    * y: the second number. Allowed data types: any data type.
  * Returns
    * max:The larger of the two parameter values.
    * min:The larger of the two parameter values.
  * Example Code:The code ensures that sensVal is at least 20.
  
  ```cpp
  sensVal = max(sensVal, 20);
  // assigns sensVal to the larger of sensVal or 20
  ```

* 3.4 pow()   
  * Description:Calculates the value of a number raised to a power. pow() can be used to raise a number to a fractional power. This is useful for generating exponential mapping of values or curves.
  * Syntax:pow(base, exponent)
  * Parameters
    * base: the number. Allowed data types: float.
    * exponent: the power to which the base is raised. Allowed data types: float.
  * Returns:The result of the exponentiation. Data type: double.
  * Example Code:Calculate the value of x raised to 
  
  `z = pow(x, y);`



* 3.5 sq() 
  * Description:Calculates the square of a number: the number multiplied by itself.
  * Syntax:sq(x)
  * Parameters x: the number. Allowed data types: any data type.
  * Returns:The square of the number. Data type: double.

* 3.6 sqrt() 
  * Description:Calculates the square root of a number.
  * Syntax:sqrt(x)
  * Parameters x: the number. Allowed data types: any data type.
  * Returns:The number’s square root. Data type: double.

### 4. Random Numbers
* Description:The random function generates pseudo-random numbers.
* Syntax
  * random(max)
  * random(min, max)
* Parameters
  * min: lower bound of the random value, inclusive (optional).
  * max: upper bound of the random value, exclusive.
* Returns:A random number between min and max-1. Data type: long.

### 5. Communication
* 5.1 Serial.begin()

    ```cpp
    void setup() {
      Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
    }
    void loop() {}

    ```
    Description:Sets the data rate in bits per second (baud) for serial data transmission. For communicating with Serial Monitor, make sure to use one of the baud rates listed in the menu at the bottom right corner of its screen. You can, however, specify other rates - for example, to communicate over pins 0 and 1 with a component that requires a particular baud rate.

    An optional second argument configures the data, parity, and stop bits. The default is 8 data bits, no parity, one stop bit.

* 5.2 Serial.write()

    ```cpp
    void setup() {
     Serial.begin(9600);
    }

    void loop() {
      Serial.write(45); // send a byte with the value 45

      int bytesSent = Serial.write("hello");  //send the string "hello" and return the length of the string.
    }
    ```

    Description: Writes binary data to the serial port. This data is sent as a byte or series of bytes; to send the characters representing the digits of a number use the print() function instead.


* 5.3 Serial.print()




 Description:Prints data to the serial port as human-readable ASCII text. This command can take many forms. Numbers are printed using an ASCII character for each digit. Floats are similarly printed as ASCII digits, defaulting to two decimal places. Bytes are sent as a single character. Characters and strings are sent as is. 

  ```cpp
  Serial.print(78) 
  ```
  Result :gives "78"

### 6. Time
 * delay()
  * Description:Pauses the program for the amount of time (in milliseconds) specified as parameter. (There are 1000 milliseconds in a second.)
  * Syntax:delay(ms)
  * Parameters: ms: the number of milliseconds to pause. Allowed data types: unsigned long.
  * Returns:Nothing
  * Example Code:The code pauses the program for one second before toggling the output pin.

    ```cpp
    int ledPin = 13;              // LED connected to digital pin 13

    void setup() {
      pinMode(ledPin, OUTPUT);    // sets the digital pin as output 
    }

    void loop() {
      digitalWrite(ledPin, HIGH); // sets the LED on
      delay(1000);                // waits for a second
      digitalWrite(ledPin, LOW);  // sets the LED off
      delay(1000);                // waits for a second
    }
    ```

  we can also use  the following 3 commands

  * delayMicroseconds() 
  * micros() 
  * millis() 



## Reference
* [Official tutorial](https://www.arduino.cc/en/Tutorial/BuiltInExamples)
* [How to start](https://www.arduino.cc/en/Guide/HomePage)
* [Examples from Libraries](https://www.arduino.cc/en/Tutorial/LibraryExamples)
* [Language Reference](https://www.arduino.cc/reference/en/)
* [Arduino game](https://1175138076.wixsite.com/get1688/project4)
