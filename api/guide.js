const {PassThrough}=require('node:stream');
const {createGuideHandler}=require('../backend/guide-api.cjs');
const handle=createGuideHandler();
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
