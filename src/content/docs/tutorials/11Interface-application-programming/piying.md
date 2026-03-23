---
title: "Piying"
sidebar:
  attrs: { id: tutorial }
---

# 1.介绍
此项目用[kinect V2](https://developer.microsoft.com/en-us/windows/kinect/)捕捉人体动作，在window10电脑上用[Processing3.5.4 ](https://processing.org/download)处理Kinect的骨骼数据（此处用到[Kinect PV2](https://github.com/ThomasLengeling/KinectPV2)的库）并显示在电脑屏幕上.后续有两种方案。
案例一通过Arduino Uno 获取Processing 解析出来的坐标数据，从而传递控制信号给[CNC Shield v3 和A4988](http://www.taichi-maker.com/homepage/reference-index/motor-reference-index/arduino-a4988-nema-stepper-motor/)，进行控制35步进电机进行皮影动作运行。此案例方案适用于简单的动作，复杂的运动由于Arduino Uno性能局限无法达到精度要求，故此案例只作为调试用途。
案例二通[RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search) 获取Processing 解析出来的坐标数据，从而传递控制信号给[CNC Shield v3 和A4988](http://www.taichi-maker.com/homepage/reference-index/motor-reference-index/arduino-a4988-nema-stepper-motor/)，进行控制35步进电机进行皮影动作运行。 [RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search) 性能足够满足此项目，能实现复杂的运动跟踪.

故最终版我们使用的软硬件有以下
* [kinect V2](https://developer.microsoft.com/en-us/windows/kinect/);
* [Kinect for Windows SDK 2.0](https://www.microsoft.com/en-us/download/details.aspx?id=44561)；
* [Processing3.5.4 ](https://processing.org/download);
* [Kinect PV2](https://github.com/ThomasLengeling/KinectPV2);
* [RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search) ;
* [CNC Shield v3 & A4988](http://www.taichi-maker.com/homepage/reference-index/motor-reference-index/arduino-a4988-nema-stepper-motor/);
* [35步进电机](https://s2.loli.net/2022/01/11/KuIncbDGZWOPopj.jpg);




 # 2.准备工作
 ## 2.1硬件
 * [A Kinect for Windows v2 Device (K4W2)](https://developer.microsoft.com/en-us/windows/kinect/)：此硬件用于捕捉人体动作,Kinect分为Kinect for xbox和Kinect for windows，我们项目中使用Kinect for xbox，kinect for windows同样适用；
 * [Arduino UNO](www.arduino.cc)：测试时用于检测初步代码和功能；
 * [RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search)：最终版本的电控核心，将从[Processing3.5.4 ](https://processing.org/download)获得的数据转化处理，从而将电机运转信号给CNC Shield；
 * [CNC Shield v3 & A4988](http://www.taichi-maker.com/homepage/reference-index/motor-reference-index/arduino-a4988-nema-stepper-motor/)；CNC Sheild是电机控制的载体，A4988为驱动电机控制板，是CNCshield的核心，将最终的放大信号传至35步进电机；
 *  [35步进电机](https://s2.loli.net/2022/01/11/KuIncbDGZWOPopj.jpg)；把获得的运行型号执行为旋转运动，从而推动丝杠上的滑块运行；
 *  12V2A电源；
 *  配件：联轴器，滑块，3d打印结构件，杜邦线，面包板；

 ## 2.2 软件
* [Kinect for Windows SDK 2.0](https://www.microsoft.com/en-us/download/details.aspx?id=44561)：此处用于搭建kinect 在PC端的运行环境和kinect的准备工作；
* [Processing3.5.4 ](https://processing.org/download)：通过和下面的Kinect PV2的库，将Kinect的信号转化成电脑的图像信号，并捕捉人体运动的关键坐标数据；
* [Kinect PV2](https://github.com/ThomasLengeling/KinectPV2)：Processing和Kinect连接后的获得人体骨骼数据的库文件
* [Arduino IDE](https://www.arduino.cc/en/software)：测试阶段（案例一）的控制程序的软件，此软件和Arduino Uno连接，从而控制电机运动；
* [MounRiver Studio V1.3.0](http://www.mounriver.com/download)：最终阶段（案例二）的控制程序的软件，此软件和[RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search)连接，从而控制电机运动；

## 2.3 kinect 运行环境
### 2.3.1 Windows10电脑
   *  Windows10 64位电脑；
   *  拥有USB3.0;
   *  确定升级最新的显卡驱动，此处根据实际电脑配置进行
   *  确定是否安装 [DirectX 11](https://www.microsoft.com/en-us/download/details.aspx?id=35);


### 2.3.2 Kinect SDK
 我们的硬件使用的的是Kinect v2 for xbox， 所以SDK使用 [Kinect SDK1.8](https://www.microsoft.com/en-us/download/confirmation.aspx?id=40278),如果使用者使用Kinect v2 for Windows，推荐使用 [Kinect  SDK v2](https://download.microsoft.com/download/F/2/D/F2D1012E-3BC6-49C5-B8B3-5ACFF58AF7B8/KinectSDK-v2.0_1409-Setup.exe)


* 安装SDK 前需要拔掉Kinect；
* 安装[Kinect SDK1.8](https://www.microsoft.com/en-us/download/confirmation.aspx?id=40278)；
* 安装 [Kinect for Windows Developer Toolkit v1.8](https://www.microsoft.com/en-us/download/details.aspx?id=40276),这是sdk的一个工具箱，里面有很多丰富的例子。可以不安装，推荐安装；
* 检测驱动:插上kinect，跑Developer Toolkit里面的任意例子，正常说明kinect设备能驱动了，反之没有。


### 2.3.3 Processing
*  在官网选择适合你电脑的版本，我们目前使用 [Processing 3.5.4](https://processing.org/)，下载并且解压压缩包。Windows用户找到processing.exe便可以运行。

![](https://s2.loli.net/2022/01/11/qIhYEUelACTpNDB.png)




* Processing中安装[Kinect v2 library for Processing](https://github.com/ThomasLengeling/KinectPV2),在Sketch-Import library-Add Library中搜索并安装
![](https://s2.loli.net/2022/01/11/dPbrE3ICc1G7hOj.png)
![](https://s2.loli.net/2022/01/11/hqrCfuFPmTkVSIc.png)
另外可以在github上下载[Kinect v2 library for Processing](https://github.com/ThomasLengeling/KinectPV2)并解压缩放到安装目录的library内“C:\Users\Documents\Processing\libraries”，
安装完成后在文档目录和软件中分别显示为以下
![](https://s2.loli.net/2022/01/11/bCLzM5drYIfA7Ke.png)
![](https://s2.loli.net/2022/01/11/AE5SnZKQsuTPXil.png)
* 运行“Skeleton color”测试软件环境是否成功
![](https://s2.loli.net/2022/01/11/yaPvUxgEdDITb4N.png)
![](https://s2.loli.net/2022/01/11/VXwjf4qzeC5OvAT.png)
如果程序运行类似上图能显示人体骨骼，说明Kinect和processing的安装环境成功








# 3.测试

我们会用两步去测试，如果大家熟悉RISC-Vduino，可以直接到 “3.2案例二（Kinect+Processing+RISC-Vduino test）”
## 3.1 案例一（Kinect+Processing+Arduino test）
 [Arduino UNO](www.arduino.cc)下载安装Arduino IDE,测试Arduino IDE 案例看是否成功。
 接下来正式的程序，我们目标是以下几点
* 将用Processing 程序去和Kinect连接，读取人体手掌相对于脖颈的坐标位置；
* 坐标位置写成string通过串口传至Arduino Uno；
* Arduino Uno将string值解析成电机转动数值；
* Arduino Uno通过CNC Shield v3+A4988驱动35步进电机的运行，从而做出对应动作

以下为processing程序


```java

import KinectPV2.KJoint;
import KinectPV2.*;
import processing.serial.*;
Serial port;
KinectPV2 kinect;

//int value_X1;
//int value_Y1;
//int value_Z1;
//int value_X2;
//int value_Y2;
//int value_Z2;
//int value_running=0;
String [] strs;
String data;


void setup() {
  size(1920, 1080, P3D);
   port=new Serial(this,"COM4",9600);

  kinect = new KinectPV2(this);

  kinect.enableSkeletonColorMap(true);
  kinect.enableColorImg(true);

  kinect.init();

  
}

void draw() {
  background(0);

  image(kinect.getColorImage(), 0, 0, width, height);

  ArrayList<KSkeleton> skeletonArray =  kinect.getSkeletonColorMap();

  //individual JOINTS
  for (int i = 0; i < skeletonArray.size(); i++) {
    KSkeleton skeleton = (KSkeleton) skeletonArray.get(i);
    if (skeleton.isTracked()) {
      KJoint[] joints = skeleton.getJoints();

      color col  = skeleton.getIndexColor();
      fill(col);
      stroke(col);
      drawBody(joints);
     
     
     
     //test
     float X0= joints[ KinectPV2.JointType_Neck].getX()- joints[KinectPV2.JointType_SpineBase].getX();
     float Y0= joints[ KinectPV2.JointType_Neck].getY()- joints[KinectPV2.JointType_SpineBase].getY();
     float Z0= joints[ KinectPV2.JointType_Neck].getZ()- joints[KinectPV2.JointType_SpineBase].getZ();
     float A1= joints[ KinectPV2.JointType_Neck].getX()- joints[KinectPV2.JointType_HandRight].getX();
     float B1= joints[ KinectPV2.JointType_Neck].getY()- joints[KinectPV2.JointType_HandRight].getY();
      float C1= joints[ KinectPV2.JointType_Neck].getZ()- joints[KinectPV2.JointType_HandRight].getZ();
      int value_X1 =int((abs((A1)*100/(X0)))); 
      int value_Y1 =int(abs((B1)*100/(Y0)));
      int value_Z1 =int(abs((C1)*100/(Z0)));
      float A2= joints[ KinectPV2.JointType_Neck].getX()- joints[KinectPV2.JointType_HandLeft].getX();
      float B2= joints[ KinectPV2.JointType_Neck].getY()- joints[KinectPV2.JointType_HandLeft].getY();
      float C2= joints[ KinectPV2.JointType_Neck].getZ()- joints[KinectPV2.JointType_HandLeft].getZ();
      int value_X2 =int((abs((A2)*100/(X0)))); 
      int value_Y2 =int(abs((B2)*100/(Y0)));
      int value_Z2 =int(abs((C2)*100/(Z0)));
      text("X1=",20, 150);text(value_X1, 50, 150);text("Y1=",120, 150); text(value_Y1, 150, 150);text("Z1=",220, 150);text(value_Z1, 250, 150);
      text("X2=",20, 250);text(value_X2, 50, 250);text("Y2=",120, 250); text(value_Y2, 150, 250);text("Z2=",220, 250);text(value_Z2, 250, 250);
      strs=new String[6];
      strs[0]=str(int((abs((A1)*100/(X0)))));
      strs[1]=str(int((abs((B1)*100/(X0)))));
      strs[2]=str(int((abs((C1)*100/(X0)))));
      strs[3]=str(int((abs((A2)*100/(X0)))));
      strs[4]=str(int((abs((B2)*100/(X0)))));
      strs[5]=str(int((abs((C2)*100/(X0)))));
      data =join(strs,"a");
     
    
     
     //test

      //draw different color for each hand state
      drawHandState(joints[KinectPV2.JointType_HandRight]);
      drawHandState(joints[KinectPV2.JointType_HandLeft]);
      drawHandState(joints[KinectPV2.JointType_Neck]);
    }
  }

  fill(0, 255, 0);
  text(frameRate, 50, 50);

}

//DRAW BODY
void drawBody(KJoint[] joints) {
  drawBone(joints, KinectPV2.JointType_Head, KinectPV2.JointType_Neck);
  drawBone(joints, KinectPV2.JointType_Neck, KinectPV2.JointType_SpineShoulder);
  drawBone(joints, KinectPV2.JointType_SpineShoulder, KinectPV2.JointType_SpineMid);
  drawBone(joints, KinectPV2.JointType_SpineMid, KinectPV2.JointType_SpineBase);
  drawBone(joints, KinectPV2.JointType_SpineShoulder, KinectPV2.JointType_ShoulderRight);
  drawBone(joints, KinectPV2.JointType_SpineShoulder, KinectPV2.JointType_ShoulderLeft);
  drawBone(joints, KinectPV2.JointType_SpineBase, KinectPV2.JointType_HipRight);
  drawBone(joints, KinectPV2.JointType_SpineBase, KinectPV2.JointType_HipLeft);

  // Right Arm
  drawBone(joints, KinectPV2.JointType_ShoulderRight, KinectPV2.JointType_ElbowRight);
  drawBone(joints, KinectPV2.JointType_ElbowRight, KinectPV2.JointType_WristRight);
  drawBone(joints, KinectPV2.JointType_WristRight, KinectPV2.JointType_HandRight);
  drawBone(joints, KinectPV2.JointType_HandRight, KinectPV2.JointType_HandTipRight);
  drawBone(joints, KinectPV2.JointType_WristRight, KinectPV2.JointType_ThumbRight);

  // Left Arm
  drawBone(joints, KinectPV2.JointType_ShoulderLeft, KinectPV2.JointType_ElbowLeft);
  drawBone(joints, KinectPV2.JointType_ElbowLeft, KinectPV2.JointType_WristLeft);
  drawBone(joints, KinectPV2.JointType_WristLeft, KinectPV2.JointType_HandLeft);
  drawBone(joints, KinectPV2.JointType_HandLeft, KinectPV2.JointType_HandTipLeft);
  drawBone(joints, KinectPV2.JointType_WristLeft, KinectPV2.JointType_ThumbLeft);

  // Right Leg
  drawBone(joints, KinectPV2.JointType_HipRight, KinectPV2.JointType_KneeRight);
  drawBone(joints, KinectPV2.JointType_KneeRight, KinectPV2.JointType_AnkleRight);
  drawBone(joints, KinectPV2.JointType_AnkleRight, KinectPV2.JointType_FootRight);

  // Left Leg
  drawBone(joints, KinectPV2.JointType_HipLeft, KinectPV2.JointType_KneeLeft);
  drawBone(joints, KinectPV2.JointType_KneeLeft, KinectPV2.JointType_AnkleLeft);
  drawBone(joints, KinectPV2.JointType_AnkleLeft, KinectPV2.JointType_FootLeft);
  
  
  //data we need
  fill(0, 255, 2255);
  strokeWeight(10);
  stroke(0,0,0);
  drawBone(joints, KinectPV2.JointType_Neck, KinectPV2.JointType_HandRight);
  drawBone(joints, KinectPV2.JointType_Neck, KinectPV2.JointType_HandLeft);
    
    

  drawJoint(joints, KinectPV2.JointType_HandLeft);
  drawJoint(joints, KinectPV2.JointType_HandRight);
  drawJoint(joints, KinectPV2.JointType_Neck);
  //drawJoint(joints, KinectPV2.JointType_FootLeft);
  //drawJoint(joints, KinectPV2.JointType_FootRight);

  //drawJoint(joints, KinectPV2.JointType_ThumbLeft);
 // drawJoint(joints, KinectPV2.JointType_ThumbRight);

  //drawJoint(joints, KinectPV2.JointType_Head);
}

//draw joint
void drawJoint(KJoint[] joints, int jointType) {
  pushMatrix();
  translate(joints[jointType].getX(), joints[jointType].getY(), joints[jointType].getZ());
  ellipse(0, 0, 25, 25);
  popMatrix();
}

//draw bone
void drawBone(KJoint[] joints, int jointType1, int jointType2) {
   stroke(255,255,0);
  pushMatrix();
  translate(joints[jointType1].getX(), joints[jointType1].getY(), joints[jointType1].getZ());
  //text(joints[jointType1].getX(),50,50);
  ellipse(0, 0, 25, 25);
  popMatrix();
  line(joints[jointType1].getX(), joints[jointType1].getY(), joints[jointType1].getZ(), joints[jointType2].getX(), joints[jointType2].getY(), joints[jointType2].getZ());
  
  
 
  pushMatrix();
  translate(joints[jointType1].getX(), joints[jointType1].getY(), joints[jointType1].getZ());
  //text(joints[jointType1].getX(),50,50);
  ellipse(0, 0, 25, 25);
  popMatrix();
  stroke(0);
  fill(0);
  
  line(joints[ KinectPV2.JointType_Neck].getX(), joints[ KinectPV2.JointType_Neck].getY(), joints[ KinectPV2.JointType_Neck].getZ(), joints[KinectPV2.JointType_SpineBase].getX(), joints[KinectPV2.JointType_SpineBase].getY(), joints[KinectPV2.JointType_SpineBase].getZ());
  stroke(255,0,255);
  line(joints[ KinectPV2.JointType_Neck].getX(), joints[ KinectPV2.JointType_Neck].getY(), joints[ KinectPV2.JointType_Neck].getZ(), joints[KinectPV2.JointType_HandRight].getX(), joints[KinectPV2.JointType_HandRight].getY(), joints[KinectPV2.JointType_HandRight].getZ());
 
  line(joints[ KinectPV2.JointType_Neck].getX(), joints[ KinectPV2.JointType_Neck].getY(), joints[ KinectPV2.JointType_Neck].getZ(), joints[KinectPV2.JointType_HandLeft].getX(), joints[KinectPV2.JointType_HandLeft].getY(), joints[KinectPV2.JointType_HandLeft].getZ());
  

  
  
}




//draw hand state
void drawHandState(KJoint joint) {
  noStroke();
  handState(joint.getState());
  pushMatrix();
  translate(joint.getX(), joint.getY(), joint.getZ());//text(joint.getX(), 50,0);
  ellipse(0, 0, 70, 70);
  popMatrix();
  
  
}

/*
Different hand state
 KinectPV2.HandState_Open
 KinectPV2.HandState_Closed
 KinectPV2.HandState_Lasso
 KinectPV2.HandState_NotTracked
 */
void handState(int handState) {
  switch(handState) {
  case KinectPV2.HandState_Open:
    fill(0, 255, 0);
    println("open");
     
    break;
  case KinectPV2.HandState_Closed:
    fill(255, 0, 0);
    
    println(data);
    port.write(data);
  
    delay(1000);
     
    //value_running=0;
    //get cordination
    
    break;
  case KinectPV2.HandState_Lasso:
    fill(0, 0, 255);
    break;
  case KinectPV2.HandState_NotTracked:
    fill(255, 255, 255);
    break;
  }
}

```




## 3.2 案例二（Kinect+Processing+RISC-Vduino test）


 [RISC-vduino](https://gitee.com/risc-v-mcu-chinese-network/RISC-Vduino-UNO-RevC?_from=gitee_search)：最终版本的电控核心，将从[Processing3.5.4 ](https://processing.org/download)获得的数据转化处理，从而将电机运转信号给CNC Shield；

# 4. 参考
* [Kinect for Windows](https://developer.microsoft.com/en-us/windows/kinect/);
* [Kinect 中文教程](https://kinect-tutorials-zh.readthedocs.io/zh_CN/latest/) ;
* [Kinect PV2](https://github.com/ThomasLengeling/KinectPV2);











