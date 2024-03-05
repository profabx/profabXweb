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
    labelEn: "NexMaker Fab 实验室",
    link: "https://www.nexmaker.com/",
    linkEn: "https://www.nexmaker.com/",
    attrs: { id: "fab" },
  },
  {
    label: "Fab 实验室",
    labelEn: "Fab 实验室",
    link: "/lab/lab",
    linkEn: "/en/lab/lab",
    attrs: { id: "fab" },
  },
  {
    label: "Fab Academy",
    labelEn: "Fab Academy",
    link: "http://fabacademy.org/",
    linkEn: "http://fabacademy.org/",
    attrs: { id: "fab" },
  },
  {
    label: "MIT Fab Lab 认证",
    labelEn: "MIT Fab Lab 认证",
    link: "https://www.fablabs.io/",
    linkEn: "https://www.fablabs.io/",
    attrs: { id: "fab" },
  },
  {
    label: "AGV 教育方案",
    labelEn: "AGV 教育方案",
    link: "/agvedu/agv",
    linkEn: "/en/agvedu/agv",
    attrs: { id: "fab" },
  },
];

// 侧边菜单项 - Prototype
const PrototypeMenuItems = [
  {
    label: "材料",
    labelEn: "材料",
    link: "/prototype/material",
    linkEn: "/en/prototype/material",
    attrs: { id: "prototype" },
  },
  {
    label: "制造工艺",
    labelEn: "制造工艺",
    items: [
      {
        label: "说明",
        labelEn: "说明",
        link: "/prototype/manufacture",
        attrs: { id: "prototype" },
      },

      {
        label: "增材制造",
        labelEn: "增材制造",
        link: "/prototype/add",
        attrs: { id: "prototype" },
      },
      {
        label: "等材制造",
        labelEn: "等材制造",
        link: "/prototype/equal",
        attrs: { id: "prototype" },
      },
      {
        label: "减材制造",
        labelEn: "减材制造",
        link: "/prototype/cnc",
        attrs: { id: "prototype" },
      },
    ],
    attrs: { id: "prototype" },
  },
  {
    label: "后处理",
    labelEn: "后处理",
    link: "/prototype/postprocess",
    attrs: { id: "prototype" },
  },
  {
    label: "测试",
    labelEn: "测试",
    link: "/prototype/test",
    attrs: { id: "prototype" },
  },
];

// 侧边菜单项 - Sandtable
const SandtableMenuItems = [
  {
    label: "效果",
    labelEn: "效果",
    link: "/sandtable/sandtable",
    linkEn: "/en/sandtable/sandtable",
    attrs: { id: "sandtable" },
  },
  {
    label: "加工",
    labelEn: "加工",
    link: "/sandtable/manufacure",
    linkEn: "/en/sandtable/manufacure",
    attrs: { id: "sandtable" },
  },
  {
    label: "电控",
    labelEn: "电控",
    link: "/sandtable/control",
    linkEn: "/en/sandtable/control",
    attrs: { id: "sandtable" },
  },
  {
    label: "数字化",
    labelEn: "数字化",
    link: "/sandtable/digital",
    linkEn: "/en/sandtable/digital",
    attrs: { id: "sandtable" },
  },
  {
    label: "维护与升级",
    labelEn: "维护与升级",
    link: "/sandtable/maintain",
    linkEn: "/en/sandtable/maintain",
    attrs: { id: "sandtable" },
  },
];

// 侧边菜单项 - AGV
const AGVMenuItems = [
  {
    label: "概念与趋势",
    labelEn: "概念与趋势",
    link: "/agvedu/basic",
    linkEn: "/en/agvedu/basic",
    attrs: { id: "agv" },
  },
  {
    label: "参数定义",
    labelEn: "参数定义",
    link: "/agvedu/parameters",
    linkEn: "/en/agvedu/parameters",
    attrs: { id: "agv" },
  },
  {
    label: "电控",
    labelEn: "电控",
    link: "/agvedu/eee",
    linkEn: "/en/agvedu/eee",
    attrs: { id: "agv" },
  },
  {
    label: "算法",
    labelEn: "算法",
    link: "/agvedu/algorithm",
    linkEn: "/en/agvedu/algorithm",
    attrs: { id: "agv" },
  },
  {
    label: "结构",
    labelEn: "结构",
    link: "/agvedu/me",
    linkEn: "/en/agvedu/me",
    attrs: { id: "agv" },
  },
  {
    label: "调试",
    labelEn: "调试",
    link: "/agvedu/debug",
    linkEn: "/en/agvedu/debug",
    attrs: { id: "agv" },
  },
  {
    label: "认证",
    labelEn: "认证",
    link: "/agvedu/authentication",
    linkEn: "/en/agvedu/authentication",
    attrs: { id: "agv" },
  },
];

// 侧边菜单项 - About
const AboutItems = [
  // /about/aim
  {
    label: "目标",
    labelEn: "目标",
    link: "/about/aim",
    linkEn: "/en/about/aim",
    attrs: { id: "about" },
  },
  //
  {
    label: "团队",
    labelEn: "团队",
    link: "/about/team",
    linkEn: "/en/about/team",
    attrs: { id: "about" },
  },

  {
    label: "联系方式",
    labelEn: "联系方式",
    link: "/about/contact",
    linkEn: "/en/about/contact",
    attrs: { id: "about" },
  },
];

// 顶部菜单
const MenuData = [
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
  },
];

// 侧边栏侧栏
const SideBarData = [
  {
    key: "fab",
    label: "Fab 课程方案",
    labelEn: "Fab 课程方案",
    items: [...FabMenuItems],
  },
  {
    id: "prototype",
    label: "材料",
    labelEn: "材料",
    items: [...PrototypeMenuItems],
  },
  {
    id: "sandtable",
    label: "沙盘",
    labelEn: "沙盘",
    items: [...SandtableMenuItems],
  },
  {
    id: "agv",
    label: "agv",
    labelEn: "agv",
    items: [...AGVMenuItems],
  },
  {
    id: "about",
    label: "关于",
    labelEn: "关于",
    items: [...AboutItems],
  },
];

export { MenuData, SideBarData, TableData };
