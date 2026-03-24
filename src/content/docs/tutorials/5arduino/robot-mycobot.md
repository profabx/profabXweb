---
title: "Robot Mycobot"
sidebar:
  attrs: { id: tutorial }
---

# Robot-mycobot
![](https://gitlab.com/picbed/bed/uploads/56bd868a8f7d50786eec25c898852ec7/WX20210122-085106_2x.png)
We would update one by one, now we can use the following two method to run it:
1. Use hand to move machine and it would record the movement, it would play according to the movement;
2. Use Arduino to run;

## Arduino example

```cpp

#include <CommunicateDefine.h>
#include <MycobotBasic.h>
#include <ParameterList.h>

#include <MycobotBasic.h>
#include <ParameterList.h>

MycobotBasic myCobot;

Angles angles = { -0.0, -0.0, -0.0, -0.0, -0.0, -0.0 };           

void setup() {
  myCobot.setup();
 
  myCobot.powerOn();

  for(auto &val : angles)       
    val = 0.0;

  myCobot.WriteAngles(angles, 50);
  delay(5000);
}

void loop() {
  for(int i = 1; i < 7; i++)        //run
    {
      myCobot.setLEDRGB(0XFF, 0, 0);       // set RGB show red
      delay(50);
      //myCobot.WriteAngle(i,angle,0-100);
      myCobot.WriteAngle(i, -90, 100);   // set joint angle -90 degree
      delay(4000);
      myCobot.setLEDRGB(0, 0XFF, 0);       // set RGB show blue
      delay(50);
      myCobot.WriteAngle(i, 90, 100);    // set joint angle 90 degree
      delay(4000);
      myCobot.setLEDRGB(0, 0, 0XFF);       // set RGB show green
      delay(50);
      myCobot.WriteAngle(i, 0, 100);     // set joint angle 0 degree
      delay(4000);
    }
}
```
remember to add Arduino library in [google drive link](https://drive.google.com/file/d/1_3QRGcUd4FnP14C_k0QxDA33wNJE1s24/view?usp=sharing)
## Reference 
* [Official website](https://www.elephantrobotics.com/)
* Bilibili: [Prepare](https://www.bilibili.com/video/BV1To4y1f71P/),[Manual recording](https://www.bilibili.com/video/BV16t4y167vw/),[MainControl](https://www.bilibili.com/video/BV1FK4y1W75H/),[Limit](https://www.bilibili.com/video/BV11T4y1N7zz/),[Connection line Maintenance](https://www.bilibili.com/video/BV1hK4y157qP/),[ROS](https://www.bilibili.com/video/BV1Uh41127dZ/),[Arduino](https://www.bilibili.com/video/BV1Vi4y1c7DQ/),[Shell disassembly](https://www.bilibili.com/video/BV1np4y1x7Lk/)
* Youtube :[Prepare](https://youtu.be/Lwi8UoihzNc),[Manual recording](https://youtu.be/WzrbOrdQop0),[Maincontrol](https://youtu.be/VKd8b989M8g),[Limit](https://youtu.be/PUeU-mynljw),[Connection line Maintenance](https://youtu.be/1wq0kTJVqw4),[ROS](https://youtu.be/-Jo_IJ8RaXc),[Arduino](https://youtu.be/pkQIApDRJpo),[Shell disassembly](https://youtu.be/wHzFsExkYrE)
* [GitHub](https://github.com/elephantrobotics): [myCobot](https://github.com/elephantrobotics/myCobot),[myCobotROS](https://github.com/elephantrobotics/myCobotROS),[Mystudio](https://github.com/elephantrobotics/myStudio)