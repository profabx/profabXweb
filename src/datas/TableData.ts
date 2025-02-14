import NewtNonMetallicMaterialsData from "./NonMetallicMaterials.json";
import metalData from "./Metal.json";
import polymersData from "./polymers.json";
import componsitesData from "./componsites.json";
import ceramicsData from "./ceramics.json";
import woodData from "./wood.json";
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
    url: "/prototype/sla",  // 添加url字段
    // 直接用非金属「字典」中的 石英 / PC
    left: [
      polymersData["树脂"],
    ],
    right: [],
  },
  //fdm
  {
    title: "FDM",
    color: "#E7D109",
    left: [
      // 比如这里放 PC / PP / 树脂 ...
      polymersData["ABS"],polymersData["PP"],polymersData["尼龙"], polymersData["PEEK"],polymersData["TPU"],polymersData["PLA"],polymersData["ASA"],componsitesData["PACF"],componsitesData["PAGF"],componsitesData["ABSCF"],componsitesData["PLA+wood"],
     
    ],
    right: [metalData["钢铁"], componsitesData[陶瓷],],
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
      polymersData["PC"],
    ],
    right: [metalData["铁/钢"], metalData["铝/合金"]],
  },
  //sls
  {
    title: "SLS",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      polymersData["PC"],
      polymersData["PP"],
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
    left: [ polymersData["树脂"]],
    right: [],
  },
  // ...
  {
    title: "数控加工",
    color: "#ffffff",
    left: [
      NewtNonMetallicMaterialsData["石英"],
      polymersData["PC"],
      polymersData["PP"],
      polymersData["PEEK"],
      polymersData["树脂"],
      polymersData["TPU"],
      polymersData["尼龙"],
      polymersData["ABS"],
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
      polymersData["PC"],
      polymersData["PP"],
      polymersData["PEEK"],
      polymersData["树脂"],
      polymersData["TPU"],
      polymersData["尼龙"],
      polymersData["ABS"],
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
      polymersData["PC"],
      polymersData["PP"],
      polymersData["PEEK"],
      polymersData["树脂"],
      polymersData["TPU"],
      polymersData["尼龙"],
      polymersData["ABS"],
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
      polymersData["PC"],
      polymersData["PP"],
      polymersData["PEEK"],
      polymersData["树脂"],
      polymersData["TPU"],
      polymersData["尼龙"],
      polymersData["ABS"],
    ],
    right: [],
  },
  {
    title: "硅胶覆膜",
    color: "#ffffff",
    // 原先 left: NewtNonMetallicMaterialsData.slice(0,2), right: []
    // slice(0,2) 表示非金属前2项 => “石英” & “PC”
    left: [

      polymersData["PC"],
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