// XML parsers normalize literal attribute whitespace. Bind against the same safe name.
export function linkedObjectName(part){
 const label=String(part.name??'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim();
 return ('PFXLIVE:'+part.id+':'+label).slice(0,300);
}
