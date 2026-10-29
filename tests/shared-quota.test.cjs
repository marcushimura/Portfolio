const {test}=require('node:test'),assert=require('node:assert/strict');
const {createSharedQuota}=require('../backend/shared-quota.cjs');
const env={KV_REST_API_URL:'https://redis.example',KV_REST_API_TOKEN:'dummy',VERCEL_ENV:'production'};
test('Missing configuration disables shared quota',()=>assert.equal(createSharedQuota({env:{}}),null));
test('Atomic limits use hashed client and shared day key',async()=>{let payload;const consume=createSharedQuota({env,now:()=>0,fetchImpl:async(url,opts)=>{payload=JSON.parse(opts.body);return {ok:true,json:async()=>({result:1})}}});assert.equal(await consume('192.0.2.1'),true);assert.equal(payload[0],'EVAL');assert(payload[3].includes('production:day:1970-01-01'));assert(!JSON.stringify(payload).includes('192.0.2.1'))});
test('Exhausted shared quota denies request',async()=>{const consume=createSharedQuota({env,fetchImpl:async()=>({ok:true,json:async()=>({result:0})})});assert.equal(await consume('ip'),false)});
test('Storage failure never grants quota',async()=>{const consume=createSharedQuota({env,fetchImpl:async()=>({ok:false})});await assert.rejects(consume('ip'))});
test('Malformed response never grants quota',async()=>{const consume=createSharedQuota({env,fetchImpl:async()=>({ok:true,json:async()=>({error:'failure'})})});await assert.rejects(consume('ip'))});
