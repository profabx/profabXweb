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
    url: "/prototype/manufacture/add/sla",  // 添加url字段

  
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
    url: "/prototype/manufacture/add/fdm",
    left: [
      // 比如这里放 PC / PP / 树脂 ...
      polymersData["ABS"],polymersData["PP"],polymersData["尼龙"], polymersData["PEEK"],polymersData["TPU"],polymersData["PLA"],polymersData["ASA"],componsitesData["PACF"],componsitesData["PAGF"],componsitesData["ABSCF"],componsitesData["PLA+wood"]],
    right: [metalData["铁/钢"], ceramicsData["陶瓷"]],
  },
  //lcd/dlp
  {
    title: "LCD/DLP",
    color: "#E7D109",
    left: [polymersData["树脂"],polymersData["TPU"]],
    right: [ceramicsData["陶瓷"]],
  },
  //mjf
  {
    title: "MJF",
    color: "#E7D109",
    left: [polymersData["PP"],polymersData["TPU"],polymersData["PA"]],
    right: [],
  },
  //sls
  {
    title: "SLS",
    color: "#E7D109",
    left: [polymersData["TPU"],polymersData["PA"],componsitesData["PACF"],componsitesData["PAGF"]],
    right: [],

  },
  //slm
  {
    title: "SLM",
    color: "#E7D109",
    left: [],
    right: [metalData["铁/钢"], metalData["铝/合金"],metalData["钛合金"],metalData["钨合金"]],
  },
  //polyjet
  {
    title: "PolyJet",
    color: "#E7D109",
    left: [ polymersData["树脂"]],
    right: [],
  },

//等材

{
  title: "注塑",
  color: "#FF0000",
  // 原先 left: NewtNonMetallicMaterialsData, right: []
  // 这里假设你想用全部非金属
  left: [polymersData["PC"],polymersData["PP"],polymersData["PEEK"],polymersData["ABS"],polymersData["尼龙"],
  polymersData["POM"],polymersData["TPU"],componsitesData["PACF"],componsitesData["PAGF"],componsitesData["ABS+GF"],componsitesData["ABS+PC"]],
  right: [],
},
{
  title: "硅胶覆膜",
  color: "#ffffff",
  // 原先 left: NewtNonMetallicMaterialsData.slice(0,2), right: []
  // slice(0,2) 表示非金属前2项 => “石英” & “PC”
  left: [polymersData["硅胶"],polymersData["PU"]],
  right: [],
},
{
  title: "钣金",
  color: "#ffffff",
  left: [],
  // 原先 right: metalData.slice(0,2)
  // => “铁/钢”、“铝/合金”
  right: [metalData["铁/钢"], metalData["铝/合金"],metalData["镀锌板"], metalData["冷轧板"]],
},
];




  // ...
  {
    title: "数控加工",
    color: "#0000FF",
    left: [polymersData["PC"],polymersData["PP"],polymersData["ABS"],polymersData["亚克力"],polymersData["PEEK"],polymersData["POM"],polymersData["尼龙"],componsitesData["PACF"],componsitesData["PAGF"]],
    right: [metalData["铁/钢"],metalData["铝/合金"],metalData["铜/合金"],metalData["钛/合金"],ceramicsData["玻璃"],woodData[“cherry”],woodData[“walnut”]],
  },

  {
    title: "铣",
    color: "#0000FF",
    // 原先写法: left: NewtNonMetallicMaterialsData, right: metalData
    // 现在改为：手动列出所有需要的非金属、金属（逐个写键名）
    left: [polymersData["PC"],polymersData["PP"],polymersData["ABS"],polymersData["亚克力"],polymersData["PEEK"],polymersData["POM"],polymersData["尼龙"],componsitesData["PACF"],componsitesData["PAGF"]],
    right: [metalData["铁/钢"],metalData["铝/合金"],metalData["铜/合金"],metalData["钛/合金"],ceramicsData["玻璃"],woodData[“cherry”],woodData[“walnut”]],
  },
  {
    title: "车",
    color: "#0000FF",
    left: [polymersData["PC"],polymersData["PP"],polymersData["ABS"],polymersData["亚克力"],polymersData["PEEK"],polymersData["POM"],polymersData["尼龙"],componsitesData["PACF"],componsitesData["PAGF"]],
    right: [metalData["铁/钢"],metalData["铝/合金"],metalData["铜/合金"],metalData["钛/合金"],ceramicsData["玻璃"],woodData[“cherry”],woodData[“walnut”]],
  },
  {
    title: "激光切割",
    color: "#0000FF",
    left: [polymersData["亚克力"], polymersData["ABS"]],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["冷轧板"], metalData["镀锌板"]]
  },
  
];

// 确保导出语句在数组定义后面
export default TableData;