const {createHash}=require('node:crypto');
const script=`local d=tonumber(redis.call('GET',KEYS[1]) or '0'); local m=tonumber(redis.call('GET',KEYS[2]) or '0'); if d>=tonumber(ARGV[1]) or m>=6 then return 0 end; redis.call('INCR',KEYS[1]); redis.call('EXPIRE',KEYS[1],172800); redis.call('INCR',KEYS[2]); redis.call('EXPIRE',KEYS[2],120); return 1`;
function createSharedQuota({env=process.env,fetchImpl=fetch,now=()=>Date.now()}={}){
 const url=env.KV_REST_API_URL||env.UPSTASH_REDIS_REST_URL;
 const token=env.KV_REST_API_TOKEN||env.UPSTASH_REDIS_REST_TOKEN;
 if(!url||!token)return null;
 const endpoint=new URL(url);if(endpoint.protocol!=='https:')throw new Error('HTTPS required for quota storage');
 const max=Math.max(1,Math.min(1000,Number(env.GUIDE_DAILY_REQUEST_LIMIT)||50));
 const namespace=env.VERCEL_ENV==='production'?'production':'preview';
 return async function(ip){
  const time=now(),day=new Date(time).toISOString().slice(0,10),minute=Math.floor(time/60000);
  const hash=createHash('sha256').update(String(ip)).digest('hex');
  const prefix='portfolio-guide:'+namespace+':';
  const r=await fetchImpl(endpoint.href,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},signal:AbortSignal.timeout(3000),body:JSON.stringify(['EVAL',script,2,prefix+'day:'+day,prefix+'ip:'+minute+':'+hash,max])});
  if(!r.ok)throw new Error('Quota unavailable');
  const body=await r.json();if(body.error||![0,1].includes(body.result))throw new Error('Invalid quota result');
  return body.result===1;
 };
}
module.exports={createSharedQuota};
