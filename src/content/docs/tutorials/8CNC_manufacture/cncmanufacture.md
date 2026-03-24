---
title: "Cncmanufacture"
sidebar:
  attrs: { id: tutorial }
---

In this part ,we would use [Candle software](https://github.com/Denvi/Candle) to control the [DIY CNC machine](https://item.taobao.com/item.htm?spm=a230r.1.14.85.736a3286COaS7g&id=605504955634&ns=1&abbucket=18#detail)
 

We need to run the 4 programs one by one ,the method is simiar(only difference is cutter),so we just introduce one program
![](https://gitlab.com/picbed/bed/uploads/184de0ea653a799332afbdf9d5162177/WX20201020-095833_2x.png)


## 1. Choice the cutter


![](https://gitlab.com/picbed/bed/uploads/b7dd4c466a8bfe57e76fddb8ed12abb5/installspindle.png)

In **Trace1** ,we use Φ0.6mm flat end milling cutter.


![](https://gitlab.com/picbed/bed/uploads/25478e2b6f5423d1c1793f071998a966/ezgif.com-optimize.gif)


![](https://gitlab.com/picbed/bed/uploads/d5b8b544d32f3e96cf6490e259a6ce28/ezgif.com-optimize-2.gif)

Use hand to fix the spindle and then use wrench to fix again.


## 2. Candle prepare


![](https://gitlab.com/picbed/bed/uploads/bf7be66a1ac37dc2c67195f4a7ccce1a/candlesetting.png)

* 1 Open the file we need,and then we can find the nc coding and path
* 2 Use "Jog" function to move spindle to postion we need. In this case ,we need the corner of the board as the following picture
* 3 Use "XY home" and "Z home" to define home position

![](https://gitlab.com/picbed/bed/uploads/105f708b5ea631a5c82b7fe801d2b8c5/WechatIMG47.jpeg)



## 3. Running the machine
Before running the machine ,please check the following aspect again:<font color=Red >Wear mask,keep the machine clean, don't put body near  the machine during operation</font>
In Candle software, click <font color=Blue >Send</font> to run the machine



<iframe width="560" height="315" src="https://www.youtube.com/embed/sweTLV0GCKM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Reference
* [Candle software](https://github.com/Denvi/Candle) 
* [DIY CNC machine](https://item.taobao.com/item.htm?spm=a230r.1.14.85.736a3286COaS7g&id=605504955634&ns=1&abbucket=18#detail)
 


*****

**This document support by Bob Wu and Ciel Luo；thanks for XiaoWu's kind support 20201020**