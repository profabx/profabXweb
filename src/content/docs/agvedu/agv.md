---
title: 汽车场景实验室
sidebar:
  attrs: { id: agv }
---
![](https://nexmaker-profabx.oss-cn-hangzhou.aliyuncs.com/img/henosv2.001.png)

随着时代发展，陆地交通工具随着时代的发展不停迭代，从最早的徒步行走，到动物驱动（马车，狗拉雪橇等）；从蒸汽火车，到燃油汽车，从电车汽车到智能汽车，一步一个脚印。
我们在交通工具方面专注车辆教具的开发，用于平时车辆设计、课程学习和科研需求。在此基础上我希望和大家探讨未来的出行方式：无人驾驶，智慧交通，移动空间……为行业应用开发储备行业认知。以下为我们涉及的一些项目。
* [车辆参数化生成工具](https://profabx.com/agvedu/agvplatform/)：使用threejs/vue结合Autodesk APS/Autodesk fusion 360 API等前后端技术，实现简洁高效的设计工作，从而推动设计项目快速迭代。目前可以实现不同尺寸快速更新，同时3D数据是可编辑数据。此工具可以可以用协助开发智能小车套件，仿真套件，滑板底盘，交通工具模拟器；
* [智能小车教育套件](https://profabx.com/agvedu/agvkit/)：小车分为底盘和功能平台。底盘数据设计使用[车辆参数化生成工具](https://profabx.com/agvedu/agvplatform/)，使用FabLab工程中心进行加工调试，形成基础的底盘，底盘的控制部分含树莓派、ROS，传感输入（摄像头、IMU）,输出（驱动电机、转向电机）和预留接口，在此做基础计算的同时可以做小模型计算。功能平台预留给开发者做具体功能开发；
* [CMF实验室](https://profabx.com/agvedu/cmf/):根据数字制造经验和专业的CMF经验，给出车辆相关专业的人机交互方式和评估建议；
* [仿真套件](https://profabx.com/agvedu/simulatorlab/):通过新能源汽车动力的总成仿真实验室，进行车辆的在环检查和相关的实验；
* [滑板底盘](https://profabx.com/agvedu/henosv/):得到客户定制需求后（结构参数，负载，传感方案，动力性能方案），使用[车辆参数化生成工具](https://profabx.com/agvedu/agvplatform/)，同时在团队的FabLab工程中心快速实现开发和加工，高效定制车辆；
* [交通工具模拟器](https://profabx.com/agvedu/simulator/)：主要在科研端，使用交通工具模拟器，进行无人驾驶模拟，人机交互探索，传感方案等。

