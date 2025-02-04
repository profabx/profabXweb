import type { NavItemProps } from "./type";

// 侧边菜单项 - Fab
const FabMenuItems = [
  {
    label: "NexMaker Fab 课程",
    link: "https://www.nexmaker.com/",
    labelEn: "NexMaker Fab",
    translations: {
      en: "NexMaker Fab",
    },
    linkEn: "https://www.nexmaker.com/",
    attrs: { id: "fab" },
  },
  {
    label: "Fab 实验室",
    link: "/lab/lab",
    labelEn: "Fab",
    translations: {
      en: "Fab",
    },
    linkEn: "/en/lab/lab",
    attrs: { id: "fab" },
  },
  {
    label: "Fab Academy",
    link: "http://fabacademy.org/",
    labelEn: "Fab Academy",
    translations: {
      en: "Fab Academy",
    },
    linkEn: "http://fabacademy.org/",
    attrs: { id: "fab" },
  },
  {
    label: "MIT Fab Lab 认证",
    link: "https://www.fablabs.io/",
    labelEn: "MIT Fab Lab",
    translations: {
      en: "MIT Fab Lab",
    },
    linkEn: "https://www.fablabs.io/",
    attrs: { id: "fab" },
  },
];

// 侧边栏菜单项 - Prototype
const PrototypeMenuItems = [
  //shu
  {
    label: "说明",
    link: "/prototype/about",
    labelEn: "About",
    translations: {
      en: "About",
    },
    linkEn: "/en/prototype/about",
    attrs: { id: "prototype" },
  },
  {
    label: "金属",
    //link: "/prototype/metal",
    labelEn: "Metal",
    //linkEn: "/en/prototype/material/metal/metal",
    translations: {
      en: "Metal",
    },
    collapsed: true,
    items: [
      //AL
      {
        label: "铝",
        link: "/prototype/al",
        linkEn: "/en/prototype/al",
        labelEn: "Aluminum",
        translations: {
          en: "Aluminum",
        },
        attrs: { id: "prototype" },
      },

      //ALEND CU BEGIN
      {
        label: "铜",
        link: "/prototype/cu",
        linkEn: "/en/prototype/cu",
        labelEn: "Copper",
        translations: {
          en: "Copper",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "铁/钢",
        link: "/prototype/ss",
        linkEn: "/en/prototype/ss",
        labelEn: "Iron/Steel",
        translations: {
          en: "Iron/Steel",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "钛",
        link: "/prototype/ti",
        linkEn: "/en/prototype/ti",
        labelEn: "Titanium",
        translations: {
          en: "Titanium",
        },
        attrs: { id: "prototype" },
      },
    ],
  },
  //塑料
  {
    label: "塑料",
    labelEn: "Polymers",
    translations: {
      en: "Polymers",
    },
    collapsed: true,
    items: [
      {
        label: "ABS",
        link: "/prototype/abs",
        linkEn: "/en/prototype/abs",
        labelEn: "ABS",
        translations: {
          en: "ABS",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "尼龙",
        link: "/prototype/pa",
        linkEn: "/en/prototype/pa",
        labelEn: "PA",
        translations: {
          en: "PA",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "尼龙玻纤",
        link: "/prototype/pagf",
        linkEn: "/en/prototype/gb",
        labelEn: "PA-GF",
        translations: {
          en: "PA-GF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "尼龙碳纤维",
        link: "/prototype/pacf",
        linkEn: "/en/prototype/pacf",
        labelEn: "PA-CF",
        translations: {
          en: "PA-CF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PLA",
        link: "/prototype/pla",
        linkEn: "/en/prototype/pla",
        labelEn: "PLA",
        translations: {
          en: "PLA",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "POM",
        link: "/prototype/pom",
        linkEn: "/en/prototype/pom",
        labelEn: "POM",
        translations: {
          en: "POM",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PP",
        link: "/prototype/pp",
        linkEn: "/en/prototype/pp",
        labelEn: "PP",
        translations: {
          en: "PP",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "树脂",
        link: "/prototype/resin",
        linkEn: "/en/prototype/resin",
        labelEn: "Resin",
        translations: {
          en: "Resin",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "TPU",
        link: "/prototype/tpu",
        linkEn: "/en/prototype/tpu",
        labelEn: "TPU",
        translations: {
          en: "TPU",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PC",
        link: "/prototype/pc",
        linkEn: "/en/prototype/pc",
        labelEn: "PC",
        translations: {
          en: "PC",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PEEK",
        link: "/prototype/peek",
        linkEn: "/en/prototype/peek",
        labelEn: "PEEK",
        translations: {
          en: "PEEK",
        },
        attrs: { id: "prototype" },
      },
    ],
  },
  //cerma
  {
    label: "陶瓷材料",
    labelEn: "Ceramics",
    translations: {
      en: "Ceramics",
    },
    collapsed: true,
    items: [
      {
        label: "陶瓷",
        link: "/prototype/ceramics",
        linkEn: "/en/prototype/ceramics",
        labelEn: "Ceramics",
        translations: {
          en: "Ceramics",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "玻璃",
        link: "/prototype/glass",
        linkEn: "/en/prototype/glass",
        labelEn: "Glass",
        translations: {
          en: "Glass",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "复合材料",
        labelEn: "composites",
        translations: {
          en: "composites",
        },
        link: "/prototype/composites",
        linkEn: "/en/prototype/composites",
        attrs: { id: "prototype" },
      },
    ],
  },
  //componsites
  {
    label: "复合材料",
    labelEn: "Composites",
    translations: {
      en: "composites",
    },
    collapsed: true,
    items: [
      {
        label: "碳纤维",
        link: "/prototype/metall",
        linkEn: "/en/prototype/metall",
        labelEn: "metall",
        translations: {
          en: "metall",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "玻璃纤维",
        link: "/prototype/inorganic",
        linkEn: "/en/prototype/inorganic",
        labelEn: "inorganic",
        translations: {
          en: "inorganic",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "陶瓷基树脂",
        labelEn: "polymers",
        translations: {
          en: "polymers",
        },
        link: "/prototype/polymers",
        linkEn: "/en/prototype/polymers",
        attrs: { id: "prototype" },
      },
      {
        label: "待定",
        labelEn: "composites",
        translations: {
          en: "composites",
        },
        link: "/prototype/composites",
        linkEn: "/en/prototype/composites",
        attrs: { id: "prototype" },
      },
    ],
  },

  {
    label: "制造工艺",
    labelEn: "manufacture",
    translations: {
      en: "manufacture",
    },
    collapsed: true,
    items: [
      {
        label: "增材制造",
        link: "/prototype/add",
        linkEn: "/en/prototype/add",
        labelEn: "add",
        translations: {
          en: "add",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "增材制造-SLA",
        link: "/prototype/sla",
        linkEn: "/en/prototype/sla",
        labelEn: "sla",
        translations: {
          en: "sla",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "等材制造",
        link: "/prototype/equal",
        linkEn: "/en/prototype/equal",
        labelEn: "equal",
        translations: {
          en: "equal",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "减材制造",
        labelEn: "cnc",
        translations: {
          en: "cnc",
        },
        link: "/prototype/cnc",
        linkEn: "/en/prototype/cnc",
        attrs: { id: "prototype" },
      },
    ],
  },
  {
    label: "后处理",
    labelEn: "Post-processing",
    translations: {
      en: "Post-processing",
    },
    collapsed: true,
    items: [
      {
        label: "打磨",
        link: "/postprocess/polishing",
        linkEn: "/en/postprocess/polishing",
        labelEn: "polishing",
        translations: {
          en: "polishing",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "喷漆",
        link: "/postprocess/paint",
        linkEn: "/en/postprocess/paint",
        labelEn: "paint",
        translations: {
          en: "paint",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "热处理",
        labelEn: "heat-treatment",
        translations: {
          en: "heat-treatment",
        },
        link: "/postprocess/heat-treatment",
        linkEn: "/en/postprocess/heat-treatment",
        attrs: { id: "prototype" },
      },
      {
        label: "金属后处理",
        labelEn: "Metal-post-processing",
        translations: {
          en: "Metal post processing",
        },
        link: "/postprocess/metalpost",
        linkEn: "/en/postprocess/metalpost",
        attrs: { id: "prototype" },
      },
    ],
  },
  {
    label: "测试",
    labelEn: "Test",
    translations: {
      en: "Test",
    },
    collapsed: true,
    items: [
      {
        label: "硬度",
        link: "/prototype/hardness",
        linkEn: "/en/prototype/hardness",
        labelEn: "Hardness",
        translations: {
          en: "Hardness",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "IP 等级",
        link: "/prototype/ip-level",
        linkEn: "/en/prototype/ip-level",
        labelEn: "IP Level",
        translations: {
          en: "IP Level",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "耐温",
        labelEn: "Temperature Resistant",
        translations: {
          en: "Temperature Resistant",
        },
        link: "/prototype/temperature-resistant",
        linkEn: "/en/prototype/temperature-resistant",
        attrs: { id: "prototype" },
      },
    ],
  },
  {
    label: "数字沙盘",
    labelEn: "digital sandtable",
    link: "/prototype/sandtable",
    linkEn: "/en/prototype/sandtable",
    translations: {
      en: "digital sandtabl",
    },
    attrs: { id: "prototype" },
  },
];

// 侧边菜单项 - Sandtable
const SandtableMenuItems = [
  {
    label: "效果",
    link: "/sandtable/sandtable",
    labelEn: "effect",
    translations: {
      en: "effect",
    },
    linkEn: "/en/sandtable/sandtable",
    attrs: { id: "sandtable" },
  },
  {
    label: "加工",
    link: "/sandtable/manufacure",
    labelEn: "processing",
    translations: {
      en: "processing",
    },
    linkEn: "/en/sandtable/manufacure",
    attrs: { id: "sandtable" },
  },
  {
    label: "电控",
    link: "/sandtable/control",
    labelEn: "control",
    translations: {
      en: "control",
    },
    linkEn: "/en/sandtable/control",
    attrs: { id: "sandtable" },
  },
  {
    label: "数字化",
    link: "/sandtable/digital",
    labelEn: "digital",
    translations: {
      en: "digital",
    },
    linkEn: "/en/sandtable/digital",
    attrs: { id: "sandtable" },
  },
  {
    label: "维护与升级",
    link: "/sandtable/maintain",
    labelEn: "maintain",
    translations: {
      en: "maintain",
    },
    linkEn: "/en/sandtable/maintain",
    attrs: { id: "sandtable" },
  },
];

// 侧边菜单项 - AGV
const AGVMenuItems = [
  {
    label: "汽车场景实验室概况",
    link: "/agvedu/agv",
    labelEn: "AGV edu",
    translations: {
      en: "parameters",
    },
    linkEn: "/en/agvedu/agv",
    attrs: { id: "agv" },
  },
  {
    label: "概念与趋势",
    link: "/agvedu/basic",
    labelEn: "basic",
    translations: {
      en: "basic",
    },
    linkEn: "/en/agvedu/basic",
    attrs: { id: "agv" },
  },

  {
    label: "小车平台",
    link: "/agvedu/agvplatform",
    labelEn: "AGV edu",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/agvplatform",
    attrs: { id: "agv" },
  },
  {
    label: "模拟器",
    link: "/agvedu/simulator",
    labelEn: "agvsimulator",
    translations: {
      en: "algorithm",
    },
    linkEn: "/en/agvedu/simulator",
    attrs: { id: "agv" },
  },
  {
    label: "HenOSV",
    link: "/agvedu/henosv",
    translations: {
      en: "henosv",
    },
    linkEn: "/en/agvedu/henosv",
    attrs: { id: "agv" },
  },
  {
    label: "AGV Case",
    link: "/agvedu/agvcase",
    translations: {
      en: "agvcase",
    },
    linkEn: "/en/agvedu/agvcase",
    attrs: { id: "agv" },
  },

  {
    label: "行业标准",
    link: "/agvedu/authentication",
    labelEn: "authentication",
    translations: {
      en: "authentication",
    },
    linkEn: "/en/agvedu/authentication",
    attrs: { id: "agv" },
  },
];

// 侧边菜单项 - About
const AboutItems = [
  // /about/aim
  {
    label: "目标",
    link: "/about/aim",
    labelEn: "aim",
    translations: {
      en: "aim",
    },
    linkEn: "/en/about/aim",
    attrs: { id: "about" },
  },
  //
  {
    label: "团队",
    link: "/about/team",
    labelEn: "team",
    translations: {
      en: "team",
    },
    linkEn: "/en/about/team",
    attrs: { id: "about" },
  },

  {
    label: "联系方式",
    link: "/about/contact",
    labelEn: "contact",
    translations: {
      en: "team",
    },
    linkEn: "/en/about/contact",
    attrs: { id: "about" },
  },
  {
    label: "加入我们",
    //link: "/about/add",
    labelEn: "joinus",
    //linkEn: "/en/about/add",
    translations: {
      en: "joinus",
    },
    collapsed: true,

    items: [
      {
        label: "工艺工程师(3D打印方向)",
        link: "/about/3dprinting",
        linkEn: "/en/about/3dprinting",
        labelEn: "Process Engineer (3D Printing)",
        translations: {
          en: "Process Engineer (3D Printing)",
        },
        attrs: { id: "about" },
      },
      {
        label: "工艺工程师(CNC方向)",
        link: "/about/cnc/",
        linkEn: "/en/about/cnc/",
        labelEn: "Process Engineer (CNC)",
        translations: {
          en: "Process Engineer (CNC)",
        },
        attrs: { id: "about" },
      },
      {
        label: "CMF设计师",
        link: "/about/cmf/",
        linkEn: "/en/about/cmf/",
        labelEn: "CMF designer",
        translations: {
          en: "CMF designer",
        },
        attrs: { id: "about" },
      },
      {
        label: "车辆结构工程师",
        link: "/about/vehicle/",
        linkEn: "/en/about/vehicle/",
        labelEn: "vehicle engineer",
        translations: {
          en: "vehicle engineer",
        },
        attrs: { id: "about" },
      },
      {
        label: "设计仿真平台工程师",
        link: "/about/api/",
        linkEn: "/en/about/api/",
        labelEn: "simulation engineer",
        translations: {
          en: "simulation engineer",
        },
        attrs: { id: "about" },
      },
      {
        label: "机器人工程师（传感方向）",
        link: "/about/sensor/",
        linkEn: "/en/about/sensor/",
        labelEn: "sensor engineer",
        translations: {
          en: "sensor engineer",
        },
        attrs: { id: "about" },
      },
      {
        label: "机器人工程师（动力域）",
        link: "/about/motor/",
        linkEn: "/en/about/motor/",
        labelEn: "motor engineer",
        translations: {
          en: "motor engineer",
        },
        attrs: { id: "about" },
      },
      // ... 其他职位可以继续添加 ...
    ],
  },
];

// 侧边栏菜单
const SideBarData = [
  {
    key: "fab",
    label: "Fab 课程方案",
    translations: {
      en: "fab",
    },
    items: [...FabMenuItems],
  },
  {
    label: "工程样机开发",
    translations: {
      en: "prototype",
    },
    items: [...PrototypeMenuItems],
  },
  {
    id: "sandtable",
    label: "沙盘",
    translations: {
      en: "sandtable",
    },
    items: [...SandtableMenuItems],
  },
  {
    id: "agv",
    label: "agv",
    translations: {
      en: "agv",
    },
    items: [...AGVMenuItems],
  },
  {
    id: "about",
    label: "关于",
    translations: {
      en: "about",
    },
    items: [...AboutItems],
  },
];

// 顶部菜单
const MenuData: NavItemProps[] = [
  //nav-fab
  {
    key: "fab",
    label: "Fab 方案",
    labelEn: "Fab",
    link: "/fab/fab",
    linkEn: "/en/fab/fab",
    items: [
      {
        label: "NexMaker Fab 课程",
        link: "https://www.nexmaker.com/",
        labelEn: "NexMaker Fab",
        translations: {
          en: "NexMaker Fab",
        },
        linkEn: "https://www.nexmaker.com/",
        attrs: { id: "fab" },
      },
      {
        label: "Fab 实验室",
        link: "/lab/lab",
        labelEn: "Fab",
        translations: {
          en: "Fab",
        },
        linkEn: "/en/lab/lab",
        attrs: { id: "fab" },
      },
      {
        label: "Fab Academy",
        link: "http://fabacademy.org/",
        labelEn: "Fab Academy",
        translations: {
          en: "Fab Academy",
        },
        linkEn: "http://fabacademy.org/",
        attrs: { id: "fab" },
      },
      {
        label: "MIT Fab Lab 认证",
        link: "https://www.fablabs.io/",
        labelEn: "MIT Fab Lab",
        translations: {
          en: "MIT Fab Lab",
        },
        linkEn: "https://www.fablabs.io/",
        attrs: { id: "fab" },
      },
      {
        label: "探索 Fab",
        link: "/lab/explorefab",
        labelEn: "Explore Fab",
        linkEn: "/en/lab/explorefab",
        translations: {
          en: "Explore Fab",
        },
        attrs: { id: "fab" },
      },
    ],
  },
  //nav-prototype
  {
    key: "prototype",
    label: "数字制造",
    labelEn: "digital fabrication",
    link: "/prototype",
    linkEn: "/en/prototype",
    items: [
      {
        label: "材料",
        link: "/prototype/metal",
        labelEn: "Metal",
        translations: {
          en: "Metall",
        },
        linkEn: "/en/prototype/metal",
        attrs: { id: "prototype" },
      },
      {
        label: "制造工艺",
        labelEn: "manufacture",
        link: "/prototype/add",
        linkEn: "/en/prototype/add",
        translations: {
          en: "manufacture",
        },
      },
      {
        label: "后处理",
        labelEn: "Post-processing",
        link: "/prototype/polishing",
        linkEn: "/en/prototype/polishing",
        translations: {
          en: "Post-processing",
        },
      },
      {
        label: "测试",
        labelEn: "Test",
        link: "/prototype/hardness",
        linkEn: "/en/prototype/hardness",
        translations: {
          en: "test",
        },
      },
      {
        label: "数字沙盘",
        labelEn: "digital sandtable",
        link: "/prototype/sandtable",
        linkEn: "/en/prototype/sandtable",
        translations: {
          en: "digital sandtabl",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "探索数字制造",
        labelEn: "explore digital fabrication",
        link: "/prototype/exploredigitalfabrication",
        linkEn: "/en/prototype/exploredigitalfabrication",
        translations: {
          en: "exploredigitalfabrication",
        },
      },
    ],
  },
  //nav-traffic
  {
    key: "traffic",
    label: "未来交通",
    labelEn: "futuretraffic",
    link: "/agvedu/agv",
    linkEn: "/en/agvedu/agv",
    items: [
      {
        label: "汽车场景实验室",
        labelEn: "AGV edu",
        link: "/agvedu/agv",
        linkEn: "/en/agvedu/agv",
      },
      {
        label: "小车平台",
        labelEn: "AGV edu",
        link: "/agvedu/agvplatform",
        linkEn: "/en/agvedu/agvplatform",
      },
      {
        label: "模拟器",
        labelEn: "agvsimulator",
        link: "/agvedu/simulator",
        linkEn: "/en/agvedu/simulator",
      },
      {
        label: "HenOSV",
        labelEn: "HenOSV",
        link: "/agvedu/henosv",
        linkEn: "/en/agvedu/henosv",
      },
      {
        label: "探索未来出行",
        labelEn: "Explore future traffic",
        link: "/agvedu/exploretraffic",
        linkEn: "/en/agvedu/exploretraffic",
      },
    ],
  },

  //nav-about
  {
    key: "prototype",
    label: "关于 ProFabX",
    labelEn: "About ProFabX",
    link: "/about/introduce",
    linkEn: "/en/about/introduce",
  },
];

export { MenuData, SideBarData };
