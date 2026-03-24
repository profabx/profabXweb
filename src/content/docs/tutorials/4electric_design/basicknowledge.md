---
title: "Basicknowledge"
sidebar:
  attrs: { id: tutorial }
---


## 1. Basic PCB Concepts

A **printed circuit board** or **PCB**, is a plate or board used for placing the different elements that conform an electrical circuit that contains the electrical interconnections between them.
The most simple printed circuit boards are the ones that contains copper tracks or interconnects only on one of its surfaces. These kinds of boards are known as 1 layer printed circuit board or 1 layer PCB.
The most common PCB's manufactured today are the ones that contain 2 layers, that is, you can find interconnects in both surfaces of the board. However, depending on the physical complexity of the design ( PCB layout ), the boards can be manufactured of 8 or more layers.

![](https://gitlab.com/picbed/bed/uploads/4b48516c6d9ce4f0cf1b66ae50a62d14/pcb-2-layer-printed-circuit-board-concepts-1.jpg)
	
**Example region of a 2 layer PCB**






## 2. layers
The printed circuit boards can be made of several layers. When a PCB is designed with the aid of an EDA software, often are specified several layers that doesn't necessary correspond to conductive material ( copper ). For example, the silkscreen and soldermask are nonconductive layers. Having conductive and nonconductive layers may lead to confusion, because manufacturers use the term layer when they are referring to the conductive layers only. From now on, we are going to use the term layer without the suffix "CAD" only when referring to conductive layers. If we use the term "CAD Layer" we are referring to all kinds of layer, that is, conductive and nonconductive.

The CAD Layer stackup is the following:

|CAD Layer (conductive and nonconductive)|CAD Layer description|
| ----- | ----- | 
| 1 |  Top silkscreen/overlay ( nonconductive ) |  
| 2 |  Top soldermask ( nonconductive ) |  
| 3 |  Top paste mask ( nonconductive ) |  
| 4 |  Layer 1 ( conductive ) |  
| 5 |  Sustrate ( nonconductive ) |  
| 6 |  Layer 2 ( conductive ) |  
| ... |  ... |  
| n-1 |  Sustrate ( nonconductive ) |  
| n |  Layer n ( conductive ) |  
| n+1 |  Bottom paste mask ( nonconductive ) |  
| n+2 |  Bottom solder mask ( nonconductive ) |  
| n+3 |  Bottom silkscreen/overlay ( nonconductive ) | 


The following picture shows 3 different stackups. The orange color highlights the layers in each stackup. The stackup height, or board thickness can vary depending on the application, however the most used is 1.6 [mm] or 62 [mils]. In some countries [thou] is used as a synonym for [mils]. ( `1 [mil] = 0.001 [inch] = 0.0254 [mm]` )

![](https://gitlab.com/picbed/bed/uploads/b20ea51f5da79c03e011bdb8d3879eb3/WX20200519-151704.png)

**Example of 3 different PCB stackups: 2 layers (a), 4 layers (b) and 6 layers (c)**


## 3. Older mask, silk screen
#### 3.1 Soldermask
For mounting the electrical components on the printed circuit boards, an assembly process is required. This process can be done by hand or through specialized machinery. The assembly process requires the use of solder to place the components on the board. For avoiding or to prevent the solder to accidentally short-circuit two tracks from different nets, pcb manufacturers apply a finish or varnish called soldermask on both surfaces of the board. The most common color of soldermask used in printed circuit boards is green, followed by red and blue.
In EDA software (Electronic design automation), generally exist a rule associated to the expansion of the soldermask. This rule specifies the distance that exists between the pads' borders and the soldermask's border. This concept is illustrated in figure 2 (a).

#### 3.2Silkscreen or Overlay
Silk-screening is the process where the manufacturer prints information on the soldermask conducive to facilitate the processes of assembly, verification and repair. Generally the silkscreen is printed for indicating test points as well the position, orientation and reference of the electronic components that are part of the circuit. Also it can be used for any purpose that the designer may require, for example, the company name, configuration instructions (this was commonly used in old PC motherboards), etc. The silkscreen can be printed on both surfaces of the board. Also the term silkscreen is known as overlay. The following picture shows a region of a circuit, all the printings made in white correspond to the silkscreen.

![](https://gitlab.com/picbed/bed/uploads/c6477bba5cdd999ae20c9546a4c3d0eb/WX20200519-151846.png)
**Soldermask expansion (a) and silkscreen (b)**


#### 3.3 Pad
A pad is a small surface of copper in a printed circuit board that allows soldering the component to the board. You can think of a pad as a piece of copper where the pins of the component are mechanically supported and soldered. There are 2 types of pads; thru-hole and smd (surface mount).

Thru-hole pads are intended for introducing the pins of the components, so they can be soldered from the opposite side from which the component was inserted. These types of pads are very similar to a thru-hole via.

The smd pads are intended for surface mount devices, or in other words, for soldering the component on the same surface where it was placed.

The following picture depicts 4 components. The components IC1 and R1 have 8 and 2 SMD pads respectively, while both components Q1 and PW have 3 thru-hole pads.

![](https://gitlab.com/picbed/bed/uploads/98777f294cbf46def4d7d95f1c665899/SMD.png)

**SMD and Thru-hole Pads**


## 4. Vias
#### 4.1 Plated Holes (Thru-hole Vias or Full Stack Vias)
When an interconnect must be made from a component that is located on the top layer of the printed circuit board with another that is located at the bottom layer, a via (Vertical Interconnect Access) is used. A via is a plated hole that allows the current to pass through the board. The following picture depicts 2 tracks that begin at the pads of a component on the top layer and end at the pads of another component at the bottom layer. For conducting the current from the top layer to the bottom layer, a via is used for each track. The tracks and pads that belong to the bottom layer are visually dimmed, so you can differentiate them from the ones that are on the top layer.
	
![](https://gitlab.com/picbed/bed/uploads/7079eb07680c41b44b29b78b10f99e50/WX20200519-152217.png)
	
**Two integrated circuits located on opposite sides of the PCB are connected using thru-hole vias**

It depicts a more detailed view of a transversal section of a 4 layer printed circuit board or 4 layer PCB. The colors that appear in the Figure are explained in the following table:

| Color  | Legend| 
| -----  | ----- |    
| green  | Top and bottom soldermasks   |  
| red    | Top layer ( conductive )     |  
| violet | Second layeris used as a power plane ( i.e. Vcc or Gnd ) |  
| yellow | Third layer is used as a power plane ( i.e. Vcc or Gnd) |  
| blue   | Bottom Layer ( conductive )      | 

The PCB depicted above shows a track that belongs to the top layer that goes through the board using a thru-hole via, and then continues as a track that belongs to the bottom layer.

![](https://gitlab.com/picbed/bed/uploads/dc961bcc87f64e6c2051540a3d428b41/WX20200519-152329.png)


**Track from the top layer going through the PCB and ending on the bottom layer**

#### 4.2 Blind vias
In high density complex designs is necessary to use more than 2 layer. Generally in multilayer system designs where there are many integrated circuits, power planes ( Vcc or gnd) are used to avoid excessive routing for power rails. In other words, it is lot easier and more secure to directly connect to the power planes that are beneath the chips instead of routing long tracks for the PDS ( Power Delivery System ) ( this can also be achieved with thru-hole vias ). Also there are times that a signal track must be routed from an external layer ( top or bottom ) to an internal layer with minimum via height because it can act as a stub and maybe produce an impedance mismatch. This can cause reflections and produce signal integrity issues ( more on this in a future article ). For these kinds of interconnects blind vias are used, which allows a connection to be made from an external layer to an internal layer with minimum via height. A blind via starts on an external layer and ends on an internal layer, that's why it has the prefix "blind".
To know if a certain via is blind, you can put the PCB against a source of light and see if you can see the light coming from the source through the via. If you can see the light, then the via is thru-hole, otherwise the via is blind.
It is very useful to use these kinds of vias in printed circuit board design when you don't have too much space for placing components and routing. You can put components on both sides and maximize the space. If the vias were thru-hole instead of blind, there would be some extra space used by the vias on both sides.
The following picture depicts 3 vias that are part of 4 layer printed circuit board. If we see the picture from left to right, the first via that we will see is thru-hole via or fullstack via. The second via begins at the top layer and ends at the second layer ( inner ), so we say that this is a 1-2 blind via. At last, the third via begins at the bottom layer and ends at the third layer, so we say that this is a 3-4 blind via.
It is important to have in mind that blind vias are often manufactured in consecutive layers, in other words between L1 L2, L3 L4, Ln-1 Ln.
![](https://gitlab.com/picbed/bed/uploads/8f7300d211052f335c4c80ba7717ebe5/WX20200519-152438.png)

** Comparison between a Thru-hole and a Blind via**
The disadvantage of this type of via is its high price when compared to the thru-hole alternative.

#### 4.3 Buried Vias
These vias are similar to the blind ones, with the difference that they begin and end on an inner layer. If we look at the image depicted in the floowing picture from left to right, we see that the first one is a thru-hole or full stack via. The second one is a 1-2 blind via, and the last one is a 2-3 buried via that begins on the second layer and ends on the third layer.

![](https://gitlab.com/picbed/bed/uploads/a9be79f54491658a168bcc178ad98c04/WX20200519-152527.png)

**Comparison between Thru-hole vias, Blind vias and Buried vias**

It is important to have in mind that blind vias are often manufactured in consecutive layers (i.e. L1 L2)
As the case of blind vias, the main disadvantage of this type of via is its high price when compared to the thru-hole alternative. 








## 5. Copper tracks
A track is conductive path that is used to connect 2 points in the PCB. For example, for connecting 2 pads or for connecting a pad and a via, or between vias. The tracks can have different widths depending on the currents that flow through them.
It is important to highlight that in high frequencies is necessary to calculate the tracks' width so that the interconnect can be impedance matched along the path created by the track. ( more on this in a future article )

***






## 6. Design 

#### 6.1 Design software
[Autodesk Eagle](https://www.autodesk.com/products/eagle/overview)

#### 6.2  Design rules
width/spacing (15, 5 mils)

#### 6.3 Components
1. through-hole
2. surface-mount
3. chip-scale
4. breadboards


#### 6.4 [Component packages](https://en.wikipedia.org/wiki/List_of_integrated_circuit_packaging_types)
Today in the market you can find a great variety of electronic component packages. It is common to find several types of packages for one device. For example you can find the same integrated circuit in [QFP's](https://en.wikipedia.org/wiki/Quad_Flat_Package) and [LCC's](https://en.wikipedia.org/wiki/Chip_carrier#Plastic_leaded_chip_carrier) packages.

Basically there exist 3 big families of electronic packages:

| Package |  Description |  Example Image | 
| ----- | ----- | ----- | 
| Thru-Hole | Are all those components that have pins intended to be mounted through a plated hole in the PCB. This kind of component is soldered to the opposite side of the board from which the component was inserted. Generally these components are mounted on one surface of the board only.| ![](https://gitlab.com/picbed/bed/uploads/9d7c42c19e0c96b61570a74151518982/thruhole-printed-circuit-board-concepts-1.jpg) |  
| SMD/SMT (surface mount device/surface mount technology)| Are all those components that are soldered in the same side of the board from which the component was placed. The advantage of this type of package is that it can be mounted on both sides of the PCB. Also, these components are smaller than the thru-hole type, which allows the design of smaller and denser printed circuit boards. These types of components are useful for frequencies up to 200 [MHz] (fundamental clock frequency).| ![](https://gitlab.com/picbed/bed/uploads/0f471a87e193f17ba085e577a6d06b22/smd-printed-circuit-board-concepts-1.jpg)|
| BGA (Ball grid array) | These types of components are frequently used for high density pin integrated circuits. For soldering them to the printed circuit boards it is required to have specialized machinery due that the pins are made of solder balls that have to be melted for making the electrical contact with the pads.BGA components are ideal for high frequency integrated circuits due to the very small parasitic inductances present in the joint between the pad and the balls. These type of components are very common in computer hardware like motherboards and video accelerator cards.|  ![](https://gitlab.com/picbed/bed/uploads/1206630544ef6bf14fe195af41e80055/bga-printed-circuit-board-concepts-1.jpg) | 


For more information,reference wikipedia.[Surface Mount Technology - Wikipedia](http://en.wikipedia.org/wiki/Surface-mount_technology "Tecnología de Montaje Superficial - Wikipedia")


## 7. PCB fabrication
 wait for more infromation
#### Etching
1. Lithography
2. Transfer
3. Ferric/cupric chloride, ammonium/sodium persulfate
4. [SDS](https://us.vwr.com/store/search/searchMSDS.jsp)
5. Waste disposal



***

## 8. Material
#### Rigid
1. FR4 (epoxy glass)
2. [FR1][13] (phenolic paper)

#### Flex
1. [Kapton][14]
2. [#1 epoxy film][15]
3. [#1126 copper tape][16]
#### High-frequency
1. teflon
2. glass

#### Copper
1. 0.5 oz: 17.5 um
2. 1.0 oz: 35 um
3. 2.0 oz: 70 um





## 8. [machining](http://www.youtube.com/watch?v=XdamEhs2RIk&amp;list=PL-xEsC0ZUCUM42QNHaOOdoOwYg0j251dU&amp;index=1)
#### 8.1[machines](http://cba.mit.edu/tools)
* Tools
  * [0.010](http://www.carbidedepot.com/00100in-DIA-220M-010-P70452.aspx)
  * [1/64](http://www.carbidedepot.com/00156in-DIA-2FL-SE-AlTiN-164-P180142.aspx)
  * [1/32](http://www.carbidedepot.com/00312in-DIA-2FL-SE-AlTiN-132-P180143.aspx)
* Fixturing
* Underlay
* Orientation
* Zeroing
* Set-screws
* Lifetime
* Deburring
* Cleaning

#### 8.2 [Vinyl cutter](http://fab.cba.mit.edu/classes/863.17/Harvard/people/HonghaoDeng/project-3/project-3.html) 

* [Flex](http://fab.cba.mit.edu/classes/863.17/Harvard/people/HonghaoDeng/project-9/project-9.html)
* [laser cutter](http://fabacademy.org/archives/2015/doc/fiber-laser-cutting-pcb.html)
* [printing](http://cba.mit.edu/events/13.03.scifab/index.html)
* [plating](https://www.google.com/search?q=electroplating)
* [sewing](http://cba.mit.edu/docs/papers/00.07.E-broidery.pdf)







#### 8.3 Assembly
* [solder](https://www.digikey.com/products/en/soldering-desoldering-rework-products/solder/262)
* eutectic
* wetting
* flux
* wire, paste, bar
* manual, reflow, wave
* [ROHS](http://ec.europa.eu/environment/waste/rohs_eee/index_en.htm)

#### 8.4stuffing
*  component orientation
*  tacking down parts
*  bottom to top, inside to outside
*  fumes
*   washing

#### 8.5 desoldering

* [braid](http://www.digikey.com/product-detail/en/Q-B-10AS/EB1088-ND)
* [hot air](http://www.amazon.com/Weller-6966C-Watts-Electric-Industrial/dp/B000ICGMN4)
* gravity

#### 8.6 cutting traces, adding jumpers
#### 8.7 [pick-and-place](http://www.ddmnovastar.com/pick-and-place)
#### 8.8encapsulation



***
## 9. CAM
#### 9.1formats
* [Gerber/RS-274X](https://www.ucamco.com/files/downloads/file/81/the_gerber_file_format_specification.pdf)
* [png](http://academy.cba.mit.edu/embedded_programming/hello.ISP.44.res.traces.png) resolution
#### [mods](http://mods.cba.mit.edu)
1. [video](http://academy.cba.mit.edu/mods.mp4)
#### 9.2trace width
* [traces](http://academy.cba.mit.edu/linetest.png)
* [interior](http://academy.cba.mit.edu/linetest.interior.png)
* [1/64"](http://academy.cba.mit.edu/0156.jpg)
* [0.010"](http://academy.cba.mit.edu/010.jpg)





***
## 10.Programming

***
## 11. Debuging


***
## 12. Effect



***



## 13. board houses
#### vendor
* [PCB:NG](https://www.pcb.ng)
* [AP Circuits](http://www.apcircuits.com/)
* [Advanced](http://www.4pcb.com/)
* [Sierra](http://www.protoexpress.com/)
* [Screaming Circuits](http://www.screamingcircuits.com/)
* [AQS](http://aqs-inc.com)
* [Gold Phoenix](http://www.goldphoenixpcb.biz/)
* [3PCB](http://www.3pcb.com)
* [Think &amp; Tinker](https://www.thinktink.com)
* PCB, kit, BOM


***
## 14. Update 





## 15.Reference

* [NexPCB](https://www.nexpcb.com/blog/what-is-a-printed-circuit-board-basic-pcb-concepts)
* [WIKI](https://en.wikipedia.org/wiki/Printed_circuit_board)

 