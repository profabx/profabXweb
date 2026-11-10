import {createRequire} from 'node:module';
const slicingService=createRequire(import.meta.url)('./scripts/slicing/service.cjs');
const liveService=createRequire(import.meta.url)('./scripts/live-link/service.cjs');
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
export default defineConfig({define:{__PROFABX_ADMIN__:JSON.stringify(process.env.PROFABX_ADMIN==='1')},base:'./',plugins:[react(),{name:'profabx-local-slicing',configureServer(server){const handler=slicingService.createSlicingHandler(process.cwd()),live=liveService.createLiveHandler(process.cwd());server.middlewares.use((req,res,next)=>{if(req.url?.startsWith('/api/live-link/')){void live(req,res,new URL(req.url,'http://localhost').pathname);return;}if(!req.url?.startsWith('/api/slicing/'))return next();handler(req,res,new URL(req.url,'http://localhost').pathname).catch(e=>{res.statusCode=500;res.end(JSON.stringify({error:e.message}));});});}}],build:{outDir:process.env.PROFABX_ADMIN==='1'?'dist-admin':'dist',rollupOptions:{input:{index:resolve('index.html'),prototype:resolve('prototype.html'),cmf:resolve('cmf.html'),partners:resolve('partners.html'),about:resolve('about.html')}}}});

