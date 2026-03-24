---
title: "33design"
sidebar:
  attrs: { id: tutorial }
---

# Final project
<video src="https://nexmaker-profabx.oss-cn-hangzhou.aliyuncs.com/video/zju2020calculation.mov" controls="controls" width="100%" ></video>
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design1.png)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design2.png)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/default.219_1611038136951263.gif)
* ASSISTANT TO HELP CHILDREN:We use arduino to make a "question machine" that can randomly display arithmetic questions of addition, subtraction, multiplication, and division on the screen. By connecting the input device, the child enters the answer in the input device according to the question displayed on the screen.
* CALCULATOR MODE:Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate.
* ARITHMETIC PRACTICE MODE:The child enters the answer in the input device according to the question displayed on the screen. If the answer is correct, the device will play the correct sound and the antennae will be displayed in blue. If the answer is wrong, the device will play the wrong tone. The antennae will show red.
  
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design4.gif)

## coding

```cpp                                     
//根据串口输出键值 自行调整矩阵键盘引脚定义
#include 
#include 
char hexaKeys[4][4] = {
    {'1', '2', '3', 'A'},
    {'4', '5', '6', 'B'},
    {'7', '8', '9', 'C'},
    {'*', '0', '#', 'D'}};
const uint8_t Beep_Pin = 10;
byte rowPins[4] = {2, 3, 4, 5}; //矩阵键盘行引脚定义
byte colPins[4] = {6, 7, 8, 9}; //矩阵键盘列引脚定义
LiquidCrystal lcd(11, A1, A2, A3, A4, A5);
Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, 4, 4);
void setup()
{
  Serial.begin(9600);
  randomSeed(analogRead(A0));
  lcd.begin(16, 2);
  pinMode(Beep_Pin, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

}

void loop()
{
  //获得元数据
  uint8_t Operation = random() % 4;
  uint8_t num[2] = {0};
  uint8_t answer = 0;
  switch (Operation)
  {
  case 0:
    num[0] = random(0, 100);
    num[1] = random(0, (100 - num[0]));
    answer = num[0] + num[1];
    break;
  case 1:
    num[0] = random(0, 100);
    num[1] = random(0, (num[0] + 1));
    answer = num[0] - num[1];
    break;
  case 2:
    num[0] = random(0, 100);
    num[1] = random(0, (100 / num[0]));
    answer = num[0] * num[1];
    break;
  case 3:
    num[0] = random(0, 100);
    num[1] = random(0, num[0]);
    num[0] -= num[0] % num[1];
    answer = num[0] / num[1];
    break;
  }
  Serial.print(num[0]);
  Serial.print(Operation == 0 ? "+" : Operation == 1 ? "-" : Operation == 2 ? "*" : "/");
  Serial.print(num[1]);
  Serial.print("=");
  Serial.println(answer);
Try:
  lcd.clear();
  lcd.print(num[0]);
  lcd.print(Operation == 0 ? "+" : Operation == 1 ? "-" : Operation == 2 ? "*" : "/");
  lcd.print(num[1]);
  lcd.print("=");
  // lcd.print(answer);
  String buffer;
  while (1)
  {
    char customKey = customKeypad.getKey();
    if (customKey)
    {
      Serial.print("Keypad: ");
      Serial.println(customKey);
    }
    if (customKey >= '0' && customKey <= '9')
    {
      buffer += customKey;
      lcd.setCursor(0, 0);
      lcd.print(num[0]);
      lcd.print(Operation == 0 ? "+" : Operation == 1 ? "-" : Operation == 2 ? "*" : "/");
      lcd.print(num[1]);
      lcd.print("=");
      lcd.print(buffer);
      lcd.print(" ");
    }
    else if (customKey == '*')
    {
      buffer = buffer.substring(0, buffer.length() - 1);
      lcd.setCursor(0, 0);
      lcd.print(num[0]);
      lcd.print(Operation == 0 ? "+" : Operation == 1 ? "-" : Operation == 2 ? "*" : "/");
      lcd.print(num[1]);
      lcd.print("=");
      lcd.print(buffer);
      lcd.print(" ");
    }
    else if (customKey == '#')
    {
      if (answer == buffer.toInt())
      {
        Serial.println("answer right");
        digitalWrite(Beep_Pin,LOW);
        digitalWrite(12,HIGH);
        lcd.setCursor(0, 1);
        lcd.print("GOOD!");
        delay(500);
        digitalWrite(Beep_Pin,HIGH);
        delay(500);
        digitalWrite(Beep_Pin,LOW);
        delay(500);
        digitalWrite(Beep_Pin,HIGH);
        digitalWrite(12,LOW);
        delay(3000);
        break;
      }
      else
      {
        Serial.println("answer error");
        digitalWrite(Beep_Pin,LOW);
        digitalWrite(13,HIGH);
        lcd.setCursor(0, 1);
        lcd.print("TRY AGAIN");
        delay(1500);
        digitalWrite(Beep_Pin,HIGH);
        digitalWrite(13,LOW);
        delay(3000);
        goto Try;
      }
    }
  }
}
```
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design5.png)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design9.jpeg)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design8.jpeg)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design7.jpeg)
![](https://raw.githubusercontent.com/bobwu0214/imageuploadservice/main/img/33design9.jpeg)