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
  {
    label: "探索Fab",
    link: "/fab/explorefab",
    labelEn: "Explore Fab",
    translations: {
      en: "Explore Fab",
    },
    linkEn: "/en/fab/explorefab",
    attrs: { id: "fab" },
  },
  
];

// 侧边栏菜单项 - Prototype
const PrototypeMenuItems = [
//颜色
{
  label: "↓--------颜色--------↓",
  link: "/prototype/colour/colour",
  labelEn: "Colour",
  translations: {
    en: "colour",
  },
  linkEn: "/en/prototype/clour/colour",
  attrs: { id: "prototype" },
},

//材料
  {
    label: "↓--------材料--------↓",
    link: "/prototype/about",
    labelEn: "About",
    translations: {
      en: "About",
    },
    linkEn: "/en/prototype/about",
    attrs: { id: "prototype" },
  },
//金属
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
      {
        label: "铁/钢",
        link: "/prototype/material/metal/ss",
        linkEn: "/en/prototype/material/metal/ss",
        labelEn: "Iron/Steel",
        translations: {
          en: "Iron/Steel",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "铝",
        link: "/prototype/material/metal/al",
        linkEn: "/en/prototype/material/metal/al",
        labelEn: "Aluminum",
        translations: {
          en: "Aluminum",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "铜",
        link: "/prototype/material/metal/cu",
        linkEn: "/en/prototype/material/metal/cu",
        labelEn: "Copper",
        translations: {
          en: "Copper",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "钛",
        link: "/prototype/material/metal/ti",
        linkEn: "/en/prototype/material/metal/ti",
        labelEn: "Titanium",
        translations: {
          en: "Titanium",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "钨",
        link: "/prototype/material/metal/tungsten",
        linkEn: "/en/prototype/material/metal/tungsten",
        labelEn: "Tungsten",
        translations: {
          en: "Tungsten",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "镀锌板",
        link: "/prototype/material/metal/galvanizedsteel",
        linkEn: "/en/prototype/material/metal/galvanizedsteel",
        labelEn: "Galvanized steel",
        translations: {
          en: "galvanizedsteel",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "冷轧板",
        link: "/prototype/material/metal/coldrolled",
        linkEn: "/en/prototype/material/metal/coldrolled",
        labelEn: "Coldrolled",
        translations: {
          en: "coldrolled",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "其他金属",
        link: "/prototype/material/metal/metal",
        linkEn: "/en/prototype/material/metal/metal",
        labelEn: "Other metal",
        translations: {
          en: "other metal",
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
        link: "/prototype/material/polymers/abs",
        linkEn: "/en/prototype/material/polymers/abs",
        labelEn: "ABS",
        translations: {
          en: "ABS",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "尼龙",
        link: "/prototype/material/polymers/pa",
        linkEn: "/en/prototype/material/polymers/pa",
        labelEn: "PA",
        translations: {
          en: "PA",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PLA",
        link: "/prototype/material/polymers/pla",
        linkEn: "/en/prototype/material/polymers/pla",
        labelEn: "PLA",
        translations: {
          en: "PLA",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "POM",
        link: "/prototype/material/polymers/pom",
        linkEn: "/en/prototype/material/polymers/pom",
        labelEn: "POM",
        translations: {
          en: "POM",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PP",
        link: "/prototype/material/polymers/pp",
        linkEn: "/en/prototype/material/polymers/pp",
        labelEn: "PP",
        translations: {
          en: "PP",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "树脂",
        link: "/prototype/material/polymers/resin",
        linkEn: "/en/prototype/material/polymers/resin",
        labelEn: "Resin",
        translations: {
          en: "Resin",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "TPU",
        link: "/prototype/material/polymers/tpu",
        linkEn: "/en/prototype/material/polymers/tpu",
        labelEn: "TPU",
        translations: {
          en: "TPU",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PC",
        link: "/prototype/material/polymers/pc",
        linkEn: "/en/prototype/material/polymers/pc",
        labelEn: "PC",
        translations: {
          en: "PC",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "PEEK",
        link: "/prototype/material/polymers/peek",
        linkEn: "/en/prototype/material/polymers/peek",
        labelEn: "PEEK",
        translations: {
          en: "PEEK",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "亚克力",
        link: "/prototype/material/polymers/acrylic",
        linkEn: "/en/prototype/material/polymers/acrylic",
        labelEn: "Acrylic",
        translations: {
          en: "Acrylic",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "ASA",
        link: "/prototype/material/polymers/asa",
        linkEn: "/en/prototype/material/polymers/asa",
        labelEn: "ASA",
        translations: {
          en: "ASA",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "硅胶",
        link: "/prototype/material/polymers/silicon",
        linkEn: "/en/prototype/material/polymers/silicon",
        labelEn: "Silicon",
        translations: {
          en: "Silicon",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "其他塑料",
        link: "/prototype/material/polymers/polymers",
        linkEn: "/en/prototype/material/polymers/polymers",
        labelEn: "Other polymers",
        translations: {
          en: "Other polymers",
        },
        attrs: { id: "prototype" },
      },
    ],
  },
//ceramics
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
        link: "/prototype/material/ceramics/ceramics",
        linkEn: "/en/prototype/material/ceramics/ceramics",
        labelEn: "Ceramics",
        translations: {
          en: "Ceramics",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "玻璃",
        link: "/prototype/material/ceramics/glass",
        linkEn: "/en/prototype/material/ceramics/glass",
        labelEn: "Glass",
        translations: {
          en: "Glass",
        },
        attrs: { id: "prototype" },
      },

      {
        label: "其他陶瓷材料",
        link: "/prototype/material/ceramics/ceramics",
        linkEn: "/en/prototype/material/ceramics/ceramics",
        labelEn: "Other ceramics",
        translations: {
          en: "Other ceramics",
        },
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
        link: "/prototype/material/composites/cf",
        linkEn: "/en/prototype/material/composites/cf",
        labelEn: "cabon fiber",
        translations: {
          en: "cabon fiber",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "玻璃纤维",
        link: "/prototype/material/composites/gf",
        linkEn: "/en/prototype/material/composites/gf",
        labelEn: "glass fiber",
        translations: {
          en: "Glass gf",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "尼龙玻纤",
        link: "/prototype/material/composites/pagf",
        linkEn: "/en/prototype/material/composites/gb",
        labelEn: "PA-GF",
        translations: {
          en: "PA-GF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "尼龙碳纤维",
        link: "/prototype/material/composites/pacf",
        linkEn: "/en/prototype/material/composites/pacf",
        labelEn: "PA-CF",
        translations: {
          en: "PA-CF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "ABS-GF",
        link: "/prototype/material/composites/absgf",
        linkEn: "/en/prototype/material/composites/absgf",
        labelEn: "ABS-GF",
        translations: {
          en: "ABS-GF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "ABS-PC",
        link: "/prototype/material/composites/abspc",
        linkEn: "/en/prototype/material/composites/abspc",
        labelEn: "ABS-PC",
        translations: {
          en: "ABS-PC",
        },
        attrs: { id: "prototype" },
      },
      
      {
        label: "其他复合材料",
        labelEn: "Composites",
        translations: {
          en: "composites",
        },
        link: "/prototype/material/composites",
        linkEn: "/en/prototype/material/composites",
        attrs: { id: "prototype" },
      },
    ],
  },
  {
    label: "木",
    labelEn: "Wood",
    translations: {
      en: "wood",
    },
  collapsed: true,
  items: [
      {
        label: "胡桃木",
        link: "/prototype/material/wood/walnut",
        linkEn: "/en/prototype/material/composites/walnut",
        labelEn: "Walnut",
        translations: {
          en: "Walnut",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "樱桃木",
        link: "/prototype/material/wood/cherry",
        linkEn: "/en/prototype/material/composites/cherry",
        labelEn: "cherry",
        translations: {
          en: "Cherry",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "胶合板",
        link: "/prototype/material/wood/plywood",
        linkEn: "/en/prototype/material/composites/plywood",
        labelEn: "plywood",
        translations: {
          en: "Cherry",
        },
        attrs: { id: "prototype" },
      },
    ]
  },
//制造工艺
  {
    label: "↓--------制造工艺--------↓",
    link: "/prototype/manufacture",
    labelEn: "Manufacture",
    translations: {
      en: "manufacture",
    },
    linkEn: "/en/prototype/manufacture",
    attrs: { id: "prototype" },
  },
//增材制造 
  {
    label: "增材制造",
    labelEn: "Additive manufature",
    translations: {
      en: "add manufacture",
    },
    collapsed: true,
    items: [ 
      {
        label: "增材制造概况",
        link: "/prototype/manufacture/add/add",
        linkEn: "/en/prototype/manufacture/add/add",
        labelEn: "The condition of add manufacture",
        translations: {
          en: "ADD",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "SLA",
        link: "/prototype/manufacture/add/sla",
        linkEn: "/en/prototype/manufacture/add/sla",
        labelEn: "SLA",
        translations: {
          en: "sla",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "FDM",
        link: "/prototype/manufacture/add/fdm",
        linkEn: "/en/prototype/manufacture/add/fdm",
        labelEn: "FDM",
        translations: {
          en: "FDM",
        },
        attrs: { id: "prototype" },
      },
      //lcd/dlp
      {
        label: "LCD/DLP",
        labelEn: "LCD/DLP",
        translations: {
          en: "LCD/DLP",
        },
        link: "/prototype/manufacture/add/lcddlp",
        linkEn: "/en/prototype/manufacture/add/lcddlp",
        attrs: { id: "prototype" },
      },
      {
        label: "MJF",
        link: "/prototype/manufacture/add/mjf",
        linkEn: "/en/prototype/manufacture/add/mjf",
        labelEn: "MJF",
        translations: {
          en: "MJF",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "SLS",
        link: "/prototype/manufacture/add/sls",
        linkEn: "/en/prototype/manufacture/add/sls",
        labelEn: "SLS",
        translations: {
          en: "SLS,",
        },
        attrs: { id: "prototype" },
      },
      //SLM
      {
        label: "SLM",
        labelEn: "SLM",
        translations: {
          en: "SLM",
        },
        link: "/prototype/manufacture/add/slm",
        linkEn: "/en/prototype/manufacture/add/slm",
        attrs: { id: "prototype" },
      },
        
      {
        label: "Polyjet",
        link: "/prototype/manufacture/add/polyjet",
        linkEn: "/en/prototype/manufacture/add/polyjet",
        labelEn: "Polyjet",
        translations: {
          en: "Polyjet",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "其他增材制造",
        link: "/prototype/manufacture/add/otheradd",
        linkEn: "/en/prototype/manufacture/add/otheradd",
        labelEn: "Other add manufacture",
        translations: {
          en: "Other add manufacture",
        },
        attrs: { id: "prototype" },
      },

    ],
  },
 //等材制造
 {
  label: "等材制造",
  labelEn: "Equal manufature",
  translations: {
    en: "equal manufacture",
  },
  collapsed: true,
  items: [ 
    {
      label: "等材制造概况",
      link: "/prototype/manufacture/equal/equal",
      linkEn: "/en/prototype/manufacture/equal/equal",
      labelEn: "The condition of equal manufacture",
      translations: {
        en: "equal manufacture",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "注塑",
      link: "/prototype/manufacture/equal/injection",
      linkEn: "/en/prototype/manufacture/equal/injection",
      labelEn: "Injection molding",
      translations: {
        en: "injection molding",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "硅胶覆膜",
      link: "/prototype/manufacture/equal/siliconemold",
      linkEn: "/en/prototype/manufacture/equal/siliconemold",
      labelEn: "Silicone molding process",
      translations: {
        en: "Silicone molding proces",
      },
      attrs: { id: "prototype" },
    },
    
    {
      label: "钣金工艺",
      labelEn: "Sheet metal process",
      translations: {
        en: "sheet metal",
      },
      link: "/prototype/manufacture/equal/sheetmetal",
      linkEn: "/en/prototype/manufacture/equal/sheetmetal",
      attrs: { id: "prototype" },
    },
    {
      label: "其他等材制造工艺",
      link: "/prototype/manufacture/equal/otherequal",
      linkEn: "/en/prototype/manufacture/equal/otherequal",
      labelEn: "Other equal manufacture",
      translations: {
        en: "otherequal",
      },
      attrs: { id: "prototype" },
    },
  ],
},
//减材制造
{
  label: "减材制造",
  labelEn: "Substractive manufature",
  translations: {
    en: "Substractive manufature",
  },
  collapsed: true,
  items: [ 
    {
      label: "减材制造概况",
      link: "/prototype/manufacture/substractive/substractive",
      linkEn: "/en/prototype/manufacture/substractive/substractive",
      labelEn: "The condition of substractive manufacture",
      translations: {
        en: "substractive manufacture",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "CNC",
      link: "/prototype/manufacture/substractive/cnc",
      linkEn: "/en/prototype/manufacture/substractive/cnc",
      labelEn: "CNC",
      translations: {
        en: "CNC",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "车",
      link: "/prototype/manufacture/substractive/lathing",
      linkEn: "/en/prototype/manufacture/substractive/lathing",
      labelEn: "lathiing",
      translations: {
        en: "lathing",
      },
      attrs: { id: "prototype" },
    },
    
    {
      label: "铣",
      labelEn: "milling",
      translations: {
        en: "milling",
      },
      link: "/prototype/manufacture/substractive/milling",
      linkEn: "/en/prototype/manufacture/substractive/milling",
      attrs: { id: "prototype" },
    },
    {
      label: "激光切割",
      labelEn: "lasercutter",
      translations: {
        en: "lasercutter",
      },
      link: "/prototype/manufacture/substractive/lasercutter",
      linkEn: "/en/prototype/manufacture/substractive/lasercutter",
      attrs: { id: "prototype" },
    },
    {
      label: "其他减材制造工艺",
      link: "/prototype/manufacture/substractive/othersubstractive",
      linkEn: "/en/prototype/manufacture/substractive/othersubstractive",
      labelEn: "Other substractive manufacture",
      translations: {
        en: "other substractive",
      },
      attrs: { id: "prototype" },
    },
  ],
},
//后处理
{
  label: "↓--------后处理--------↓",
  link: "/prototype/postprocess/postprocess",
  labelEn: "Post process",
  translations: {
    en: "post process",
  },
  linkEn: "/en/prototype/postprocess/postprocess",
  attrs: { id: "prototype" },
},
//表面处理：   - **电镀（Electroplating,阳极氧化（Anodizing）喷涂（Spray Coating）**：如喷漆、喷粉（粉末涂层）。
{
  label: "表面处理",
  labelEn: "Surface treamtment",
  translations: {
    en: "Surface treamtment",
  },
  collapsed: true,
  items: [
    {
      label: "喷涂",
      link: "/prototype/postprocess/surface/coating",
      linkEn: "/en/prototype/postprocess/surface/coating",
      labelEn: "Coat",
      translations: {
        en: "Coat",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "电镀",
      link: "/prototype/postprocess/surface/electroplating",
      linkEn: "/en/prototype/postprocess/surface/electroplating",
      labelEn: "Electroplating",
      translations: {
        en: "electroplating",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "阳极氧化",
      labelEn: "Anodizing",
      translations: {
        en: "Anodizing",
      },
      link: "/prototype/postprocess/surface/anodizing",
      linkEn: "/en/prototype/postprocess/surface/anodizing",
      attrs: { id: "prototype" },
    },
    
  ],
},
//热处理（Heat Treatment）.淬火（Quenching）,回火（Tempering）,退火（Annealing）,正火（Normalizing）,表面硬化
{
  label: "热处理",
  labelEn: "Heat treamtment",
  translations: {
    en: "Heat treamtment",
  },
  collapsed: true,
  items: [
    {
      label: "淬火",
      link: "/prototype/postprocess/heat/quenching",
      linkEn: "/en/prototype/postprocess/heat/quenching",
      labelEn: "Quenching",
      translations: {
        en: "Quenching",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "回火",
      link: "/prototype/postprocess/heat/tempering",
      linkEn: "/en/prototype/postprocess/heat/tempering",
      labelEn: "Tempering",
      translations: {
        en: "Tempering",
      },
      attrs: { id: "prototype" },
    },
    {
      label: "退火",
      labelEn: "Annealing",
      translations: {
        en: "Annealing",
      },
      link: "/prototype/postprocess/heat/annealing",
      linkEn: "/en/prototype/postprocess/heat/annealing",
      attrs: { id: "prototype" },
    },
    {
      label: "正火",
      labelEn: "Normalizing",
      translations: {
        en: "Normalizing",
      },
      link: "/prototype/postprocess/heat/normalizing",
      linkEn: "/en/prototype/postprocess/heat/normalizing",
      attrs: { id: "prototype" },
    },
    {
      label: "表面硬化",
      labelEn: "Surface Hardening",
      translations: {
        en: "Surface Hardening",
      },
      link: "/prototype/postprocess/heat/Surface Hardening",
      linkEn: "/en/prototype/postprocess/heat/Surface Hardening",
      attrs: { id: "prototype" },
    },
  ],
},
//机械处理
  {
    label: "机械处理",
    labelEn: "Mechanical treamtment",
    translations: {
      en: "Mechanical treamtment",
    },
    collapsed: true,
    items: [
      {
        label: "去毛刺",
        labelEn: "Deburring",
        translations: {
          en: "Deburring",
        },
        link: "/prototype/postprocess/mechanical/deburring",
        linkEn: "/en/prototype/postprocess/mechanical/deburring",
        attrs: { id: "prototype" },
      },
      {
        label: "打磨",
        labelEn: "Grinding",
        translations: {
          en: "Grinding",
        },
        link: "/prototype/postprocess/mechanical/grinding",
        linkEn: "/en/prototype/postprocess/mechanical/grinding",
        attrs: { id: "prototype" },
      },
      {
        label: "喷砂",
        link: "/prototype/postprocess/mechanical/sandblasting",
        linkEn: "/en/prototype/postprocess/mechanical/sandblasting",
        labelEn: "Sandblasting",
        translations: {
          en: "Sandblasting",
        },
        attrs: { id: "prototype" },
      },
      {
        label: "抛光",
        labelEn: "Polishing",
        translations: {
          en: "Polishing",
        },
        link: "/prototype/postprocess/mechanical/polishing",
        linkEn: "/en/prototype/postprocess/mechanical/polishing",
        attrs: { id: "prototype" },
      },

    ],
  },
//化学处理
 {
  label: "化学处理",
  labelEn: "Chemical treamtment",
  translations: {
    en: "Chemical treamtment",
  },
  collapsed: true,
  items: [
    {
      label: "酸洗",
      labelEn: "Pickling",
      translations: {
        en: "Pickling",
      },
      link: "/prototype/postprocess/chemical/pickling",
      linkEn: "/en/prototype/postprocess/chemical/pickling",
      attrs: { id: "prototype" },
    },
    {
      label: "化学清洗",
      labelEn: "Chemical cleaning",
      translations: {
        en: "Chemical cleaning",
      },
      link: "/prototype/postprocess/chemical/cleaning",
      linkEn: "/en/prototype/postprocess/chemical/cleaning",
      attrs: { id: "prototype" },
    },
    {
      label: "化学抛光",
      link: "/prototype/postprocess/chemical/polish",
      linkEn: "/en/prototype/postprocess/chemical/polish",
      labelEn: "Chemical polish",
      translations: {
        en: "Chemical polis",
      },
      attrs: { id: "prototype" },
    },
  ],
},
//功能性处理（Functional Treatment）**涂覆润滑层（Lubrication Coating），导电涂层（Conductive Coating），防锈处理（Rust Prevention）
 {
  label: "功能性处理",
  labelEn: "Functional Treatment",
  translations: {
    en: "Functional Treatment",
  },
  collapsed: true,
  items: [
    {
      label: "涂覆润滑层",
      labelEn: "Lubrication Coating",
      translations: {
        en: "Lubrication Coating",
      },
      link: "/prototype/postprocess/functional/lubrication",
      linkEn: "/en/prototype/postprocess/functional/lubrication",
      attrs: { id: "prototype" },
    },
    {
      label: "导电涂层",
      labelEn: "Conductive Coating",
      translations: {
        en: "Conductive Coating",
      },
      link: "/prototype/postprocess/functional/conductive",
      linkEn: "/en/prototype/postprocess/functional/conductive",
      attrs: { id: "prototype" },
    },
    {
      label: "防锈处理",
      link: "/prototype/postprocess/functional/rustprevention",
      linkEn: "/en/prototype/postprocess/functional/rustprevention",
      labelEn: "Rust Prevention",
      translations: {
        en: "Rust Prevention",
      },
      attrs: { id: "prototype" },
    },
  ],
},
//6other 
  {
    label: "其他特殊处理",
    labelEn: "Other special Treatment",
    translations: {
      en: "Other special Treatment",
    },
    collapsed: true,
    items: [
      {
        label: "激光处理",
        labelEn: "Laser Treatment",
        translations: {
          en: "Laser Treatment",
        },
        link: "/prototype/postprocess/special/laser",
        linkEn: "/en/prototype/postprocess/special/laser",
        attrs: { id: "prototype" },
      },
      {
        label: "超声波处理",
        labelEn: "Ultrasonic Treatment",
        translations: {
          en: "Ultrasonic Treatment",
        },
        link: "/prototype/postprocess/special/ultrasonic",
        linkEn: "/en/prototype/postprocess/special/ultrasonic",
        attrs: { id: "prototype" },
      },
    ],
  },    

  {
    label: "--------测试--------",
    link: "/prototype/test/test",
    labelEn: "Test",
    translations: {
      en: "test",
    },
    linkEn: "/en/prototype/test",
    attrs: { id: "prototype" },
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

//沙盘
//  {
//    label: "--------数字沙盘--------",
//    labelEn: "digital sandtable",
//    link: "/prototype/sandtable",
//    linkEn: "/en/prototype/sandtable",
//    translations: {
//      en: "digital sandtabl",
//    },
//    attrs: { id: "prototype" },
//  },
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
    label: "车辆参数化生成工具",
    link: "/agvedu/agvplatform",
    labelEn: "AGV edu",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/agvplatform",
    attrs: { id: "agv" },
  },

  {
    label: "智能小车教育套件",
    link: "/agvedu/agvkit",
    labelEn: "AGVkit",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/agvkit",
    attrs: { id: "agv" },
  },
  {
    label: "CMF实验",
    link: "/agvedu/cmf",
    labelEn: "CMF",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/cmf",
    attrs: { id: "agv" },
  },
  {
    label: "仿真套件",
    link: "/agvedu/simulatorlab",
    labelEn: "Simulator Lab",
    translations: {
      en: "eee",
    },
    linkEn: "/en/agvedu/simulatorlab",
    attrs: { id: "agv" },
  },

  {
    label: "滑板底盘",
    link: "/agvedu/henosv",
    translations: {
      en: "henosv",
    },
    linkEn: "/en/agvedu/henosv",
    attrs: { id: "agv" },
  },
  {
    label: "交通工具模拟器",
    link: "/agvedu/simulator",
    labelEn: "agvsimulator",
    translations: {
      en: "algorithm",
    },
    linkEn: "/en/agvedu/simulator",
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

// 侧边栏菜单-
const SideBarData = [
  {
    key: "fab",
    label: "Fab 方案",
    translations: {
      en: "fab",
    },
    items: [...FabMenuItems],
  },
  {
    label: "数字制造",
    translations: {
      en: "prototype",
    },
    items: [...PrototypeMenuItems],
  },
  {
    id: "agv",
    label: "汽车场景实验室",
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
//侧边栏-沙盘
const sandtableMenuItems = [
  {
    label: "数字沙盘",
    link: "/sandtable/basic",
    labelEn: "digital sandtable",
    translations: {
      en: "sandtalbe",
    },
    linkEn: "/en/sandtable/basic",
    attrs: { id: "sandtable" },
  },
  {
    label: "加工工艺",
    link: "/sandtable/manufacture",
    labelEn: "Manufacture processing",
    translations: {
      en: "sandtable",
    },
    linkEn: "/en/sandtable/manufacture",
    attrs: { id: "sandtable" },
  },
  {
    label: "控制",
    link: "/sandtable/control",
    labelEn: "Control",
  
    translations: {
      en: "sandtable",
    },
    linkEn: "/en/sandtable/control",
    attrs: { id: "sandtable" },
  },
  {
    label: "后处理",
    link: "/sandtable/postprocessing",
    labelEn: "Post-processing",
    translations: {
      en: "sandtable",
    },
    linkEn: "/en/sandtable/postprocessing",
    attrs: { id: "sandtable" },
  },
  {
    label: "维护",
    link: "/sandtable/maintain",
    labelEn: "Maintain",
    translations: {
      en: "sandtable",
    },
    linkEn: "/en/sandtable/maintain",
    attrs: { id: "sandtable" },
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
        link: "/fab/explorefab",
        labelEn: "Explore Fab",
        linkEn: "/en/fab/explorefab",
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
        link: "/prototype/about",
        labelEn: "Material",  
        translations: {
          en: "material",
        },
        linkEn: "/en/prototype/about",
        attrs: { id: "prototype" },
      },
      {
        label: "制造工艺",
        labelEn: "manufacture",
        link: "/prototype/manufacture",
        linkEn: "/en/prototype/manufacture",
        translations: {
          en: "manufacture",
        },
      },
      {
        label: "后处理",
        labelEn: "Post-processing",
        link: "/prototype/postprocess/postprocess",
        linkEn: "/en/prototype/postprocess/postprocess",
        translations: {
          en: "Post-processing",
        },
      },
      {
        label: "测试",
        labelEn: "Test",
        link: "/prototype/test/test",
        linkEn: "/en/prototype/test/test",
        translations: {
          en: "test",
        },
      },
   //   {
   //     label: "数字沙盘",
   //     labelEn: "Digital sandtable",
   //     link: "/prototype/sandtable",
   //     linkEn: "/en/prototype/sandtable",
   //     translations: {
   //       en: "digital sandtabl",
   //     },
   //     attrs: { id: "prototype" },
   //   },
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
    label: "汽车场景实验室",
    labelEn: "futuretraffic",
    link: "/agvedu/agv",
    linkEn: "/en/agvedu/agv",
    items: [
  
      {
        label: "车辆参数化生成工具",
        labelEn: "AGV design platform",
        link: "/agvedu/agvplatform",
        linkEn: "/en/agvedu/agvplatform",
      },
      {
        label: "智能小车教育套件",
        labelEn: "AGV education kit",
        link: "/agvedu/agvkit",
        linkEn: "/en/agvedu/agvkit",
      },
      {
        label: "CMF实验室",
        labelEn: "CMF lab",
        link: "/agvedu/cmf",
        linkEn: "/en/agvedu/cmf",
      },
      {
        label: "仿真实验室",
        labelEn: "Simulator lab",
        link: "/agvedu/simulatorlab",
        linkEn: "/en/agvedu/simulatorlab",
      },
      {
        label: "滑板底盘",
        labelEn: "HenOSV",
        link: "/agvedu/henosv",
        linkEn: "/en/agvedu/henosv",
      },
      {
        label: "交通工具模拟器",
        labelEn: "agvsimulator",
        link: "/agvedu/simulator",
        linkEn: "/en/agvedu/simulator",
      },

      {
        label: "探索未来出行",
        labelEn: "Explore future traffic",
        link: "/agvedu/exploretraffic",
        linkEn: "/en/agvedu/exploretraffic",
      },
    ],
  },
//nav- sand table model 

  {
    key: "sandtable",
    label: "数字沙盘",
    labelEn: "digital sandtable",
    link: "/sandtable/basic",
    linkEn: "/en/sandtable/basic",
    items: [
  
      {
        label: "加工工艺",
        labelEn: "Manufacturing process",
        link: "/sandtable/manufacture",
        linkEn: "/en/sandtable/manufacture",
      },
      {
        label: "控制",
        labelEn: "digital control",
        link: "/sandtable/control",
        linkEn: "/en/sandtable/control",
        
      },
      {
        label: "后处理",
        labelEn: "Post-processing",
        link: "/sandtable/postprocessing",
        linkEn: "/en/sandtable/postprocessing",
      
      },
      {
        label: "维护",
        labelEn: "Maintenance",
        link: "/sandtable/maintain",
        linkEn: "/en/sandtable/maintain",
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
