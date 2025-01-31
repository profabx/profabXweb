import type { NavItemProps } from "./type";

// 定义材料类型
//interface MaterialItem {
//  label: string;
//  color: string;
//  href: string;
//}
// 改造成多语言写法
interface MaterialItem {
  label: {
    zh: string;
    en: string;
  };
  color: string;
  href: {
    zh: string;
    en: string;
  };
}


// 金属数据 V2 - 多语言
export const NewtMetallicMaterialsData: Record<string, MaterialItem> = {
  "铁/钢": {
    label: {
      zh: "铁/钢",
      en: "Iron/Steel",
    },
    color: "#C8E709",
    href: {
      zh: "/prototype/ss",
      en: "/en/prototype/ss",
    },
  },
  "铝/合金": {
    label: {
      zh: "铝/合金",
      en: "Aluminum/Alloy",
    },
    color: "#E3E709",
    href: {
      zh: "/prototype/al",
      en: "/en/prototype/al",
    },
  },
  "铜/合金": {
    label: {
      zh: "铜/合金",
      en: "Copper/Alloy",
    },
    color: "#E7D109",
    href: {
      zh: "/prototype/cu",
      en: "/en/prototype/cu",
    },
  },
  "钛/合金": {
    label: {
      zh: "钛/合金",
      en: "Titanium/Alloy",
    },
    color: "#E7D109",
    href: {
      zh: "/prototype/ti",
      en: "/en/prototype/ti",
    },
  },
};

// 非金属数据 V2 - 多语言
export const NewtNonMetallicMaterialsData: Record<string, MaterialItem> = {
  "石英": {
    label: {
      zh: "石英",
      en: "Quartz",
    },
    color: "#17F47D",
    href: {
      zh: "/prototype/quartz",
      en: "/en/prototype/quartz",
    },
  },
  "PC": {
    label: {
      zh: "PC",
      en: "PC",
    },
    color: "#17F47D",
    href: {
      zh: "/prototype/pc",
      en: "/en/prototype/pc",
    },
  },
  "PP": {
    label: {
      zh: "PP",
      en: "PP",
    },
    color: "#17F4DA",
    href: {
      zh: "/prototype/pp",
      en: "/en/prototype/pp",
    },
  },
  "peek": {
    label: {
      zh: "peek",
      en: "PEEK",
    },
    color: "#1F6ADC",
    href: {
      zh: "/prototype/peek",
      en: "/en/prototype/peek",
    },
  },
  "树脂": {
    label: {
      zh: "树脂",
      en: "Resin",
    },
    color: "#8CE21F",
    href: {
      zh: "/prototype/resin",
      en: "/en/prototype/resin",
    },
  },
  "TPU": {
    label: {
      zh: "TPU",
      en: "TPU",
    },
    color: "#2320A4",
    href: {
      zh: "/prototype/tpu",
      en: "/en/prototype/tpu",
    },
  },
  "尼龙": {
    label: {
      zh: "尼龙",
      en: "Nylon",
    },
    color: "#0C0B13",
    href: {
      zh: "/prototype/nylon",
      en: "/en/prototype/nylon",
    },
  },
  "ABS": {
    label: {
      zh: "ABS",
      en: "ABS",
    },
    color: "#A5A3AE",
    href: {
      zh: "/prototype/abs",
      en: "/en/prototype/abs",
    },
  },
};

// 给表格行一个接口（可选）
interface TableRow {
  title: {
    zh: string;
    en: string;
  };
  color: string;
  left: MaterialItem[];
  right: MaterialItem[];
}

export const TableData: TableRow[] = [
  {
    title: { zh: "SLA", en: "SLA" },
    color: "#E7D109",
    left: [NewtNonMetallicMaterialsData["石英"], NewtNonMetallicMaterialsData["PC"]],
    right: [],
  },
  {
    title: { zh: "FDM", en: "FDM" },
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["树脂"],
    ],
    right: [NewtMetallicMaterialsData["铁/钢"]],
  },
  // ...
  {
    title: { zh: "数控加工", en: "CNC Machining" },
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      /* ... */
    ],
    right: [
      NewtMetallicMaterialsData["铁/钢"],
      /* ... */
    ],
  },
  // ...
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
    labelEn: "material",
    translations: {
      en: "material",
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
