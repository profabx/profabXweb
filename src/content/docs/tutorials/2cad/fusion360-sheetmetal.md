---
title: "Fusion360 Sheetmetal"
sidebar:
  attrs: { id: tutorial }
---

## 1. The software interface

![](https://gitlab.com/picbed/bed/uploads/6d341e5f57dc3b1c54ecd4da81446452/metalplate1.png)

Click on‘sheet metal’to go to the sheet metal design interface 

![](https://gitlab.com/picbed/bed/uploads/5f5e66048eb3d433f8af427d6abf4871/sheetmetal2.png)


Is it possible to create a sketch as soon as you enter the sheet metal interface? 

**Sheet Metal: cold-rolled sheet (No surface protection, easy oxidation rust) , galvanized steel SECC, stainless steel SUS304,aluminum. These sheet metals are sheets or rolls of uniform thickness**
 
![](https://gitlab.com/picbed/bed/uploads/892fa731ab6fd6764dae38fd279274be/sheetmetal3.png)
Normally thickness: 0.8 mm, 1 mm, 1.2 mm, 1.5 mm, 2 mm, etc. Basical interval  is  0.5 mm or 1 mm. The max interval would be 5mm.




## 2. Sheet metal rules
In the sheet metal interface, click ‘modify’-‘sheet metal rules’
![](https://gitlab.com/picbed/bed/uploads/34c62c366075bb5146877e57d4bd200e/sheetmetal4.png)

We would define parameter in rule selection box(your library would just have the system’s default material: Steel (mm) ,) 
![](https://gitlab.com/picbed/bed/uploads/c4283890fb22bc409b0892f34dee4d30/sheetmetal5.png)

Click on the small white Arrow in front of ‘steel’ and a message box will pop up for the material. You can see all kinds of infomation about the material (there are also two small arrows, which are full of info)

![](https://gitlab.com/picbed/bed/uploads/af314a35d7f270d6893738e48f4367b4/sheetmetal6.png)

What if the design size is not the default thickness? Can move the mouse to ‘steel (mm)(default)’ behind, you can see will appear a pencil pattern, click ‘pencil’
![](https://gitlab.com/picbed/bed/uploads/23c35bb469da197eae2876549ea09cd5/sheetmetal7.png)

Clicking on ‘pencil’ brings up an edit rule box where you can change the thickness of the sheet metal in this design.


 ![](https://gitlab.com/picbed/bed/uploads/25df31c71825c20bbe10d2afe746b112/sheetmetal8.png) 

## 3.Create sketch
Under the sheet metal screen, click ‘create sketch’ in the create bar. All we have to do here is build a floor.

![](https://gitlab.com/picbed/bed/uploads/707e24a0c9516d2f5fab79ec24139633/sheetmetal9.png)
![](https://gitlab.com/picbed/bed/uploads/2531c2ed3d8a427a4bb751d33a7309f9/sheetmetal10.png)


Click ‘finish sketch’ , then we’ll make the sketch into a solid.

Building the sheet metal solid
Instead of stretching the sketch, the software won’t be able to know
 if you’re drawing a sheet metal part or a regular solid part.
Go back to the create bar and Click ‘flange’
![](https://gitlab.com/picbed/bed/uploads/63ac91ecbbf76bf4e83b460b26af7add/sheetmetal11.png)



Clicking on the sketch plane brings up a ‘flange’ box, and the sketch becomes an entity, which is the material in the‘sheet metal rules’ we set up.


## 4. 3D model

![](https://gitlab.com/picbed/bed/uploads/d3033aeb66173174a9e483f124d37a0a/sheetmetal12.png)

One of the most common features of sheet metal parts is that you will find that the edges of many sheet metal parts are bent. 
Looking at sheet metal’s design interface, click on ‘flange’ -- as if to select an edge over our physical body. After selecting the edge, the ‘flange’ box pops up a lot of editable info.

![](https://gitlab.com/picbed/bed/uploads/645e691f509738bd7f2eb1cd81bae104/sheetmetal13.png)

Type any number of values in the box (I typed ‘15’ mm) , so that a sheet metal edge will be finished .


![](https://gitlab.com/picbed/bed/uploads/3807700d15540b8de026d5364657d506/sheetmetal14.png)



We wrap the other three edges in the same way. 

![](https://gitlab.com/picbed/bed/uploads/3323bb740e9c4a2939592055aa26562e/sheetmetal15.png)


## 5. Heat sink hole design
Since sheet metal is often used as a shell for equipment, and the interior is often filled with electronics, there’s a heating problem that needs to be solved, like our mainframe. 
Therefore, it is necessary to open some heat dissipation holes (heat dissipation holes of various shapes) on sheet metal parts.
  ![](https://gitlab.com/picbed/bed/uploads/3c4cc41966ecef2cb59850159834a9e0/sheetmetal16.png)


In the sheet metal interface, select ‘create sketch’ , arbitrarily select the surface you want to open the heat dissipation hole, into the sketch drawing
![](https://gitlab.com/picbed/bed/uploads/eae390a6f62636ea2e52644a8fdfa917/sheetmetal17.png)

We are going to create a strip heat sink hole and start drawing (exactly the same function as in solid sketch). 

![](https://gitlab.com/picbed/bed/uploads/d9f29b82f2016e27fbd5bbc69b0d7eed/sheetmetal18.png)


Start the rectangular Pattern. Click on ‘CREATE’, create a column as a ‘Rectangular Pattern’, then select the objects you want; then start choosing the direction, distance, quantity as you want .


![](https://gitlab.com/picbed/bed/uploads/35a835fdfe9388297ead88d15671c164/sheetmetal19.png)

Click ‘finish sketch’ , then select all the patterns , select ‘Extrude’ and enter the distance. 

![](https://gitlab.com/picbed/bed/uploads/2815a2bc3a01f772d3ff205b025081c3/sheetmetal21.png)


