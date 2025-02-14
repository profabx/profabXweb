
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
      polymersData["ABS"],polymersData["PP"],polymersData["尼龙"], polymersData["PEEK"],polymersData["TPU"],polymersData["PLA"],polymersData["ASA"],componsitesData["PACF"],componsitesData["PAGF"],componsitesData["ABS+GF"],componsitesData["PLA+wood"]],
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
    left: [polymersData["PP"], polymersData["TPU"], polymersData["尼龙"]], // 使用"尼龙"替代"PA"
    right: [],
  },
  //sls
  {
    title: "SLS",
    color: "#E7D109",
    left: [polymersData["TPU"],polymersData["尼龙"],componsitesData["PACF"],componsitesData["PAGF"]],
    right: [],

  },
  //slm
  {
    title: "SLM",
    color: "#E7D109",
    left: [],
    right: [metalData["铁/钢"], metalData["铝/合金"],metalData["钛/合金"],metalData["钨/合金"]],
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

  // 修复等材制造部分的数组结构
  {
    title: "注塑",
    color: "#FF0000",
    left: [polymersData["PC"], polymersData["PP"], polymersData["PEEK"], polymersData["ABS"], 
          polymersData["尼龙"], polymersData["POM"], polymersData["TPU"], 
          componsitesData["PACF"], componsitesData["PAGF"]],
    right: []
  },
  {
    title: "硅胶覆膜",
    color: "#ffffff",
    left: [polymersData["硅胶"], polymersData["PU"]],
    right: []
  },
  {
    title: "钣金",
    color: "#ffffff",
    left: [],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["镀锌板"], metalData["冷轧板"]]
  },
  // 移除多余的数组结束符号和空行

  // 添加减材制造部分
  {
    title: "数控加工",
    color: "#0000FF",
    left: [polymersData["PC"], polymersData["PP"], polymersData["ABS"], polymersData["亚克力"], 
          polymersData["PEEK"], polymersData["POM"], polymersData["尼龙"], 
          componsitesData["PACF"], componsitesData["PAGF"]],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["铜/合金"], 
           metalData["钛/合金"], ceramicsData["玻璃"], 
           woodData["胡桃木"], woodData["樱桃木"]]
  },

  {
    title: "铣",
    color: "#0000FF",
    left: [polymersData["PC"], polymersData["PP"], polymersData["ABS"], polymersData["亚克力"], 
          polymersData["PEEK"], polymersData["POM"], polymersData["尼龙"], 
          componsitesData["PACF"], componsitesData["PAGF"]],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["铜/合金"], 
           metalData["钛/合金"], ceramicsData["玻璃"], 
           woodData["胡桃木"], woodData["樱桃木"]]
  },

  {
    title: "车",
    color: "#0000FF",
    left: [polymersData["PC"], polymersData["PP"], polymersData["ABS"], polymersData["亚克力"], 
          polymersData["PEEK"], polymersData["POM"], polymersData["尼龙"], 
          componsitesData["PACF"], componsitesData["PAGF"]],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["铜/合金"], 
           metalData["钛/合金"], ceramicsData["玻璃"], 
           woodData["胡桃木"], woodData["樱桃木"]]
  },

  {
    title: "激光切割",
    color: "#0000FF",
    left: [polymersData["亚克力"], polymersData["ABS"]],
    right: [metalData["铁/钢"], metalData["铝/合金"], metalData["冷轧板"], metalData["镀锌板"]]
  }
];

export default TableData;