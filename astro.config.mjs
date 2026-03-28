import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { SideBarData } from "./src/constants";

export default defineConfig({
  site: "https://profabx.com",
  redirects: {
    "/tutorials/33dprinter/assessment": "/tutorials/3_3dprinter/assessment",
    "/tutorials/33dprinter/3dprintingdesign": "/tutorials/3_3dprinter/3dprintingdesign",
    "/tutorials/33dprinter/13dprintingbackground": "/tutorials/3_3dprinter/13dprintingbackground",
    "/tutorials/33dprinter/2fdm3dprintingbackground": "/tutorials/3_3dprinter/2fdm3dprintingbackground",
    "/tutorials/33dprinter/3fdm-designguide": "/tutorials/3_3dprinter/3fdm-designguide",
    "/tutorials/33dprinter/4fdm-machineoperation": "/tutorials/3_3dprinter/4fdm-machineoperation",
    "/tutorials/33dprinter/5slabackground": "/tutorials/3_3dprinter/5slabackground",
    "/tutorials/33dprinter/6sladesignguide": "/tutorials/3_3dprinter/6sladesignguide",
    "/tutorials/33dprinter/7hpmjf": "/tutorials/3_3dprinter/7hpmjf",
    "/tutorials/33dprinter/8postprocess": "/tutorials/3_3dprinter/8postprocess",
    "/tutorials/33dprinter/93dslicesoftware": "/tutorials/3_3dprinter/93dslicesoftware",
    "/tutorials/4electricdesign/assessment": "/tutorials/4electric_design/assessment",
    "/tutorials/4electricdesign/basicknowledge": "/tutorials/4electric_design/basicknowledge",
    "/tutorials/4electricdesign/electricparametercomponent": "/tutorials/4electric_design/electricparameter_component",
    "/tutorials/4electricdesign/tool": "/tutorials/4electric_design/tool",
    "/tutorials/6lasercutter/assessment": "/tutorials/6laser_cutter/assessment",
    "/tutorials/6lasercutter/safety": "/tutorials/6laser_cutter/safety",
    "/tutorials/6lasercutter/autocad": "/tutorials/6laser_cutter/autocad",
    "/tutorials/6lasercutter/designguide": "/tutorials/6laser_cutter/design_guide",
    "/tutorials/6lasercutter/machinepractice": "/tutorials/6laser_cutter/machine_practice",
    "/tutorials/7pcbmanufacture/assessment": "/tutorials/7pcb_manufacture/assessment",
    "/tutorials/7pcbmanufacture/pcb": "/tutorials/7pcb_manufacture/pcb",
    "/tutorials/7pcbmanufacture/smt": "/tutorials/7pcb_manufacture/smt",
    "/tutorials/7pcbmanufacture/manual": "/tutorials/7pcb_manufacture/manual",
    "/tutorials/7pcbmanufacture/prototype": "/tutorials/7pcb_manufacture/prototype",
    "/tutorials/8cncmanufacture/assessment": "/tutorials/8cnc_manufacture/assessment",
    "/tutorials/8cncmanufacture/cnctype": "/tutorials/8cnc_manufacture/cnctype",
    "/tutorials/8cncmanufacture/tool": "/tutorials/8cnc_manufacture/tool",
    "/tutorials/8cncmanufacture/cncprogram": "/tutorials/8cnc_manufacture/cncprogram",
    "/tutorials/8cncmanufacture/cncmanufacture": "/tutorials/8cnc_manufacture/cncmanufacture",
    "/tutorials/2cad/3ddesignfusion360": "/tutorials/2cad/3d_design_fusion360",
    "/tutorials/5arduino/opensource": "/tutorials/5arduino/open_source",
    "/tutorials/5arduino/arduinobasic": "/tutorials/5arduino/arduino_basic",
    "/tutorials/5arduino/arduinocode": "/tutorials/5arduino/arduino_code",
    "/tutorials/5arduino/arduinoinput": "/tutorials/5arduino/arduino_input",
    "/tutorials/5arduino/arduinooutput": "/tutorials/5arduino/arduino_output",
    "/tutorials/10iot/iotbasic": "/tutorials/10iot/iot_basic",
    "/tutorials/10iot/nodemcuesp8266aliyun": "/tutorials/10iot/nodemcuesp8266_aliyun",
    "/tutorials/9iot/nodemcuesp8266aliyun": "/tutorials/10iot/nodemcuesp8266_aliyun",
    "/tutorials/9iot/nodemcuesp8266_aliyun": "/tutorials/10iot/nodemcuesp8266_aliyun",
    "/en/tutorials/9iot/nodemcuesp8266_aliyun": "/en/tutorials/10iot/nodemcuesp8266_aliyun",
  },
  integrations: [
    starlight({
      title: "ProFabX",
      tableOfContents: false,
      logo: {
        light: "./src/assets/dark.png",
        dark: "./src/assets/light.png",
      },
      defaultLocale: "root", // NOTE 这个是多语言的默认配置。不能修改
      locales: {
        en: {
          label: "English",
          lang: 'en'
        },
        root: { // NOTE root 为默认语言设置，不能修改
          label: "简体中文",
          lang: "zh-CN", // lang is required for root locales
        },
      },
      customCss: [
        "./src/tailwind.css",
      ],
      sidebar: SideBarData,
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        SocialIcons: "./src/components/NavBarLink.astro",
        Sidebar: "./src/components/Sidebar.astro",
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
