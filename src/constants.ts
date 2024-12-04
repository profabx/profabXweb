import type { NavItemProps } from "./type";

// 金属数据 V2
const NewtMetallicMaterialsData = [
  { label: "铁/钢", color: "#C8E709", href: "/" },
  { label: "铝/合金", color: "#E3E709", href: "/" },
  {
    label: "铜/合金",
    color: "#E7D109",
    href: "/",
  },

  { label: "钛/合金", color: "#E7D109", href: "/" },
];

// 非金属数据 V2
const NewtNonMetallicMaterialsData = [
  { label: "石英", color: "#17F47D", href: "/" },
  { label: "PC", color: "#17F47D", href: "/" },
  {
    label: "PP",
    color: "#17F4DA",
    href: "/",
  },

  { label: "peek", color: "#1F6ADC", href: "/" },
  { label: "树脂", color: "#8CE21F", href: "/" },
  { label: "TPU", color: "#2320A4", href: "/" },
  { label: "尼龙", color: "#0C0B13", href: "/" },
  { label: "ABS", color: "#A5A3AE", href: "/" },
];

// 表格数据
const TableData = [
  {
    title: "FDM",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(1),
    right: NewtMetallicMaterialsData.slice(0, 1),
  },
  {
    title: "SLA",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 2),
    right: [],
  },
  {
    title: "LCD/DLP",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 1),
    right: [],
  },
  {
    title: "SLS",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 3),
    right: [],
  },
  {
    title: "MJF",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 2),
    right: NewtMetallicMaterialsData.slice(0, 2),
  },
  {
    title: "SLM",
    color: "#ffffff",
    left: [],
    right: NewtMetallicMaterialsData.slice(0, 4),
  },
  {
    title: "Polyjet",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 1),
    right: [],
  },
  {
    title: "CNC",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData,
    right: NewtMetallicMaterialsData,
  },
  {
    title: "铣",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData,
    right: NewtMetallicMaterialsData,
  },
  {
    title: "车",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData,
    right: NewtMetallicMaterialsData,
  },
  {
    title: "激光切割",
    color: "#ffffff",
    left: [],
    right: NewtMetallicMaterialsData.slice(0, 2),
  },
  {
    title: "注塑",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData,
    right: [],
  },
  {
    title: "硅胶覆膜",
    color: "#ffffff",
    left: NewtNonMetallicMaterialsData.slice(0, 2),
    right: [],
  },
  {
    title: "钣金",
    color: "#ffffff",
    left: [],
    right: NewtMetallicMaterialsData.slice(0, 2),
  },
];

// 侧边菜单项 - Fab
const FabMenuItems = [
  {
    label: "NexMaker Fab 实验室",
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
    label: "AGV 教育方案",
    link: "/agvedu/agv",
    labelEn: "AGV",
    translations: {
      en: "AGV",
    },
    linkEn: "/en/agvedu/agv",
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
    labelEn: "Metal",
    translations: {
      en: "Metal",
    },
    collapsed: true,
    items: [
      //AL
      {
        label: "铝",
        link: "/prototype/al",
        linkEn: "/en/prototype/alen",
        labelEn: "Aluminum",
        translations: {
          en: "Aluminum",
        },
        attrs: { id: "prototype" },
      },
 
      //ALEND CU BEGIN
      {
        label: "铜",
        link: "/prototype/inorganic",
        linkEn: "/en/prototype/inorganic",
        labelEn: "Inorganic",
        translations: {
          en: "inorganic",
        },
        attrs: { id: "prototype" },
      },
      //CU END
      {
        label: "铁/钢",
        labelEn: "polymers",
        translations: {
          en: "polymers",
        },
        link: "/prototype/polymers",
        linkEn: "/en/prototype/polymers",
        attrs: { id: "prototype" },
      },
      {
        label: "钛",
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

  //ploymer
  {
    label: "塑料",
    labelEn: "metal",
    translations: {
      en: "material",
    },
    collapsed: true,
    items: [
      {
        label: "ABS",
        link: "/prototype/metall",
        linkEn: "/en/prototype/metall",
        labelEn: "metall",
        translations: {
          en: "metall",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PP",
        link: "/prototype/inorganic",
        linkEn: "/en/prototype/inorganic",
        labelEn: "inorganic",
        translations: {
          en: "inorganic",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PC",
        labelEn: "polymers",
        translations: {
          en: "polymers",
        },
        link: "/prototype/polymers",
        linkEn: "/en/prototype/polymers",
        attrs: { id: "prototype" },
      },
      {
        label: "POM",
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
  //cerma
  {
    label: "陶瓷材料",
    labelEn: "material",
    translations: {
      en: "material",
    },
    collapsed: true,
    items: [
      {
        label: "陶瓷",
        link: "/prototype/metall",
        linkEn: "/en/prototype/metall",
        labelEn: "metall",
        translations: {
          en: "metall",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "玻璃",
        link: "/prototype/inorganic",
        linkEn: "/en/prototype/inorganic",
        labelEn: "inorganic",
        translations: {
          en: "inorganic",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "石英",
        labelEn: "polymers",
        translations: {
          en: "polymers",
        },
        link: "/prototype/polymers",
        linkEn: "/en/prototype/polymers",
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
    labelEn: "material",
    translations: {
      en: "material",
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
        link: "/prototype/polishing",
        linkEn: "/en/prototype/polishing",
        labelEn: "polishing",
        translations: {
          en: "polishing",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "喷漆",
        link: "/prototype/paint",
        linkEn: "/en/prototype/paint",
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
        link: "/prototype/heat-treatment",
        linkEn: "/en/prototype/heat-treatment",
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
    label: "参数定义",
    link: "/agvedu/parameters",
    labelEn: "parameters",
    translations: {
      en: "parameters",
    },
    linkEn: "/en/agvedu/parameters",
    attrs: { id: "agv" },
  },
  {
    label: "电控",
    link: "/agvedu/eee",
    labelEn: "eee",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/eee",
    attrs: { id: "agv" },
  },
  {
    label: "算法",
    link: "/agvedu/algorithm",
    labelEn: "algorithm",
    translations: {
      en: "algorithm",
    },
    linkEn: "/en/agvedu/algorithm",
    attrs: { id: "agv" },
  },
  {
    label: "结构",
    link: "/agvedu/me",
    translations: {
      en: "me",
    },
    linkEn: "/en/agvedu/me",
    attrs: { id: "agv" },
  },
  {
    label: "调试",
    link: "/agvedu/debug",
    labelEn: "debug",
    translations: {
      en: "debug",
    },
    linkEn: "/en/agvedu/debug",
    attrs: { id: "agv" },
  },
  {
    label: "认证",
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
  {
    key: "fab",
    label: "Fab 课程方案",
    labelEn: "Fab",
    link: "/fab/fab",
    linkEn: "/en/fab/fab",
    items: FabMenuItems,
  },
  {
    key: "prototype",
    label: "工程样机开发",
    labelEn: "prototype",
    link: "/prototype",
    linkEn: "/en/prototype",
    items: [
      {
        label: "材料",
        link: "/prototype/metall",
        labelEn: "Metall",
        translations: {
          en: "Metall",
        },
        linkEn: "/en/prototype/metall",
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
    ],
  },
  {
    key: "explore",
    label: "探索",
    labelEn: "explore",
    items: [
      {
        label: "NexMaker Fab 实验室",
        labelEn: "NexMaker Fab",
        link: "/explore/readme",
        linkEn: "/en/explore/readme",
      },
      {
        label: "沙盘",
        labelEn: "sandtable",
        link: "/sandtable/sandtable",
        linkEn: "/en/sandtable/sandtable",
      },
      {
        label: "AGV",
        labelEn: "AGV",
        link: "/agvedu/agvcase",
        linkEn: "/en/agvedu/agvcase",
      },
      {
        label: "文章",
        labelEn: "readme",
        link: "/explore/readme",
        linkEn: "/en/explore/readme",
      },
    ],
  },
  {
    key: "prototype",
    label: "关于 ProFabX",
    labelEn: "anbout ProFabX",
    link: "/about/introduce",
    linkEn: "/en/about/introduce",
  },
];

export { MenuData, SideBarData, TableData };
