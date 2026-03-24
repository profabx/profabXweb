---
title: "Processingwitharduino"
sidebar:
  attrs: { id: tutorial }
---

## Processing communication with Arduino
## 1. Using Procssing  to control Arduino
![](https://gitlab.com/picbed/bed/uploads/a5a0f850c9da291e0183bc4212d13edc/atp2.png)

**Arduino coding**
```C
int redPin = 3;
int greenPin = 4;
int bluePin = 5;

int c = 0;

void setup()
{
  Serial.begin(9600);  
  pinMode(redPin,OUTPUT);
  pinMode(greenPin,OUTPUT);
  pinMode(bluePin,OUTPUT);
}

void loop()
{
  if(Serial.available());
  c = Serial.read();
  if (c == 97)  //a in ASCII is 97
  {
    digitalWrite(redPin,HIGH);   
    delay(500);
    digitalWrite(redPin,LOW); 
  }
  if (c == 98)  //b in ASCII is 98
  {
    digitalWrite(greenPin,HIGH);   
    delay(500);
    digitalWrite(greenPin,LOW);    
  }
  if (c == 99)  
  {
    digitalWrite(bluePin,HIGH);   
    delay(500);
    digitalWrite(bluePin,LOW);
  }
}

```
**Processing coding**

```java
import processing.serial.*;
Serial port;

void setup(){
  port=new Serial(this,"COM5",9600); //Arduino's com
  size(600,200);
}

void draw(){
  fill(255,0,0);
  rect(50,50,100,100);
  
  fill(0,255,0);
  rect(250,50,100,100);
  
  fill(0,0,255);
  rect(450,50,100,100);  
}

void mouseClicked(){
  if((mouseX>=50)&(mouseX<=150)&(mouseY>=50)&(mouseY<=150))
  {
    println("red");
    port.write("a");
  }
  else if((mouseX>=250)&(mouseX<=350)&(mouseY>=50)&(mouseY<=150))
  {
    println("green");
    port.write("b");
  }
  else if((mouseX>=450)&(mouseX<=550)&(mouseY>=50)&(mouseY<=150))
  {
    println("blue");
    port.write("c");
  }
}

```


## 2. Using Arduino  to control Processing
![](https://gitlab.com/picbed/bed/uploads/ae08dcc49e8b1cdb1ba769f379c9069c/pta.png)

**Arduino coding**
```C
int upPin = 3;
int downPin = 4;
int leftPin = 5;
int rightPin = 6; 
int up1,down1,left1,right1;

void setup() {
  pinMode(upPin,INPUT_PULLUP);
  pinMode(downPin,INPUT_PULLUP);
  pinMode(leftPin,INPUT_PULLUP);
  pinMode(rightPin,INPUT_PULLUP);
  Serial.begin(9600);  
}

void loop() {
  
  up1 = digitalRead(upPin);
  down1 = digitalRead(downPin);
  left1 = digitalRead(leftPin);
  right1 = digitalRead(rightPin);  
  if(up1 == 0)
  {
    delay(500);
    Serial.write("a");
  }
  else if(down1 == 0)
  {
    delay(500);
    Serial.write("b");
  }
  else if(left1 == 0)
  {
    delay(500);
    Serial.write("c");
  }
  else if(right1 == 0)
  {
    delay(500);
    Serial.write("d");
  }
}
```

**Processing coding**

```JAVA
import processing.serial.*;
Serial port;
int a = 300;
int b = 300;  

void setup(){
  size(600,600);
  background(200,200,200);
  fill(255,0,0);
  ellipse(a,b,30,30); 
  port = new Serial(this,"COM4",9600);
}

void draw()
{
  while(port.available()>0)
  {
    char input = port.readChar(); //read information from Arduino 
    switch(input)
    {
      case'a':      
      background(200,200,200);
      fill(255,0,0); 
      b -= 20; 
      ellipse(a,b,30,30); 
      break;
      
      case'b':      
      background(200,200,200);
      fill(255,0,0); 
      b += 20;
      ellipse(a,b,30,30);
      break;  
      
      case'c':      
      background(200,200,200);
      fill(255,0,0); 
      a -= 20;
      ellipse(a,b,30,30); 
      break;
      
      case'd':      
      background(200,200,200);
      fill(255,0,0); 
      a += 20;
      ellipse(a,b,30,30); 
      break;
      default:break;
    }
  }
}
```
##

* Processing communication with Arduino reference from  [web](https://blog.csdn.net/weixin_45037820/article/details/95666523) 