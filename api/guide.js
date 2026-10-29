const {PassThrough}=require('node:stream');
const {createGuideHandler}=require('../backend/guide-api.cjs');
const {createSharedQuota}=require('../backend/shared-quota.cjs');
const consumeQuota=createSharedQuota();
// Public serverless calls require shared quotas and explicit origins.
const origins=process.env.GUIDE_ALLOWED_ORIGINS||[
 'https://marcushimura.com.br','https://www.marcushimura.com.br',
 'https://marcushimura.github.io','https://portfolio-chi-three-1xct65oqug.vercel.app',
 'https://portfolio-git-deploy-vercel-assistant-projeto-pessoal12.vercel.app',
 ...(process.env.VERCEL_URL?['https://'+process.env.VERCEL_URL]:[])
].join(',');
const env={...process.env,GUIDE_ALLOWED_ORIGINS:origins,...(!consumeQuota?{GROQ_API_KEY:''}:{})};
const handle=createGuideHandler({env,consumeQuota});
module.exports=async function(req,res){
 const pathname=new URL(req.url,'https://localhost').pathname;
 if(req.body!==undefined){
  const input=new PassThrough();
  Object.assign(input,{method:req.method,headers:req.headers,socket:{remoteAddress:req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown'}});
  const pending=handle(input,res,pathname);
  input.end(typeof req.body==='string'||Buffer.isBuffer(req.body)?req.body:JSON.stringify(req.body));
  if(await pending)return;
 }else if(await handle(req,res,pathname))return;
 res.statusCode=404;res.end();
};
