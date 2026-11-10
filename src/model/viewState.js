const palette=['#94a6b2','#88a6c8','#8aa99b','#a99cbb','#b2a393','#8eacb0','#adb4c0'];
export function groupColor(process,materialId){let h=0;for(const c of `${process}/${materialId}`)h=(h*31+c.charCodeAt(0))>>>0;return palette[h%palette.length];}
export function deriveVisibility(partIds,isolatedId){return new Set(isolatedId?partIds.filter(id=>id===isolatedId):partIds);}

const processColors={FDM:'#377cf6',LCD:'#9964da',SLA:'#d77d37',CNC:'#3f9693','激光切割':'#c7a137',SLM:'#65758b',SLS:'#c2608c',MJF:'#4a9c58','硅胶复模':'#ad7251'};
export function displayColor(part,mode='part',index=0){return mode==='process'?(processColors[part.config.process]||'#7d8799'):`hsl(${(index*137.508+215)%360}, 65%, 55%)`;}
