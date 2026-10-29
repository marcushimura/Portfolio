// In-process handler tests: no network listener, provider calls, or real credentials.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {EventEmitter}=require('node:events');
const {createGuideHandler}=require('../backend/guide-api.cjs');
const {loadKnowledge,selectKnowledge}=require('../backend/knowledge.cjs');
const knowledge=loadKnowledge();
const question='Quanto tempo durou o Origami e quem participou?';
const context=selectKnowledge(question,[],knowledge);
async function request(sources,{answer='O Origami durou um mês e envolveu um designer e um desenvolvedor front-end.',finish='stop'}={}){
 const handler=createGuideHandler({knowledge,env:{GROQ_API_KEY:'fake-test-key'},fetchImpl:async()=>({ok:true,json:async()=>({choices:[{finish_reason:finish,message:{content:JSON.stringify({answer,sources:sources.map(source_id=>({source_id}))})}}]})})});
 const req=new EventEmitter(); Object.assign(req,{method:'POST',headers:{origin:'http://localhost:4173','content-type':'application/json'},socket:{remoteAddress:'test'}});
 const res=new EventEmitter();let status,body;
 Object.assign(res,{writeHead(value){status=value},end(value){body=JSON.parse(value);this.writableEnded=true}});
 const pending=handler(req,res,'/api/guide');req.emit('data',Buffer.from(JSON.stringify({question})));req.emit('end');await pending;
 return {status,body};
}
const meta=['origami:meta:0','origami:meta:1','origami:meta:2'];
test('Three valid passages reproduce the observed provider response and become one case',async()=>{
 const {status,body}=await request(meta);assert.equal(status,200);assert.equal(body.sources.length,1);assert.equal(body.sources[0].caseId,'origami');
 assert.equal(body.sources[0].quote,meta.map(id=>context.evidence.get(id).quote).join('\n\n'));
 assert(!JSON.stringify(body).includes('fake-test-key'));
});
test('Duplicate passages do not duplicate canonical quotes',async()=>{
 const {status,body}=await request([meta[0],meta[0],meta[1]]);assert.equal(status,200);assert.equal(body.sources[0].quote,[meta[0],meta[1]].map(id=>context.evidence.get(id).quote).join('\n\n'));
});
test('Third unsupported source is rejected, never dropped to fit a limit',async()=>assert.equal((await request([meta[0],meta[1],'origami:fake:0'])).status,502));
test('At most two distinct cases, each with its original passages',async()=>{
 const {status,body}=await request([...meta,'spend-management:summary']);assert.equal(status,200);assert.equal(body.sources.length,2);assert.equal(body.sources[1].quote,context.evidence.get('spend-management:summary').quote);
});
test('Three distinct cases are still rejected',async()=>assert.equal((await request([meta[0],'spend-management:summary','profile:summary'])).status,502));
test('More than eight input passages are bounded',async()=>assert.equal((await request(Array(9).fill(meta[0]))).status,502));
test('Truncated answers remain rejected even with valid source IDs',async()=>assert.equal((await request(meta,{finish:'length'})).status,502));
test('An answer without evidence may report missing information',async()=>{const {status,body}=await request([],{answer:'Essa informação não consta nos cases.'});assert.equal(status,200);assert.deepEqual(body.sources,[])});
