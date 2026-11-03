const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const source=path.resolve(process.argv[2]||path.join(__dirname,'../../../work/native-source/BambuStudio')),commit=execFileSync('git',['-c','safe.directory='+source,'-C',source,'rev-parse','HEAD'],{encoding:'utf8'}).trim();if(commit!=='926a7192574bcb9b3a732e1ec59a46d79cb45466')throw Error('Source must be Bambu Studio v02.08.02.61 at the pinned commit');
function edit(name,fn){const file=path.join(source,name),before=fs.readFileSync(file,'utf8'),after=fn(before);if(after!==before)fs.writeFileSync(file,after);}
for(const name of ['ProFabXLiveLink.cpp','ProFabXLiveLink.hpp','PendingPose.hpp','NativeTransform.hpp','NativeSafety.hpp','ProFabXHost.inc']){const from=path.join(__dirname,'adapter',name),to=path.join(source,'src/slic3r/GUI',name);if(!fs.existsSync(to)||!fs.readFileSync(from).equals(fs.readFileSync(to)))fs.copyFileSync(from,to);}
edit('src/slic3r/GUI/Plater.hpp',s=>s.includes('m_profabx_live_link')?s:s.replace('class Plater: public wxPanel','class ProFabXLiveLink;\nclass Plater: public wxPanel').replace('    bool m_force_ban_check_volume_bbox_state_with_extruder_area','    std::shared_ptr<ProFabXLiveLink> m_profabx_live_link;\n    bool m_force_ban_check_volume_bbox_state_with_extruder_area'));
edit('src/slic3r/GUI/Plater.cpp',s=>s.includes('m_profabx_live_link =')?s:s.replace('#include "Plater.hpp"','#include "Plater.hpp"\n#include "ProFabXLiveLink.hpp"').replace('    // Initialization performed in the private c-tor','    m_profabx_live_link = start_profabx_live_link(this);\n    // Initialization performed in the private c-tor'));
// Stop callbacks before the native private model and canvas begin destruction.
edit('src/slic3r/GUI/Plater.hpp',s=>s.replace('~Plater() = default;','~Plater();'));
edit('src/slic3r/GUI/Plater.cpp',s=>s.includes('Plater::~Plater()')?s:s.replace('Plater::Plater(wxWindow *parent, MainFrame *main_frame)','Plater::~Plater() { m_profabx_live_link.reset(); }\n\nPlater::Plater(wxWindow *parent, MainFrame *main_frame)'));
edit('src/slic3r/CMakeLists.txt',s=>s.includes('GUI/ProFabXLiveLink.cpp')?s:s.replace('    GUI/Plater.cpp','    GUI/ProFabXLiveLink.cpp\n    GUI/ProFabXLiveLink.hpp\n    GUI/Plater.cpp'));
edit('src/slic3r/GUI/InstanceCheck.cpp',s=>s.includes('PROFABX_LIVE_DESCRIPTOR')?s:s.replace('if (cla.should_send.value() && GUI::wxGetApp().single_instance_checker()->IsAnotherRunning()) {','wxString profabx_descriptor;\n\tif (wxGetEnv("PROFABX_LIVE_DESCRIPTOR", &profabx_descriptor) && !profabx_descriptor.empty()) cla.should_send = false;\n\tif (cla.should_send.value() && GUI::wxGetApp().single_instance_checker()->IsAnotherRunning()) {'));
edit('version.inc',s=>s.replace('set(SLIC3R_APP_KEY "BambuStudio")','set(SLIC3R_APP_KEY "ProFabXLive")').replace('set(SLIC3R_APP_NAME "ProFabXLive")','set(SLIC3R_APP_NAME "BambuStudio")'));
// Isolate configuration without changing native translation catalogs or service identifiers.
edit('src/slic3r/GUI/GUI_App.cpp',s=>s.replaceAll('GetAvailableTranslations(SLIC3R_APP_KEY','GetAvailableTranslations("BambuStudio"').replaceAll('GetBestTranslation(SLIC3R_APP_KEY','GetBestTranslation("BambuStudio"').replaceAll('AddCatalog(SLIC3R_APP_KEY','AddCatalog("BambuStudio"'));
edit('src/slic3r/GUI/MainFrame.cpp',s=>s.replace('m_topbar->SetTitle(title);','m_topbar->SetTitle(title + "  |  ProFabX Live");').replace('SetTitle(title + " - BambuStudio");','SetTitle(title + " - ProFabX Live (Bambu Studio)");'));
edit('src/slic3r/GUI/GUI_App.cpp',s=>{const guard="    if (!is_associate_files(extend)) return; // Preserve other applications' associations.\n";s=s.replaceAll('L" Bambu.Studio.1"','L"ProFabX.Live.1"').replaceAll(guard,'');return s.replace('void GUI_App::disassociate_files(std::wstring extend)\n{\n','void GUI_App::disassociate_files(std::wstring extend)\n{\n'+guard);});
edit('src/slic3r/GUI/GUI_App.cpp',s=>{if(!s.includes('PROFABX_ASSOCIATION_READ'))s=s.replace('    bool bDidntExist = iRC == ERROR_FILE_NOT_FOUND;','    if (iRC != ERROR_SUCCESS) return false; // PROFABX_ASSOCIATION_READ\n    bool bDidntExist = iRC == ERROR_FILE_NOT_FOUND;');return s.replace('    HKEY hkey;','    HKEY hkey = nullptr;').replace('    RegCloseKey(hkey);','    if (hkey) RegCloseKey(hkey);');});
edit('src/slic3r/GUI/DeviceWeb/CMakeLists.txt',s=>s.replaceAll('TLS_VERIFY OFF','TLS_VERIFY ON'));
fs.copyFileSync(path.join(__dirname,'device-build-compat.cjs'),path.join(source,'scripts/profabx-device-build-compat.cjs'));
edit('src/slic3r/GUI/DeviceWeb/CMakeLists.txt',s=>s.includes('profabx-device-build-compat.cjs')?s:s.replace('    COMMAND echo "Running PNPM run build"','    COMMAND ${NODE_EXECUTABLE} "${CMAKE_SOURCE_DIR}/scripts/profabx-device-build-compat.cjs" "${DEVICE_PAGE_SRC_DIR}"\n    COMMAND echo "Running PNPM run build"'));
const deviceWorkspace=path.join(source,'src/slic3r/GUI/DeviceWeb/device_page/pnpm-workspace.yaml');
if(!fs.existsSync(deviceWorkspace))fs.writeFileSync(deviceWorkspace,"packages:\n  - '.'\n");
edit('src/slic3r/GUI/DeviceWeb/device_page/vite.config.ts',s=>s.includes('realpathSync.native(process.cwd())')?s:s.replace("import { defineConfig, type Plugin } from 'vite'","import { defineConfig, type Plugin } from 'vite'\nimport { realpathSync } from 'node:fs'").replace("  base: './',","  root: realpathSync.native(process.cwd()),\n  base: './',"));
edit('src/slic3r/GUI/DeviceWeb/device_page/package.json',s=>{const data=JSON.parse(s);if(data.devDependencies['@types/node'])return s;data.devDependencies['@types/node']='22.15.29';return JSON.stringify(data,null,2)+'\n';});
// Use the same MSVC compiler through a portable Ninja generator without registering Visual Studio.
edit('deps/CMakeLists.txt',s=>s.includes('PROFABX_PORTABLE_GENERATOR')?s:s.replace('    message(STATUS "bambustudio_add_cmake_project ${projectname},  _gen is ${_gen} ")','    if (CMAKE_GENERATOR MATCHES "Ninja") # PROFABX_PORTABLE_GENERATOR\n        set(_gen CMAKE_GENERATOR "${CMAKE_GENERATOR}")\n        set(_configs_line -DCMAKE_BUILD_TYPE:STRING=${CMAKE_BUILD_TYPE})\n        set(_build_j "-j${NPROC}")\n    endif()\n    message(STATUS "bambustudio_add_cmake_project ${projectname},  _gen is ${_gen} ")'));
// PyPI's portable CMake does not resolve cmcldeps; compile RC directly instead.
edit('deps/deps-windows.cmake',s=>s.includes('CMAKE_NINJA_CMCLDEPS_RC')?s:s.replace('set(DEP_CMAKE_OPTS "-DCMAKE_POLICY_VERSION_MINIMUM=3.5")','set(DEP_CMAKE_OPTS "-DCMAKE_POLICY_VERSION_MINIMUM=3.5" "-DCMAKE_NINJA_CMCLDEPS_RC=OFF")'));
edit('deps/deps-windows.cmake',s=>s.includes('CMAKE_EXPORT_PACKAGE_REGISTRY')?s:s.replace('"-DCMAKE_NINJA_CMCLDEPS_RC=OFF")','"-DCMAKE_NINJA_CMCLDEPS_RC=OFF" "-DCMAKE_EXPORT_PACKAGE_REGISTRY=OFF" "-DCMAKE_FIND_USE_PACKAGE_REGISTRY=OFF")'));
// The build needs source files, not the complete wxWidgets history.
edit('deps/wxWidgets/wxWidgets.cmake',s=>s.includes('GIT_SHALLOW')?s:s.replace('    GIT_TAG master','    GIT_TAG master\n    GIT_SHALLOW TRUE'));
// wxWidgets uses the separately built system libraries, and its tests are off.
// Those upstream submodules are unused in this build.
edit('deps/CMakeLists.txt',s=>s.includes('PROFABX_EMPTY_SUBMODULES')?s:s.replace('    ExternalProject_Add(','    if(POLICY CMP0097) # PROFABX_EMPTY_SUBMODULES\n        cmake_policy(SET CMP0097 NEW)\n    endif()\n    ExternalProject_Add('));
// Preserve the empty argument literally; expanding the wrapper's argument list loses it.
edit('deps/wxWidgets/wxWidgets.cmake',s=>s.replace('    GIT_SUBMODULES ""\n',''));
edit('deps/CMakeLists.txt',s=>s.includes('PROFABX_SYSTEM_SUBMODULES')?s:s.replace('        dep_${projectname}\n','        dep_${projectname}\n        GIT_SUBMODULES "" # PROFABX_SYSTEM_SUBMODULES\n'));
edit('deps/CMakeLists.txt',s=>s.includes('PROFABX_PARALLEL_LIMIT')?s:s.replace('function(bambustudio_add_cmake_project projectname)','function(bambustudio_add_cmake_project projectname)\n    if(DEFINED ENV{CMAKE_BUILD_PARALLEL_LEVEL}) # PROFABX_PARALLEL_LIMIT\n        set(NPROC $ENV{CMAKE_BUILD_PARALLEL_LEVEL})\n    endif()'));

// Keep the native 3MF format identity independent of the private application/config key.
edit('src/libslic3r/Format/bbs_3mf.cpp',s=>s.replace('metadata_item_map[BBL_APPLICATION_TAG]   = (boost::format("%1%-%2%") % SLIC3R_APP_KEY % SLIC3R_VERSION).str();','metadata_item_map["ProFabX:Generator"] = SLIC3R_APP_KEY;\n                metadata_item_map[BBL_APPLICATION_TAG]   = (boost::format("BambuStudio-%1%") % SLIC3R_VERSION).str();'));
console.log('Applied ProFabX Live adapter to '+source);

fs.copyFileSync(path.join(__dirname,'tests/paint.cpp'),path.join(source,'src/ProFabXPaintTest.inc'));
edit('src/BambuStudio.cpp',s=>s.includes('profabx_paint_test(argv[2]')?s:s.replace('int CLI::run(int argc, char **argv)','\n#include "libslic3r/TriangleSelector.hpp"\n#include "ProFabXPaintTest.inc"\nint CLI::run(int argc, char **argv)').replace('int CLI::run(int argc, char **argv)\n{','int CLI::run(int argc, char **argv)\n{\n    if(argc==4 && std::string(argv[1])=="--profabx-paint-test")return profabx_paint_test(argv[2],argv[3]);'));

fs.copyFileSync(path.join(__dirname,'adapter/NativeSafety.hpp'),path.join(source,'src/ProFabXNativeSafety.hpp'));
edit('src/BambuStudio.cpp',s=>s.includes('#include \"ProFabXNativeSafety.hpp\"')?s:s.replace('#include \"ProFabXPaintTest.inc\"','#include \"ProFabXNativeSafety.hpp\"\n#include \"ProFabXPaintTest.inc\"'));
