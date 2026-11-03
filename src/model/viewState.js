const palette=['#94a6b2','#88a6c8','#8aa99b','#a99cbb','#b2a393','#8eacb0','#adb4c0'];
export function groupColor(process,materialId){let h=0;for(const c of `${process}/${materialId}`)h=(h*31+c.charCodeAt(0))>>>0;return palette[h%palette.length];}
export function deriveVisibility(partIds,isolatedId){return new Set(isolatedId?partIds.filter(id=>id===isolatedId):partIds);}
