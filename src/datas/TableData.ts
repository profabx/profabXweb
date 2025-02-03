import NewtNonMetallicMaterialsData from "./NonMetallicMaterials.json";
import metalData from "./Metal.json";

const TableData = [
  //sla
  {
    title: "SLA",
    color: "#E7D109",
    // 直接用非金属「字典」中的 石英 / PC
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
    ],
    right: [],
  },
  //fdm
  {
    title: "FDM",
    color: "#ffffff",
    left: [
      // 比如这里放 PC / PP / 树脂 ...
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["树脂"],
    ],
    right: [metalData["铁/钢"]],
  },
  //lcd/dlp
  {
    title: "LCD/DLP",
    color: "#ffffff",
    left: [NewtNonMetallicMaterialsData["石英"]],
    right: [],
  },
  //mjf
  {
    title: "MJF",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
    ],
    right: [metalData["铁/钢"], metalData["铝/合金"]],
  },
  //sls
  {
    title: "SLS",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
    ],
    right: [],
  },
  //slm
  {
    title: "SLM",
    color: "#ffffff",
    left: [],
    right: [metalData["铁/钢"], metalData["铝/合金"]],
  },
  //polyjet
  {
    title: "PolyJet",
    color: "#ffffff",
    left: [NewtNonMetallicMaterialsData["树脂"]],
    right: [],
  },
  // ...
  {
    title: "数控加工",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["peek"],
      NewtNonMetallicMaterialsData["树脂"],
      NewtNonMetallicMaterialsData["TPU"],
      NewtNonMetallicMaterialsData["尼龙"],
      NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      metalData["铁/钢"],
      metalData["铝/合金"],
      metalData["铜/合金"],
      metalData["钛/合金"],
    ],
  },

  {
    title: "铣",
    color: "#ffffff",
    // 原先写法: left: NewtNonMetallicMaterialsData, right: metalData
    // 现在改为：手动列出所有需要的非金属、金属（逐个写键名）
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["peek"],
      NewtNonMetallicMaterialsData["树脂"],
      NewtNonMetallicMaterialsData["TPU"],
      NewtNonMetallicMaterialsData["尼龙"],
      NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      metalData["铁/钢"],
      metalData["铝/合金"],
      metalData["铜/合金"],
      metalData["钛/合金"],
    ],
  },
  {
    title: "车",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["peek"],
      NewtNonMetallicMaterialsData["树脂"],
      NewtNonMetallicMaterialsData["TPU"],
      NewtNonMetallicMaterialsData["尼龙"],
      NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [
      metalData["铁/钢"],
      metalData["铝/合金"],
      metalData["铜/合金"],
      metalData["钛/合金"],
    ],
  },
  {
    title: "激光切割",
    color: "#ffffff",
    // 原先是 left: [], right: metalData.slice(0,2)
    // 即只包含 金属数组的前2项 => “铁/钢” & “铝/合金”
    left: [],
    right: [metalData["铁/钢"], metalData["铝/合金"]],
  },
  {
    title: "注塑",
    color: "#ffffff",
    // 原先 left: NewtNonMetallicMaterialsData, right: []
    // 这里假设你想用全部非金属
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
      NewtNonMetallicMaterialsData["PP"],
      NewtNonMetallicMaterialsData["peek"],
      NewtNonMetallicMaterialsData["树脂"],
      NewtNonMetallicMaterialsData["TPU"],
      NewtNonMetallicMaterialsData["尼龙"],
      NewtNonMetallicMaterialsData["ABS"],
    ],
    right: [],
  },
  {
    title: "硅胶覆膜",
    color: "#ffffff",
    // 原先 left: NewtNonMetallicMaterialsData.slice(0,2), right: []
    // slice(0,2) 表示非金属前2项 => “石英” & “PC”
    left: [
      NewtNonMetallicMaterialsData["石英"],
      NewtNonMetallicMaterialsData["PC"],
    ],
    right: [],
  },
  {
    title: "钣金",
    color: "#ffffff",
    left: [],
    // 原先 right: metalData.slice(0,2)
    // => “铁/钢”、“铝/合金”
    right: [metalData["铁/钢"], metalData["铝/合金"]],
  },
];


export default TableData;