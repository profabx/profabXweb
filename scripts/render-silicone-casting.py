"""Encode the original isometric casting frames as a looping GIF.
First run: node scripts/render-silicone-casting-3d.cjs
Requires Pillow; website builds consume committed GIF/PNG, not this renderer.
"""
from pathlib import Path
from PIL import Image
import json,tempfile
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/processes'
FRAME_DIR=Path(tempfile.gettempdir())/'profabx-casting-3d-frames'
STAGES=[('原型与浇道准备','固定原型，规划浇口与排气通道',24),('制作硅胶模具','浇注硅胶包覆原型，等待硅胶固化',32),('分模并取出原型','留下与原型形状一致的模腔',56),('合模与真空浇注','经浇口注入树脂，真空辅助排气',40),('树脂固化','模具保持合拢，按材料条件固化',24),('开模取件与去浇口','取出整体成型的复制件，修整浇口',96)]
def main():
 OUT.mkdir(parents=True,exist_ok=True)
 files=[FRAME_DIR/f'{i:04d}.png' for i in range(sum(stage[2] for stage in STAGES))]
 if not all(p.is_file() for p in files):raise SystemExit('Run node scripts/render-silicone-casting-3d.cjs first')
 images=[Image.open(p).convert('RGB') for p in files]
 assert all(im.size==(840,510) for im in images)
 sheet=Image.new('RGB',(840*3,510*2),'white')
 for i,n in enumerate([0,47,100,141,170,271]):sheet.paste(images[n],((i%3)*840,(i//3)*510))
 palette=sheet.quantize(colors=128,method=Image.Quantize.MEDIANCUT)
 frames=[im.quantize(palette=palette,dither=Image.Dither.NONE) for im in images]
 gif=OUT/'silicone-vacuum-casting-3d.gif'
 frames[0].save(gif,save_all=True,append_images=frames[1:],duration=80,loop=0,optimize=True,disposal=1)
 images[-1].save(OUT/'silicone-vacuum-casting-3d-poster.png',optimize=True)
 sheet.resize((1260,510),Image.Resampling.LANCZOS).save(Path(tempfile.gettempdir())/'profabx-silicone-casting-3d-storyboard.png')
 encoded=Image.open(gif);total=0
 for i in range(encoded.n_frames):encoded.seek(i);total+=encoded.info['duration']
 assert total==sum(stage[2] for stage in STAGES)*80 and encoded.info['loop']==0
 offsets=[];count=0
 for a,b,n in STAGES:offsets.append(count*80);count+=n
 meta={'format':'GIF89a','style':'Original 3D isometric engineering illustration, blue/white palette','encodedFrames':encoded.n_frames,'durationMs':total,'loop':0,'width':840,'height':510,'file':gif.name,'stages':[{'title':a,'description':b,'startTimeMs':offsets[i],'durationMs':n*80}for i,(a,b,n)in enumerate(STAGES)],'references':[{'title':'WACKER – Vacuum casting with silicone molds','url':'https://www.wacker.com/h/medias/7869-EN.pdf','page':1},{'title':'Renishaw – Vacuum casting systems','url':'https://www.renishaw.com/resourcecentre/en/download/(9a351e67784c4e27992e5e3632434b1f)','page':4},{'title':'Smooth-On – Two-piece silicone mold tutorial (video)','url':'https://www.youtube.com/watch?v=SLtwKOorUDw'}],'note':'The mold halves contain actual negative surfaces matching the stepped cylindrical master, with separate sprue and vent. Transparent silicone exposes continuous resin fill. Silicone curing and casting-resin curing are separate stages. Times are compressed, not manufacturing settings.'}
 (OUT/'silicone-casting-sources.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
 print('3D GIF:',encoded.n_frames,'frames;',total,'ms;',gif.stat().st_size,'bytes')
if __name__=='__main__':main()
