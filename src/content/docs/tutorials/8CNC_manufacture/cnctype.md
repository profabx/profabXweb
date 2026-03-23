---
title: "Cnctype"
sidebar:
  attrs: { id: tutorial }
---



# CNC
CNC (Computer Numerical Control ) is a term that refers to computer guided machining. In computer we need add a level of detail, speed and precision that saves a great deal of time for high-fidelity prototyping. CNC IS  a subtractive digital method that removes material from a solid block or sheet of material in a rapid fashion.

Depend on process, we can define the type as following:Lathing(Turning) ,Drilling,Milling, Grinding,etc.

During manufacture, first need rough process(remove most of material and get the general shape) and then need finish process(remove the last material slowly to keep the high quality of surface).

![](https://gitlab.com/picbed/bed/uploads/c96451f7fe80fa15c12c0006de570f83/machine.png)

**The advantage of CNC as following**
* Material selection is very broad and including plastic,metal,foam and wood;
* Material cost would much less than additive manufacturing;
* Surface quality can be extremely high;
* Precision is extremely highl;

**The limitation of CNC as following**
* Require special training;
* Require knowledge of fixturing;
* Require knowledge of Computer Aided Manufacturing software;
* Fine features require very fine cutters.

##  1.Turning
![](https://gitlab.com/picbed/bed/uploads/8126eb998091ce3098f953d2a00b7a3f/lathe-use.jpeg)

Turing usual use Lathe machine to run a subtractive manufacturing process. Normal processes various rotary surfaces (inner and outer cylinders, conical surfaces, shaped rotary surfaces, etc.) . The cutter would feed and cut material one layer by one layer.

![](https://gitlab.com/picbed/bed/uploads/f50cdd78de92a1e2094d638175c3e5a6/what-is-lathe-machine.jpeg)
Traditional lathe machine's main motion is the rotation of spindle from motor and the feed motion (linear movement)

The main  components are following:1.headstock;   2.knife holder;   3.tailstock;   4.bed;  5.right bed legs;  6.light bar;  7.screw;   8.sliding box;  9.left leg; 10.feeding box;  11.hanging wheel mechanism
![](https://gitlab.com/picbed/bed/uploads/6e2492cf2cef00b856eacd5240c5b11c/white-board-threading.gif)
Modern turning centres use even more accurate ball screws, these are actuated by motors controlled by  PLC ( Programmable Logic Controller). It would automate produce part according to CAD file.






## 2.Drilling


Drilling is a cutting process that uses drill bit of various sizes to cut a hole of circular-section in solid materials like metal, plastic, wood, rocks etc.


![](https://gitlab.com/picbed/bed/uploads/95891f2652114bd0c77c544da889951a/drillingmachine.png)

There are some types as following:

![](https://gitlab.com/picbed/bed/uploads/e4a4503fe475d9ac26b0e5997e61e930/WX20211201-225758.png)





## 3.Milling



CNC milling is a subtractive manufacturing process. It starts by fixturing a block of metal or plastic material inside the CNC mill. Using G-code, the CNC machine is programmed to rapidly mill out parts from the block of raw material. 

![](https://gitlab.com/picbed/bed/uploads/d63917e52d0e306d5acd5b470854162e/milling-copy-on-part.gif)


 3- and 5-axis CNC machines are equipped with various toolsets to maximize efficiency and production speed.
There are many different kinds of cutter as following[(End mill,Face mill,Ball cutter,Slab mill,Side-and-face cutter,Involute gear cutter,Fly cutter,Hollow mill,Shell mill,Roughing end mill,Dovetail cutter,Wood ruff cutter)](https://fractory.com/milling-cutters-and-tools/).

End cutter and face cutter is often used.The difference between end milling and face milling is that an end mill uses both the end and the sides of the cutter, whereas face milling is used for horizontal cutting.
![](https://gitlab.com/picbed/bed/uploads/ea9c202db90657056209fcbcc1469ca2/millingcutter.png)
[The picture reference from mechanical booster](https://www.mechanicalbooster.com/2018/08/types-of-milling-cutters-used-in-machining-process.html)

## 4. Grinding
[reference allied material](https://www.allied-material.co.jp/en/products/diamond/knowledge/various_grinding.html)

## 5- Axis machine
Those are heavy industry machine primarily developed to cut metal. Tool changers allow the mchine selectively to performance different types of machining operations ,including milling ,drilling and tapping. These production machines are intended to produce manyidentical parts to close tolerances and specification.The high cost ,large footprint,and power requirements restrict this type of equipment to industrial environment.







 ![](https://gitlab.com/picbed/bed/uploads/f384303296048f22632949d503f8f30c/5-2-indexed-milling.gif)


## Reference
* [Protolabs](https://www.protolabs.com/services/cnc-machining/cnc-milling/)
* [NexPCB](https://www.nexpcb.com/capabilities/mechanical-engineering)
* [Grinding: allied material](https://www.allied-material.co.jp/en/products/diamond/knowledge/various_grinding.html)
* [CNC-Programming-Autodesk](https://www.autodesk.com/solutions/cnc-programming)
* [Powermill-Autodesk](https://knowledge.autodesk.com/zh-hans/support/powermill/getting-started/caas/simplecontent/content/powermill-getting-started-tutorial.html)
* [UG NC coding ](https://zhuanlan.zhihu.com/p/34438936)




