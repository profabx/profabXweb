type NavItemBasicProps = {
  key: string;
  label: string;
  labelEn?: string;
  link?: string;
  linkEn?: string;
};

type NavItemProps = {
  items?: any[];
} & NavItemBasicProps;

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
  {
    label: "材料",
    link: "/prototype/material",
    labelEn: "material",
    translations: {
      en: "material",
    },
    linkEn: "/en/prototype/material",
    attrs: { id: "prototype" },
  },
  //材料
  {
    label: "材料",
    labelEn: "manufacture",
    translations: {
      en: "manufacture",
    },
    items: [
      

      {
        label: "金属",
        link: "/prototype/add",
        linkEn: "/en/prototype/add",
        labelEn: "add",
        translations: {
          en: "add",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "无机非金属材料",
        link: "/prototype/equal",
        linkEn: "/en/prototype/equal",
        labelEn: "equal",
        translations: {
          en: "equal",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "高分子材料",
        labelEn: "cnc",
        translations: {
          en: "cnc",
        },
        link: "/prototype/cnc",
        linkEn: "/en/prototype/cnc",
        attrs: { id: "prototype" },
      },
      {
        label: "复合材料",
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
    label: "制造工艺测试无链接",
    labelEn: "manufacture",
    translations: {
      en: "manufacture",
    },
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
    link: "/prototype/postprocess",
    labelEn: "postprocess",
    translations: {
      en: "postprocess",
    },
    linkEn: "/en/prototype/postprocess",
    attrs: { id: "prototype" },
  },
  {
    label: "测试",
    link: "/prototype/test",
    labelEn: "test",
    translations: {
      en: "test",
    },
    linkEn: "/en/prototype/test",
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

// 侧边栏侧栏
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
    id: "prototype",
    label: "材料",
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
    items: PrototypeMenuItems,
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
