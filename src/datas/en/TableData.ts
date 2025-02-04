import EN_NewtNonMetallicMaterialsData from "./NonMetallicMaterials.json";
import EN_metalData from "./Metal.json";

interface TableItem {
  title: string;
  color: string;
  url?: string;  // 添加可选的 url 属性
  left: {
    label: string;
    color: string;
    href: string;
  }[];
  right: {
    label: string;
    color: string;
    href: string;
  }[];
}

const TableData = [
  //sla
  {
    title: "SLA",
    color: "#E7D109",
    url: "/docs/prototype/sla",  // 添加url字段
    // 直接用非金属「字典」中的 石英 / PC
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
    ],
    right: [],
  },
  //fdm
  {
    title: "FDM",
    color: "#ffffff",
    left: [
      // 比如这里放 PC / PP / 树脂 ...
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
      EN_NewtNonMetallicMaterialsData["resin"],
    ],
    right: [EN_metalData["iron/steel"]],
  },
  //lcd/dlp
  {
    title: "LCD/DLP",
    color: "#ffffff",
    left: [EN_NewtNonMetallicMaterialsData["quartz"]],
    right: [],
  },
  //mjf
  {
    title: "MJF",
    color: "#ffffff",
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
    ],
    right: [EN_metalData["iron/steel"], EN_metalData["aluminum/alloy"]],
  },
  //sls
  {
    title: "SLS",
    color: "#ffffff",
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
    ],
    right: [],
  },
  //slm
  {
    title: "SLM",
    color: "#ffffff",
    left: [],
    right: [EN_metalData["iron/steel"], EN_metalData["aluminum/alloy"]],
  },
  //polyjet
  {
    title: "PolyJet",
    color: "#ffffff",
    left: [EN_NewtNonMetallicMaterialsData["resin"]],
    right: [],
  },
  // ...
  {
    title: "CNC Machining",
    color: "#ffffff",
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
      EN_NewtNonMetallicMaterialsData["peek"],
      EN_NewtNonMetallicMaterialsData["resin"],
      EN_NewtNonMetallicMaterialsData["TPU"],
      EN_NewtNonMetallicMaterialsData["nylon"],
      EN_NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      EN_metalData["iron/steel"],
      EN_metalData["aluminum/alloy"],
      EN_metalData["copper/alloy"],
      EN_metalData["titanium/alloy"],
    ],
  },

  {
    title: "Milling",
    color: "#ffffff",
    // 原先写法: left: EN_NewtNonMetallicMaterialsData, right: metalData
    // 现在改为：手动列出所有需要的非金属、金属（逐个写键名）
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
      EN_NewtNonMetallicMaterialsData["peek"],
      EN_NewtNonMetallicMaterialsData["resin"],
      EN_NewtNonMetallicMaterialsData["TPU"],
      EN_NewtNonMetallicMaterialsData["nylon"],
      EN_NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      EN_metalData["iron/steel"],
      EN_metalData["aluminum/alloy"],
      EN_metalData["copper/alloy"],
      EN_metalData["titanium/alloy"],
    ],
  },
  {
    title: "Lathe",
    color: "#ffffff",
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
      EN_NewtNonMetallicMaterialsData["peek"],
      EN_NewtNonMetallicMaterialsData["resin"],
      EN_NewtNonMetallicMaterialsData["TPU"],
      EN_NewtNonMetallicMaterialsData["nylon"],
      EN_NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      EN_metalData["iron/steel"],
      EN_metalData["aluminum/alloy"],
      EN_metalData["copper/alloy"],
      EN_metalData["titanium/alloy"],
    ],
  },
  {
    title: "Laser Cutting",
    color: "#ffffff",
    // 原先是 left: [], right: metalData.slice(0,2)
    // 即只包含 金属数组的前2项 => “铁/钢” & “铝/合金”
    left: [],
    right: [EN_metalData["iron/steel"], EN_metalData["aluminum/alloy"]],
  },
  {
    title: "Injection Molding",
    color: "#ffffff",
    // 原先 left: EN_NewtNonMetallicMaterialsData, right: []
    // 这里假设你想用全部非金属
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
      EN_NewtNonMetallicMaterialsData["PP"],
      EN_NewtNonMetallicMaterialsData["peek"],
      EN_NewtNonMetallicMaterialsData["resin"],
      EN_NewtNonMetallicMaterialsData["TPU"],
      EN_NewtNonMetallicMaterialsData["nylon"],
      EN_NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [],
  },
  {
    title: "Silicone Coating",
    color: "#ffffff",
    // 原先 left: EN_NewtNonMetallicMaterialsData.slice(0,2), right: []
    // slice(0,2) 表示非金属前2项 => “石英” & “PC”
    left: [
      EN_NewtNonMetallicMaterialsData["quartz"],
      EN_NewtNonMetallicMaterialsData["PC"],
    ],
    right: [],
  },
  {
    title: "Sheet Metal",
    color: "#ffffff",
    left: [],
    // 原先 right: metalData.slice(0,2)
    // => “铁/钢”、“铝/合金”
    right: [EN_metalData["iron/steel"], EN_metalData["aluminum/alloy"]],
  },
];

export default TableData;
