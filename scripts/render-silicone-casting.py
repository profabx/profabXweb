"""Render an original, source-checked cross-section GIF of silicone vacuum casting.
Requires Pillow. The exported GIF is committed; site builds do not run this script.
Reference: WACKER 7869-EN, steps 1-6; Renishaw Vacuum casting systems, p.4.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageChops
import math, json, tempfile
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/processes'
S=2; W,H=560,340
BLUE='#012ef7'; INK='#203047'; MUTED='#718099'; SIL='#e5ecff'; EDGE='#8ba5d8'; GRAY='#8c99ac'
FONT='C:/Windows/Fonts/msyh.ttc'
def font(n): return ImageFont.truetype(FONT,round(n*S))
def pt(points): return [(round(x*S),round(y*S)) for x,y in points]
def smooth(t): return max(0,min(1,t))**2*(3-2*max(0,min(1,t)))
def canvas(): return Image.new('RGB',(W*S,H*S),'white')
def text(im,xy,label,n=15,fill=INK,anchor=None):
 ImageDraw.Draw(im).text((round(xy[0]*S),round(xy[1]*S)),label,font=font(n),fill=fill,anchor=anchor)
def line(im,points,fill=EDGE,width=1): ImageDraw.Draw(im).line(pt(points),fill=fill,width=max(1,round(width*S)),joint='curve')
def rect(im,box,fill=None,outline=None,width=1,r=0):
 if box[2]<box[0] or box[3]<box[1]: return
 d=ImageDraw.Draw(im); box=tuple(round(v*S) for v in box)
 if r:d.rounded_rectangle(box,round(r*S),fill=fill,outline=outline,width=round(width*S))
 else:d.rectangle(box,fill=fill,outline=outline,width=round(width*S))
def poly(im,points,fill,outline=None,width=1):
 d=ImageDraw.Draw(im);d.polygon(pt(points),fill=fill)
 if outline:d.line(pt(points+[points[0]]),fill=outline,width=round(width*S),joint='curve')
def ellipse(im,box,fill=None,outline=None,width=1):ImageDraw.Draw(im).ellipse(tuple(round(v*S) for v in box),fill=fill,outline=outline,width=round(width*S))
def arrow(im,a,b,color=BLUE,width=2):
 line(im,[a,b],color,width);ang=math.atan2(b[1]-a[1],b[0]-a[0]);poly(im,[b,(b[0]-7*math.cos(ang-.5),b[1]-7*math.sin(ang-.5))],color)
# A stepped flange in cross-section. The very same contour is used for
# the master, negative mold cavity and solid cast: no printed layers.
PART=[(-21,153),(-21,202),(-49,202),(-49,231),(49,231),(49,202),(21,202),(21,153)]
def part_points(cx=280,dy=0,scale=1):return [(cx+x*scale,192+(y-192)*scale+dy) for x,y in PART]
def part(im,cx=280,dy=0,color=GRAY,scale=1,gate=False):
 poly(im,part_points(cx,dy,scale),color,INK if color==GRAY else '#0028bc',1.2)
 if gate:
  rect(im,(cx-5*scale,130+dy,cx+5*scale,153+dy),color)
  rect(im,(cx+47*scale,130+dy,cx+51*scale,203+dy),color)
def cavity_mask(gates=True):
 m=Image.new('L',(W*S,H*S));d=ImageDraw.Draw(m);d.polygon(pt(part_points()),fill=255)
 if gates:
  d.rectangle(tuple(round(v*S) for v in (275,116,285,155)),fill=255)
  d.rectangle(tuple(round(v*S) for v in (327,116,332,204)),fill=255)
 return m
CAVITY=cavity_mask()
def mold(im,opening=0,cavity=True):
 layer=canvas();rect(layer,(176,116,384,281),SIL,EDGE,1.4,r=2)
 # Hatching denotes silicone section material, not part layers.
 for x in range(40,430,16):line(layer,[(x,281),(x+165,116)],'#d3ddf7',.7)
 # Clip hatching to the outside block and expose the negative cavity.
 block=Image.new('L',(W*S,H*S));ImageDraw.Draw(block).rectangle(tuple(round(v*S) for v in (176,116,384,281)),fill=255)
 white=canvas();white.paste(layer,(0,0),block);layer=white
 if cavity:
  layer.paste('white',(0,0),CAVITY)
  line(layer,part_points()+[part_points()[0]],EDGE,1)
  line(layer,[(275,116),(275,153)],EDGE,1);line(layer,[(285,116),(285,153)],EDGE,1)
  line(layer,[(327,116),(327,202)],EDGE,1);line(layer,[(332,116),(332,202)],EDGE,1)
 # Each negative half moves as one object, preserving the mating contour.
 for left,x0,x1 in [(True,176,280),(False,280,385)]:
  piece=layer.crop((x0*S,115*S,x1*S,283*S));offset=-opening if left else opening
  im.paste(piece,(round((x0+offset)*S),115*S))
 if opening<1:
  for y in range(120,280,9):
   if not (153<=y<=231):line(im,[(280,y),(280,y+4)],'#9eafd1',.8)
 else:
  arrow(im,(176-opening-5,252),(162-opening,252),'#9cafce',1)
  arrow(im,(384+opening+5,252),(398+opening,252),'#9cafce',1)
def liquid(im,level,flow=False):
 mask=Image.new('L',(W*S,H*S));ImageDraw.Draw(mask).rectangle((0,round(level*S),W*S,H*S),fill=255)
 mask=ImageChops.multiply(mask,CAVITY);im.paste(BLUE,(0,0),mask)
 if flow:line(im,[(280,114),(280,max(116,level))],BLUE,3)
def cup(im,cx=280,y=90,color=BLUE):
 poly(im,[(cx-23,y),(cx+20,y),(cx+14,y+20),(cx-13,y+20)],'#edf2ff',EDGE,1)
 line(im,[(cx+14,y+20),(cx+6,y+24),(cx,y+23)],EDGE,1)
 line(im,[(cx-16,y+7),(cx+14,y+7)],color,3)
def chamber(im):
 rect(im,(139,86,421,292),None,'#a2b3d0',1.3,r=12)
 line(im,[(421,137),(456,137),(456,113)],'#a2b3d0',2)
 arrow(im,(456,113),(456,95),'#7186a9',1.5)
 text(im,(469,101),'真空排气',12,MUTED,anchor='mm')
def progress(im,t,color=BLUE,label='固化中'):
 x,y=444,190;ellipse(im,(x-19,y-19,x+19,y+19),None,'#e2e9f7',3)
 ImageDraw.Draw(im).arc(tuple(round(v*S) for v in (x-19,y-19,x+19,y+19)),start=-90,end=-90+max(.001,min(1,t))*360,fill=color,width=3*S)
 text(im,(x,y+35),label,12,MUTED,anchor='mm')
def base(im):
 line(im,[(105,287),(455,287)],'#e1e7f1',1)
 rect(im,(22,307,32,317),GRAY);text(im,(39,311),'原型',11,MUTED,anchor='lm')
 rect(im,(103,307,113,317),SIL,EDGE);text(im,(120,311),'硅胶模',11,MUTED,anchor='lm')
 rect(im,(202,307,212,317),BLUE);text(im,(219,311),'树脂复模件',11,MUTED,anchor='lm')
 text(im,(539,60),'剖面示意 · 时间已压缩',10,MUTED,anchor='rm')
STAGES=[
 ('原型与浇道准备','固定原型，规划浇口与排气通道',24),
 ('制作硅胶模具','浇注硅胶包覆原型，等待硅胶固化',32),
 ('分模并取出原型','留下与原型形状一致的模腔',28),
 ('合模与真空浇注','经浇口注入树脂，真空辅助排气',40),
 ('树脂固化','模具保持合拢，按材料条件固化',24),
 ('开模取件与去浇口','取出整体成型的复制件，修整浇口',40)
]
def frame(stage,t):
 im=canvas();title,sub,_=STAGES[stage]
 text(im,(22,18),f'{stage+1:02d}  {title}',21,INK)
 text(im,(23,50),sub,13,MUTED)
 # A short step rail makes the process order visible even in a looping GIF.
 for i in range(6):rect(im,(22+i*86,78,91+i*86,80),BLUE if i<=stage else '#e3e9f5')
 if stage==0:
  rect(im,(176,116,384,281),None,'#c0ccdf',1)
  part(im,gate=True);text(im,(279,270),'原型',12,MUTED,anchor='mm')
  arrow(im,(373,145),(331,151),MUTED,1);text(im,(396,135),'排气道',11,MUTED,anchor='mm')
 elif stage==1:
  rect(im,(176,116,384,281),None,'#bccbe0',1.2)
  fill=smooth(min(1,t/.57));top=281-165*fill
  rect(im,(177,top,383,280),SIL)
  part(im,gate=True)
  if t<.6:
   cup(im,200,90,'#abbce7');line(im,[(200,114),(200,top)],'#a5b9ec',3)
  else:progress(im,(t-.6)/.4,label='硅胶固化')
 elif stage==2:
  opening=60*smooth(t/.45);mold(im,opening)
  if t<.73:part(im,dy=-43*smooth((t-.4)/.33),gate=True)
  else:part(im,cx=90,dy=-6,scale=.6);text(im,(90,244),'原型已取出',11,MUTED,anchor='mm')
 elif stage==3:
  opening=60*(1-smooth(t/.18));chamber(im);mold(im,opening)
  if t>.2:
   fill=smooth((t-.2)/.64);liquid(im,281-165*fill,flow=t<.89);cup(im)
   # Air bubbles travel up the actual vent, not through solid silicone.
   if t<.88:
    for j in range(3):
     y=200-75*((t*3+j/3)%1);ellipse(im,(328,y-1.5,331,y+1.5),'white',EDGE,.6)
 elif stage==4:
  mold(im);liquid(im,116);progress(im,t,label='树脂固化')
 elif stage==5:
  opening=65*smooth(t/.28);mold(im,opening)
  if t<.72:
   part(im,dy=-43*smooth((t-.2)/.3),color=BLUE,gate=t<.6)
   if .49<t<.64:
    line(im,[(265,105),(293,114)],'#f09a41',2)
  else:
   # Identical contour and scale: compare master and replica after trimming.
   im=canvas();text(im,(22,18),f'06  {title}',21,INK);text(im,(23,50),sub,13,MUTED)
   for i in range(6):rect(im,(22+i*86,78,91+i*86,80),BLUE)
   part(im,cx=174,color=GRAY,scale=1.25);part(im,cx=390,color=BLUE,scale=1.25)
   text(im,(174,264),'原型',14,MUTED,anchor='mm');text(im,(390,264),'复模件',14,BLUE,anchor='mm')
   arrow(im,(259,193),(302,193),'#9cafce',2)
 base(im)
 return im.resize((840,510),Image.Resampling.LANCZOS)
def main():
 OUT.mkdir(parents=True,exist_ok=True);frames=[];offsets=[]
 # Use one shared palette to avoid frame-to-frame color flicker.
 samples=[frame(i,.75) for i in range(6)]
 sheet=Image.new('RGB',(840*3,510*2),'white')
 for i,img in enumerate(samples):sheet.paste(img,((i%3)*840,(i//3)*510))
 palette=sheet.quantize(colors=128,method=Image.Quantize.MEDIANCUT)
 for i,(_,_,count) in enumerate(STAGES):
  offsets.append(len(frames))
  for j in range(count):frames.append(frame(i,j/max(1,count-1)).quantize(palette=palette,dither=Image.Dither.NONE))
 frames[0].save(OUT/'silicone-vacuum-casting.gif',save_all=True,append_images=frames[1:],duration=80,loop=0,optimize=True,disposal=1)
 frame(5,1).save(OUT/'silicone-vacuum-casting-poster.png',optimize=True)
 sheet.resize((1260,510)).save(Path(tempfile.gettempdir())/'profabx-silicone-casting-storyboard.png',optimize=True)
 meta={'format':'GIF89a','loop':0,'frameDurationMs':80,'width':840,'height':510,'stages':[{'title':a,'description':b,'startTimeMs':offsets[i]*80,'durationMs':n*80}for i,(a,b,n)in enumerate(STAGES)],'references':[{'title':'WACKER – Vacuum casting with silicone molds','url':'https://www.wacker.com/h/medias/7869-EN.pdf','page':1},{'title':'Renishaw – Vacuum casting systems','url':'https://www.renishaw.com/resourcecentre/en/download/(9a351e67784c4e27992e5e3632434b1f)','page':4},{'title':'Smooth-On – Two-piece silicone mold tutorial (video)','url':'https://www.youtube.com/watch?v=SLtwKOorUDw'}],'note':'Original cross-section diagram. Silicone cure and casting-resin cure are separate stages. Resin fills a pre-existing cavity continuously; the cast is not built in printed layers. Times are illustrative, not process settings.'}
 (OUT/'silicone-casting-sources.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
 print('GIF',len(frames),'frames,', (OUT/'silicone-vacuum-casting.gif').stat().st_size,'bytes')
if __name__=='__main__':main()
