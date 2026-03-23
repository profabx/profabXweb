---
title: "3D Design Fusion360"
sidebar:
  attrs: { id: tutorial }
---



## What is Fusion 360?

[Fusion 360](https://www.autodesk.com/products/fusion-360/overview) is a cloud-based CAD/CAM/CAE tool for collaborative product development. Fusion 360 combines fast and easy organic modeling with precise solid modeling, allowing you to make your designs manufacturable.
Last but not least,With the help of [Eagle](https://www.autodesk.com/products/eagle/overview),Fusion has the function of Electromechanical.

My [finial project Flexible PCB digital machine](http://fabacademy.org/2018/labs/fablaboshanghai/students/bob-wu/Finialproject.html) is a machine which is about fusion 360 and eagle.We are investigating workflows and putting together a plan around how we can integrate ECAD into the Fusion 360 ecosystem. 



***

## Interface
![](https://ws3.sinaimg.cn/large/006tNc79gy1fog2zyyp82j31kw0xqndi.jpg)
1. Application bar: Access the Data Panel (that allows quick access to your design files), file operations, save, undo and redo.
2. Profile and help: In profile you can control your profile and account settings, or use the help menu to continue your learning or get help in troubleshooting.
3. Toolbar: Use the Toolbar to select the workspace you want to work in, and the tool you want to use in the workspace selected.
4. ViewCube: Use the ViewCube to orbit your design or view the design from standard view positions.
5. Browser: The browser lists objects in your design (everything from planes and sketches to parts and assemblies). Use the browser to make changes to objects and control visibility of objects.
6. Canvas and marking menu: Left click to select objects in the canvas. Right-click to access the marking menu. The marking menu contains frequently used commands in the wheel and all commands in the overflow menu.
7. Timeline: The timeline lists operations performed on your design. Right-click operations in the timeline to make changes. Drag operations to change the order they are calculated.
8. Navigation bar and display settings: The navigation bar contains commands used to zoom, pan, and orbit your design. The display settings control the appearance of the interface and how designs are displayed in canvas.
9. The SCULPT workspace is a sub-environment of the MODEL Workspace. The sculpting tools allow you to push and pull the geometry from vertices and edges into desired shapes. You can create and modify 2D or 3D surface geometry and 3D solid objects in the SCULPT workspace. 

***

## Main Operation:

I would show the design steps of my pen box to introduce the basic of Fusion 360 operation
![](https://ws4.sinaimg.cn/large/006tNc79gy1fog3f4zz8sj30zk0jen4f.jpg)

#### Build project
![](https://ws4.sinaimg.cn/large/006tNc79ly1fog3nbbngoj31kw0wptmv.jpg)
![](https://ws2.sinaimg.cn/large/006tNc79gy1fog3o1914dj310m0ty48y.jpg)
Open `data panel`, we can  build our Fusion 360 project(in this case I name the folder as "fabalb"),and then build `New design`.

#### Sketch
1. Create a sketch on a selected plane or face.
	* `Sculpt > Sketch > Create Sketch` 
	* `Model > Sketch > Create Sketch`   
    * `Patch > Sketch > Create Sketch` 
![](https://ws3.sinaimg.cn/large/006tNc79gy1fog3ud0etbj31kw0z8wr7.jpg)
2. Select the plane or face to create the sketch on. Valid selections are:
	* Origin planes
	* Work planes
	* Planar faces on geometry.
In this case I choice * origin planes*
![](https://ws4.sinaimg.cn/large/006tNc79gy1fog3u70tgcj31kw0u6aiy.jpg)

3. Drawing
	* We can use different kinds of tool to drawing
	* And then use`sketch dimention`commond or hortcut key `D` to make sure the size
	* We can also use `Sketch palette` to constraint the sketch
	* Click `Stop Sketch` on Sketch palette to stop sketch working
![](https://ws4.sinaimg.cn/large/006tNc79gy1fog3tukyw9j31jc14mn7f.jpg)
![](https://ws4.sinaimg.cn/large/006tNc79gy1fog3twgsfjj31kw0ttalb.jpg)
![](https://ws2.sinaimg.cn/large/006tNc79gy1fog49kzxrmj31kw0xk7de.jpg)


#### MODEL
The MODEL workspace allows we to create and edit solid 3D geometry. This workspace is most like a traditional 3D CAD environment. In addition to standard modeling features, like extrude or revolve, we can also access the sculpting workspace from within the MODEL workspace. 

In the `Creat` part we can find many command and it based on the abrove sketch,and in this case I show the simple command of `Extrude`

![](https://ws2.sinaimg.cn/large/006tNc79gy1fog4hnaes5j31kw0zgngc.jpg)

#### Assemble

1. Build a  file for assemble data and save it in certain folder(it's better in same folder, so I save it in "fablab" folder)
    ![](https://ws2.sinaimg.cn/large/006tNc79gy1fog6fzfkmrj31kw0zdakk.jpg)
2. Right click the file I want put inside and then choice `Inside into current design`,fusion 360 will load model into workspace
    ![](https://ws1.sinaimg.cn/large/006tNc79gy1fog6isnz5sj31kw0xu182.jpg)
    
3. Use `Joint` command to joint two part together
    ![](https://ws2.sinaimg.cn/large/006tNc79gy1fog6jgk6shj31cu0y2gvn.jpg)
    In Fusion 360 we have 7 different types of Joints that we can leverage with both As-Built Joint, and Joint commands. Each Joint Type has a different use, and a different number of allowed degrees of freedom to define our motion.
    ![](https://ws1.sinaimg.cn/large/006tNc79gy1foga1ck641j31e612cag1.jpg)
    
    In our case, I use rigid. Rigid is probably the most commonly used Joint Type when starting out. Rigid locks components together, removing all degrees of freedom. An example of when you might want to use this is when two pieces will be welded together, or you are bolting multiple components together in multiple locations so that no motion will be allowed. With the Rigid Joint Type we don’t have any additional options since there is no allowed motion to control.
    ![](https://ws3.sinaimg.cn/large/006tNc79gy1fogag7kajsj31c6172496.jpg)
  ![](https://ws2.sinaimg.cn/large/006tNc79gy1fog6fegscmj31kw0qgtmm.jpg)
	![](https://ws4.sinaimg.cn/large/006tNc79gy1fog6f8vknhj31kw0wk4gy.jpg)
	![](https://ws1.sinaimg.cn/large/006tNc79gy1fog6f3aqyxj31kw11vas7.jpg)
*In this part ,we need to make sure the size design and assemble tolerance to make sure we can manufacture it ,and I will introduce it in Laser "cutter -kerf"part.*


#### DRAWING
Create standard 2D drawings from your 3D geometry by entering the DRAWING workspace. See the Drawings section of the help for more information.
* Choice  ` Drawing>from design` 
* In creating drawing,we can determine the size and other information , I choice `IOS` standard, unit is `mm`sheet size `A4`,etc
* In the layout page:we need to do the follwoing 6 setps and then output dwg format for laser cutter .



![](https://ws1.sinaimg.cn/large/006tNc79gy1fogaug43x0j31kw0zotok.jpg)

![](https://ws1.sinaimg.cn/large/006tNc79gy1fogaomxavij31kw0yiwsw.jpg)
![](https://ws3.sinaimg.cn/large/006tNc79gy1fogaoq79hyj31ca15244h.jpg)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fogaqq0b7cj31kw0ziwlv.jpg)
#### Output from dwg>dxf

Becasue laser cutter software need dxf format, but fusion 360 can only put dwg(I have communicate with autodesk development team ,they are research laser cutter format)

1. Open the dwg file in Autodesk
2. Use the command of `ExportLayout`
3. Save as new file
4. Open it and edit the detail
5. Save as dxf format
![](https://ws1.sinaimg.cn/large/006tNc79ly1fogb5eds3pj30zk0sggnu.jpg)
![](https://ws2.sinaimg.cn/large/006tNc79ly1fogb5a7gqjj30zk0sgdjd.jpg)
![](https://ws2.sinaimg.cn/large/006tNc79ly1fogb53kuxyj30zk0sgdi4.jpg)
In this part we need to add `ExportLayout` command to change the data
![](https://ws1.sinaimg.cn/large/006tNc79ly1fogb52vbelj30zk0sgn0s.jpg)
![](https://ws1.sinaimg.cn/large/006tNc79ly1fogb50zqv4j30zk0sg76h.jpg)
![](https://ws3.sinaimg.cn/large/006tNc79ly1fogb4vj5mwj30zk0sg77a.jpg)

***
## Another operation
*The detail information will coming soon in another case*

####PATCH
The PATCH workspace allows you to create and edit 2D or 3D surface geometry. Working with surface geometry is slightly different from working with traditional 3D solid bodies, so it has been broken out into a separate workspace. Many designers use surface modeling techniques along with 3D modeling so it is not uncommon to bounce back and forth between the PATCH and other modeling workspaces. 

*The detail information will coming soon in another case*

#### MESH
Using the MESH workspace, you can repair and remesh mesh bodies. This workspace must be enabled in the Preview section of the Preferences dialog. A mesh body is a representation of a solid volume using many short line segments arranged in triangles or quadrilaterals to form the faces. Use meshes for 3D printing. You can also manipulate meshed bodies in the SCULPT workspace.
*The detail information will coming soon in another case*

#### RENDER
The RENDER workspace is used to generate realistic pictures of your designs. Using capabilities like lighting and adding decals, you can show your design as if it were already a live prototype. 
*The detail information will coming soon in another case*

#### ANIMATION
The ANIMATION workspace provides tools for creating videos. Easily share your videos to communicate your design features and functionality. Videos provide needed insight about your designs and can assist others in understanding and evaluating them. 
*The detail information will coming soon in another case*

#### SIMULATION
The SIMULATION workspace allows you to use finite element analysis to simulate how the design performs under various loads and conditions. Understanding the physical limitations of your design (with regard to stress and temperature) is invaluable. Knowing if a design is in danger of failure, or is possibly over-engineered, helps you to make informed decisions about design changes. Creating a more efficient and better design on the first manufacturing pass is always a good idea. Simulation can also minimize or eliminate the necessity of building prototypes and performing destructive testing. 
*The detail information will coming soon in another case*


#### CAM
When the time comes to take your design from digital to fabricated, take advantage of Computer-Aided Manufacturing capabilities in the CAM workspace. You can produce toolpath strategies for fabricating your designs. Export your toolpaths to CNC (Computer Numerically Controlled) machines to make your design a reality.


***
#### Attachment design data
fusion 360 data:[Assemble](http://a360.co/2szsiZC),[Sheet1](http://a360.co/2C8J7yH),[Sheet2](http://a360.co/2sIUJEM),[Sheet3](http://a360.co/2GqtnoM),[Sheet4](http://a360.co/2sFJOeU),[Sheet5](http://a360.co/2G8PvUs),[Sheet6](http://a360.co/2BCFVdy)


## Reference

*  [Official guidebook](http://help.autodesk.com/view/fusion360/ENU/?guid=GUID-E689F85B-0593-44CD-B4AB-0CB438F34365) introduce all command(function and application) one by one;
* [Fusion 360 Tutorials](https://www.autodesk.com/products/fusion-360/get-started?mktvar004=737433&internalc=true) has some basic official video for reference.More detail in [Youtube](https://www.youtube.com/user/AutodeskFusion360);
* [Gallery](https://gallery.autodesk.com/fusion360/projects#filters=%5B%5D&sort=popularity) will push some open project shared by fusion 360 designer 
* [Roadmap](https://www.autodesk.com/products/fusion-360/blog/category/roadmap/) will introduce the update plan
* [fusion-production](https://www.autodesk.com/products/fusion-production/overview) combines production scheduling, job tracking, and machine monitoring by using cloud computing and the Industrial Internet of Things (IIoT) for smart manufacturing.
* [Autodesk App store](https://apps.autodesk.com/FUSION/en/Home/Index) for special requirement
* [Fusion 360 API guide](http://help.autodesk.com/view/fusion360/ENU/?guid=GUID-A92A4B10-3781-4925-94C6-47DA85A4F65A) will give guide for fusion developer







