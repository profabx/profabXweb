---
title: "SMT"
sidebar:
  attrs: { id: tutorial }
---



## 1.SMT production process

![](https://gitlab.com/picbed/bed/uploads/75deed25b35e99f141d8861575d147af/Capture2.png)

![](https://gitlab.com/picbed/bed/uploads/892c5ac152dfd399b131c476a156a656/Screen_Shot_2020-10-21_at_11.28.25.png)

## 2. Material package type
SMT involves a wide variety of parts and styles, many of which have formed industry-wide standards. These are mainly chips, capacitors, resistors, and other types of components. Many are still undergoing constant changes, especial IC parts. 
**The part specifications** is the external dimensions of part. The size specifications of standard parts are expressed in Metric representation(1206 0805 0603 0402) ,Imperial representation(3216 2125 1608 1005)

#### 2.1. Resistor
A resistor is an electrical component that limits or regulates the flow of electrical current in an electronic circuit.The following is different kinds of resistors
![](https://gitlab.com/picbed/bed/uploads/32d9c45fcfbf1f72fc83631d6e31a3ad/SMT_Chip_Resistor_1.png)
The shape of resistor in SMT is the following picture 

![](https://gitlab.com/picbed/bed/uploads/7169e2954e966f7c36bbd563c4d700fc/Screen_Shot_2020-10-21_at_14.10.44.png)

#### 2.2. Capacitor


A capacitor is a device that stores electrical energy in an electric field(C=Q/U,1F= 10^3^mF =10^6^μF =10^9^nF=10^12^pF）. It is a passive electronic component with two terminals.Can be divided into two categories: non-polar and polar
![](https://gitlab.com/picbed/bed/uploads/cc0e537f6e26d286285f61d5f72fbb9d/2560px-Types_of_capacitor.svg.png)


![](https://gitlab.com/picbed/bed/uploads/1682e19d733ed671c2c01d2399b1eaa3/Solid-And-Polymer-Tantalum-Capacitors-Vs.-SMT-MLCCs-1100x477.jpg)
![](https://gitlab.com/picbed/bed/uploads/f237915c315123fde03c4f60b53d4ee0/Capacitors__7189597135_.jpg)

#### 2.3. Diode

There are three types of commonly used packaging: 0805, 1206, 1210. According to the limits of the current, the package form is roughly divided into two categories.

* The small current type (such as 1N4148) is packaged at 1206.
* High current type (such as IN4007) specific size: 5.5 X 3 X 0.5

In addition ,Light-emitting diodes: the colors are red, yellow, green, and blue. The brightness is bright, bright, and super bright.

#### 2.4. IC parts

* SOP (Small Outline Package): The parts have feet on both sides and the feet are flared outward (generally called gull wing type pins).
* SOJ (small outline J-lead package): The part has feet on both sides, and the foot is bent toward the bottom of the part (J-type pin).
* QFP (Quad Flat Package): The parts have feet on four sides, and the parts are opened outwards.
* PLCC (Plastic Leadless Chip Carrier): The parts have feet on four sides, and the parts are bent to the bottom of the parts.
* BGA (Ball Grid Array): The surface of the part has no feet, and the feet are arranged in a spherical matrix at the bottom of the part.
* CSP (CHIP SCAL PACKAGE): Part size packaging.

There are many other categories of components that can be used in the SMT process. We'll discuss more of these as we move along in this series. 

## 3. Solder paste 

Solder paste printing is a key part in the SMT (Surface Mount Technology) process. Since the solder paste is a mixture of powder and flux, it is fluid during the printing process. 
A Solder paste is an alloy compound that is generally composed of two or more kinds of metal.  The metals in the solder paste are generally composed of Tin, Lead, Silver and/or Copper

![](https://gitlab.com/picbed/bed/uploads/d726f7d49b2f8f5097cc404dbd6e9f88/Screen_Shot_2020-10-21_at_11.07.50.png)

**The size of Tin powder**Tin powder has either spherical or oval shapes. Spherical printing should be a wide, small surface area with low oxidation and bright solder points. The oval shape is generally poorer in each of these qualities. The smaller the particle diameter, the easier the oxidation.
![](https://gitlab.com/picbed/bed/uploads/bc1c8e38ca5181021a784be39bae1091/Common_size_of_a_tin_powder.png)



**Viscosity** is a major indicator of the form of solder paste fluids. If it has low viscosity, it flows easily for filling and collapses. If it has high viscosity, it is easy to roll, peel and form. The viscosity requirement is also different at different stages of solder paste printing. SMT has a flexible requirement of viscosity but fortunately viscosity itself is a variable that is easy to change. This requirement of varying viscosity places a higher dependence on the solder paste printing process and the printer's parameter settings.
**Temperature categories** by its melting temperatures
* High Temperature (eg. SN-AG-CU alloy series, melting point 217-227 ℃)
* Medium temperature (eg. sn64-bi35-ag1, melting point 178 ℃)
* Low temperature (eg sn42-bi58, melting point 138 ℃)

In addition,we need learn the following points:
* Storage:we need storage in industrial refrigerator of between 0-10 ℃. The validity period of solder paste is 6 months (unopened). It also needs to be kept away from sunlight to prevent some of the basic properties of the paste from breaking down. 
* Before opening the solder paste, the temperature needs to be brought back to the ambient temperature of 25±3℃. This rise in temperature should be gradual and done for about 4-6 hours





## 4. Steel mesh

Stencil printing is contact printing, so the thickness of the stencil and the size of the aperture determine the amount of solder paste needed to print. Too much solder paste will produce a short circuit, whereas too little solder paste will produce solder shortage at the solder joints,the template and shape of the aperture and the smoothness of the opening which can also affect the quality of the release. Additionally, the template aperture must have a bell-shaped mouth, otherwise the solder paste will be removed from the chamfering of the bell jar during demolding.
![](https://gitlab.com/picbed/bed/uploads/584dc1c9fd037cf25ef8523e594f60de/Printing_machine_and_steel_mesh.png)





## 5. Solder paste printing
![](https://gitlab.com/picbed/bed/uploads/f90985c28ba206202743d58c47832320/Screen_Shot_2020-10-21_at_11.30.16.png)

The picture reference from [semanticscholar](https://www.semanticscholar.org/paper/DMAIC-Approach-to-Improve-the-Capability-of-SMT-Li-Al-Refaie/99d7d6d9ecf5301336d6653fb0a81d04abf1f46f) 

Solder paste is a thixotropic fluid. When the paste is viscous, the squeegee will move forward at a certain speed and angle to push the solder paste into a aperture in front of the squeegee.  
The viscous friction of the solder paste causes the solder paste to shear at the intersection of the squeegee and the stencil. The shearing force then reduces the viscosity of the solder paste thereby facilitating smooth injection of the solder paste into the mesh. There is a certain balance required between the speed, pressure and angle of the blade with the stencil and the viscosity of the solder paste. Therefore, the printing quality of the solder paste can only be assured by properly controlling these parameters.





## 6.  Mounting
![](https://gitlab.com/picbed/bed/uploads/8f0f5bff14696de7e3c3fc4129f2be59/Capture4.png)
![](https://gitlab.com/picbed/bed/uploads/c69b5a9a12788bedbab09c296b97ba55/ezgif.com-video-to-gif-2.gif)
## 7. Reflow
With the increase of assembly density, Nitrogen for Reflow Process were created and it has the following advantage:
* Prevents oxidation in components during heating
* Improves the wetting power of welding and speed up the wetting speed
* Reduces the generation of solder balls, bridging and obtain better welding quality

![](https://gitlab.com/picbed/bed/uploads/e542d1d122d1a0c75b1a0f86cc107fcc/ezgif.com-optimize.gif)
![](https://gitlab.com/picbed/bed/uploads/d3a92ba8d2cace6777cd07e2ba479056/smt_nitrogen_reflow_soldering.png)
Reflow soldering is an extremely vital step in the SMT process. The temperature curve associated with the reflow is an essential parameter to control to ensure the correct connection of parts. The parameters of certain components will also directly impact the temperature curve selected for this step in the process.
![](https://gitlab.com/picbed/bed/uploads/f4e896ebcee0f075953fb3ac0b6dcc8a/tempcurve.png)

* **Thermal soak zone** is to volatilize the lower melting solvent in the solder paste.The main components of flux in the solder paste include resin, active agent, viscosity enhancer and solvent. The role of the solvent is mainly as a carrier for the resin with the additional function of ensuring sufficient storage time of the solder paste. The preheating zone needs to volatilize the solvent but it must control the rising temperature. Too high of a heating rate will cause thermal stress on the components that can damage the component or reduce the performance/lifespan of the components. 

* **Reflow zone** can get advice from solder paste supplier and the capacity of PCB.This phase has two functions.
  * First:achieve a uniform temperature for the entire PCB board. This helps to reduce the thermal stress impact in the reflow zone and limits other soldering defects such as component lifts at larger volumes. 
  * Second:the flux in the solder paste begins to react actively thereby increasing the wettability of the welding surface. 

* **High-temperature**(“time above reflow” or “time above liquidus” (TAL)) is the part of the process where the maximum temperature is reached. A common peak temperature is 20–40 °C above liquidus. A standard guideline is to subtract 5 °C from the maximum temperature that the most vulnerable component can sustain to arrive at the maximum temperature for process. Additionally, high temperatures (beyond 260 °C) may cause damage to the internal dies of SMT components as well as foster intermetallic growth. Conversely, a temperature that isn’t hot enough may prevent the paste from reflowing adequately.


* **Cooling zone** to gradually cool the processed board and solidify the solder joints. Proper cooling inhibits excess intermetallic formation or thermal shock to the components. Typical temperatures in the cooling zone range from 30–100 °C (86–212 °F). A cooling rate of 4°C/s is commonly suggested. It is a parameter to consider when analyzing process results.

## 8. CHECKING

* AOI: The term AOI stands for Automatic optical inspection in which an inspection machine take pictures or measure height , volume and area (using laser beam) of SMT material and compare it to reference (image frame or value) and decide if it's defect or good product


![](https://gitlab.com/picbed/bed/uploads/5695e732f58a3569d9d2b7e2a8e62e20/Capture.png)
* SPI (Solder Paste Inspection):An inspection machine that generate a 3D image of solder paste print using laser beam to perform a 3D inspection by calculating and visualizing of Volume, height and area of solder paste on the PCB and view it in analytic way (Graphs, histograms and Pareto charts)
![](https://gitlab.com/picbed/bed/uploads/530b830ff7d96673a4bf3ae48ac45961/Capture3.png)


## Reference
* [Basics of SMT Solder Paste Printing](https://www.nexpcb.com/blog/basics-of-smt-solder-paste-printing)
* [A Quick Primer on SMT Solder Paste](https://www.nexpcb.com/blog/a-quick-primer-on-smt-solder-paste)
* [SMT Reflow Soldering Temperature Curve](https://www.nexpcb.com/blog/smt-reflow-soldering-temperature-curve)
* [What is SMT Nitrogen reflow soldering?](https://www.nexpcb.com/blog/what-is-smt-nitrogen-reflow-soldering)
* [Basics of SMT Reflow Soldering Temperature Plate](https://www.nexpcb.com/blog/basics-of-the-smt-reflow-soldering-temperature-plate)
* [What is an SMT Solder Paste Injection System?](https://www.nexpcb.com/blog/what-is-smt-solder-paste-injection-system)
* [SMT BGA Solder Joint Slice Analysis](https://www.nexpcb.com/blog/smt-bga-solder-joint-slice-analysis)
* [The Guide to SMT Material Packaging: Standard Packaging](https://www.nexpcb.com/blog/the-basics-of-smt-material-package-type)
* [The Guide to SMT Material Packaging: Chip Resistor](https://www.nexpcb.com/blog/the-guide-to-smt-material-package-type-chip-resistor)
* [SMT Passive Parts](https://www.nexpcb.com/blog/smt-passive-parts)


******
* 20201021 Support by [Liang Guo](https://nex-fab.gitlab.io/fab-01/gl/),[Orkun](https://nex-fab.gitlab.io/fab-02/orkun/), [Bob](http://fabacademy.org/2018/labs/fablaboshanghai/students/bob-wu/),