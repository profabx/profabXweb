---
title: "Cncprogram"
sidebar:
  attrs: { id: tutorial }
---

After design in fusion electronics,we can switch to 3D PCB in the command of "Switch/view 3D PCB"
![](https://gitlab.com/picbed/bed/uploads/e4bb6bbd94d1481963d0a4cba4b02990/pcbto3d.png)


**Remind:This method just for single layer PCB board.**



## 1 .Choice model

We need use "manufacture" function, so switch from "3D PCB" to "manufacture"
![](https://gitlab.com/picbed/bed/uploads/fcd4df97a95a98e36bb267948af5654f/WX20201016-164305_2x.png)

 We can just show **board** and **1-copper**. (Hidden another layer:16 copper(bottom copper),1 solder masker,16 soler masker, Packages(electronics components))
![](https://gitlab.com/picbed/bed/uploads/fcd4df97a95a98e36bb267948af5654f/WX20201016-164305_2x.png)



## 2. Setup 
In this step ,we should tell the machine the stock size of material and the direction.
![](https://gitlab.com/picbed/bed/uploads/b3af7d3978dbb51f4b1a762efaa9561e/ezgif.com-video-to-gif.gif)
[More detail About Set up](https://help.autodesk.com/view/fusion360/ENU/?guid=Fusion_CAM_how_to_create_setup_html)

## 3. Process in Fusion CAM
Now we need 4 steps to process our PCB boards
* Step1: Milling the  electrical interconnections path;
* Step2:Drilling the hole;
* Step3:First time Milling the profile of the PCB board;
* Step4:Second time Milling the profile of the PCB board;


#### 3.1 Step1: Milling the  electrical interconnections path
In this step ,we need use ["Milling-2D-Trace "command](http://help.autodesk.com/view/fusion360/ENU/?guid=GUID223F93A7-F88E-4359-B02D-B0C2F11AFA8B)

![](https://gitlab.com/picbed/bed/uploads/02427a9226e61e3704ca218915db83ea/settingtrace.png)
Now we need setting 
* Tool & Feed&Speed
* Geometry
* Height
* Pass

###### 3.1.1 Tool & Feed&Speed

We can click "Tool/Select " to setting the tool
![](https://gitlab.com/picbed/bed/uploads/59aa639b69f64af2268352a44175d618/trace1.png)

How to confirm [the parameter of cutter?](http://help.autodesk.com/view/fusion360/ENU/?guid=GUIDA0197982-0082-45AF-B848-8D62CAF57C49) 
* Type: we need cut the copper on the surface ,so we choice "flat end mill"
* Paramenter:We use the 7pin connector, the gap betweeen two pins is 2.54mm,after calculate,we find the space for electrical interconnections path is 1.01mm
  * To avoid the overlap too mach,red path and blue path, we can choice the cutter small then 1mm, for example 0.8mm,0.6mm,0.4mm
  * If too small, the cutter is easy to broken;
  * Finial we choice 0.6mm flat end milling cutter 

![](https://gitlab.com/picbed/bed/uploads/38c538f83f64b4ca9f354cb7186f1f52/electropaht2.png)

The following is how to setting  tool parameter in software

![](https://gitlab.com/picbed/bed/uploads/a8decfcdbef2d919dde7add51a055f56/choicecutter2.png)
[Another parameter setting](http://help.autodesk.com/view/fusion360/ENU/?guid=GUID223F93A7-F88E-4359-B02D-B0C2F11AFA8B)
* Coolcant:because we just process thin copper and resin,so don't need use any thing ,just choice disabled. <font color=Blue >For plastic ,small copper,aluminum,we don't need coolant, but if we process steel and similar metal,we need coolant</font>
* Spindle Speed(The rotational speed of the spindle expressed in Rotations Per Minute (RPM)):<font color=Blue >Our machine's speed is 1000rpm(only one speed),so choice 1000rpm;</font>
* Surface Speed(The speed which the material moves past the cutting edge of the tool (SFM or m/min)):<font color=Blue >It would calculate by software according to cutter diameter and spindle speed:  Surface speed =cutter diameter X spindle speed</font>
* Ramp Spindle Speed - The rotational speed of the spindle when performing ramp movements<font color=Blue >Same as spindle speed ,because the machine just one speed</font>
* Cutting Feedrate - Feedrate used in regular cutting moves. Expressed as Inches/Min (IPM) or MM/Min<font color=Blue >According to experience,60mm/min is available</font>
* Feed per Tooth - The cutting feedrate expressed as the feed per tooth (FPT)<font color=Blue >It wpuld calculate by software automatic</font>
* Lead-In Feedrate - Feed used when leading in to a cutting move.<font color=Blue ></font>
* Lead-Out Feedrate - Feed used when leading out from a cutting move<font color=Blue ></font>
* Ramp Feedrate - Feed used when doing helical ramps into stock<font color=Blue ></font>
* Plunge Feedrate - Feed used when plunging into stock<font color=Blue ></font>
* Feed per Revolution - The plunge feedrate expressed as the feed per revolution<font color=Blue ></font>

 ![](https://gitlab.com/picbed/bed/uploads/59aa639b69f64af2268352a44175d618/trace1.png)

###### 3.1.2 Geometry
Function define:Select any 3D Edge or Sketch to define the machining curve.
In this case, we just choice the following 16 chains.
![](https://gitlab.com/picbed/bed/uploads/ff3db822de33e332524da8ef95dbdae2/trace2.png)
###### 3.1.3 Height
* Clearance HeightThe Clearance height is the first height the tool rapids to on its way to the start of the tool path.
* Retract height: incremental offset from the Retract Height.
* Feed height: incremental offset from the Feed Height.
* Top height: incremental offset from the Top Height.
* Bottom height: incremental offset from the Bottom Height.
* Model top: incremental offset from the Model Top.
* Model bottom: incremental offset from the Model Bottom.
* Stock top: incremental offset from the Stock Top.
* Stock bottom: incremental offset from the Stock Bottom.
* Selected contour(s): incremental offset from a Contour selected on the model.
* Selection: incremental offset from a Point (vertex), Edge or Face selected on the model.
* Origin (absolute): absolute offset from the Origin that is defined in either the Setup or in Tool Orientation within the specific operation.

In our case ,parameter is the following:

![](https://gitlab.com/picbed/bed/uploads/82ee1398e35b3a516b2ba163f695f498/trace3.png)




###### 3.1.4 Pass
In this case ,we choice Right (conventional milling) 
![](https://gitlab.com/picbed/bed/uploads/8cbfc9296502e6f2f2eb0c0f49fdf2a9/trace4.png)

#### 3.1.5 Simulate
We can use "simulate" command to check if the NC program has any problem
![](https://gitlab.com/picbed/bed/uploads/6100eddc0e5f98fcb0fc28dd9eaec1d2/WX20201017-100418_2x.png)
![](https://gitlab.com/picbed/bed/uploads/369d0e6b1ab4aeccc900c33c6ef9bfed/ezgif.com-video-to-gif-3.gif)

#### 3.1.6 Output NC program
If simulate is OK,we can use Create NC program and then output.

![](https://gitlab.com/picbed/bed/uploads/482e3a87a8d383ba76893f2d9c05df2b/551602834162_.pic_hd.jpg)
**Remind:we need choice GBRL according to our machine**


#### 3.2 Step2: Drilling the hole
In this step ,we need use ["Drilling "command](http://help.autodesk.com/view/fusion360/ENU/?guid=Fusion_CAM_reference_drill_drill_standard_html)

Reference from "3.1.1 Tool & Feed&Speed",we can choice drilling cutter  "Φ0.8mm".

![](https://gitlab.com/picbed/bed/uploads/cbfaafce9066a43bd7d37d56f171c909/drillcutter22.png)

The Geometry of this step is the 15 holes we need process, choice it one by one.
![](https://gitlab.com/picbed/bed/uploads/8212daf3572cd25198d62049193f70af/WX20201020-092639_2x.png)
About height, reference 3.1.3 ,and choice one by one ,the following is for reference.

![](https://gitlab.com/picbed/bed/uploads/b2870260cc9960e2415485f59dbe43e1/WX20201020-093248_2x.png)

In this step, the method of Passs,Simulate,Output NC programis same with "3.1", so just reference  "3.1.4Passs"," 3.1.5 Simulate", "3.1.6Output NC program"

#### 3.3 Step3: Milling the profile
Ever time we can just cut the deep less than 1mm, but the thickness of our board is 1.5mm, so we need process two times(first 0.8mm, second 1.5mm) and output 2 NC programs.

 In this step ,we need use ["Milling/2D/2D Contour"command](http://help.autodesk.com/view/fusion360/ENU/?contextId=MFG-REF-2D-CONTOUR-CMD)

Tool we choice 0.8mm flat end milling cutter. the feed and speed reference the following.

![](https://gitlab.com/picbed/bed/uploads/9321d81cb5f603a45ef5b1726669b16c/millprofile.png)
The Geometry just choice the profile of the PCB board.
![](https://gitlab.com/picbed/bed/uploads/2573ce01aad48e914a5e407d8510918a/profile2.png)



![](https://gitlab.com/picbed/bed/uploads/5e40c9f9f6dddb776ef3716949661744/WX20201020-094347_2x.png)
The only different for first 2D Contour and second 2D Contour is the above "Bottom Height"


In this step, the method of Passs,Simulate,Output NC programis same with "3.1", so just reference  "3.1.4Passs"," 3.1.5 Simulate", "3.1.6Output NC program"


We finish the NC data program. In next step,we need use CNC to manufacture it.

## Reference

* [Autodesk Fusion 360 manufacture(CAM) detail ](https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-BEC5DEA9-AC3E-4FA8-998E-4AE8CD0D0B1E)



*****

**This document support by Bob Wu and Ciel Luo；thanks for XiaoWu's kind support 20201020**
