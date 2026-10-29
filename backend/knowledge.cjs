const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const excluded=/^(image|images|src|href|cover|gallery|fileStructure|codeSample|prototype|template|files|emphasis|componentsDemo|.*Img|.*Image)$/i;
function clean(value){
 if(typeof value==='string')return /<\/?(?:html|script|svg|div)\b/i.test(value)?undefined:value;
 if(Array.isArray(value))return value.map(clean).filter(x=>x!==undefined);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!excluded.test(k)).map(([k,v])=>[k,clean(v)]).filter(([,v])=>v!==undefined));
 return undefined;
}
function strings(value){if(typeof value==='string')return [value];if(Array.isArray(value))return value.flatMap(strings);if(value&&typeof value==='object'){if(typeof value.label==='string'&&typeof value.value==='string')return [value.label+': '+value.value];return Object.values(value).flatMap(strings);}return [];}
function loadKnowledge(directory=path.resolve(__dirname,'..')){
 const scope={window:{}};vm.createContext(scope);
 for(const file of ['portfolio-data.js','portfolio-spend-data.js','portfolio-origami-data.js'])vm.runInContext(fs.readFileSync(path.join(directory,file),'utf8'),scope,{timeout:1000});
 const data=scope.window.PORTFOLIO_DATA;
 const profile={id:'profile',name:data.name,role:data.role,about:data.about};
 const cases=data.cases.map(item=>({id:item.id,title:item.title,category:item.category,tagline:item.tagline,metrics:clean(item.metrics),content:clean(item.story||item.sections)}));
 const documents=[profile,...cases];
 return {documents,text:JSON.stringify(documents),sources:new Map(documents.map(doc=>[doc.id,strings(doc).join('\n')]))};
}
function selectKnowledge(question,history,knowledge,maxChars=8500){
 const norm=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const stop=new Set(['qual','quais','como','sobre','para','com','uma','que','seu','sua','voce','marcus','experiencia','trabalho','projeto','projetos','tem','dos','das','por','mais']);
 const query=norm(question+' '+history.filter(m=>m.role==='user').slice(-1).map(m=>m.content).join(' '));
 const terms=[...new Set(query.match(/[a-z0-9]+/g)||[])].filter(t=>(t.length>2||t==='ia')&&!stop.has(t));
 const docs=knowledge.documents.map(doc=>({id:doc.id,title:doc.title||doc.name,summary:doc.tagline||doc.about,meta:doc.content?.meta||Object.entries(doc.content?.overview||{}).filter(([key])=>['duration','role','team','platforms'].includes(key)).map(([label,value])=>({label,value})),metrics:doc.metrics,passages:[]}));
 const render=()=>{
  const evidence=new Map();
  for(const doc of docs){
   const add=(suffix,quote)=>{if(quote&&quote.length>=12)evidence.set(doc.id+':'+suffix,{caseId:doc.id,quote});};
   add('summary',doc.summary);
   (doc.meta||[]).forEach((entry,i)=>add('meta:'+i,entry.label+': '+entry.value));
   (doc.metrics||[]).forEach((entry,i)=>add('metric:'+i,entry.value+' — '+entry.label));
   doc.passages.forEach((quote,i)=>add('passage:'+i,quote));
  }
  const text=[...evidence].map(([id,source])=>'SOURCE_ID: '+id+'\nCASE: '+source.caseId+'\nTRECHO: '+source.quote).join('\n\n');
  return {text,evidence};
 };
 const ranked=knowledge.documents.flatMap(doc=>strings(doc.content).filter(t=>t.length>45&&t.length<=1200).map(value=>({id:doc.id,value,score:terms.reduce((sum,term)=>sum+(norm(value).includes(term)?2:0)+(norm(doc.title||'').includes(term)?2:0),0)}))).sort((a,b)=>b.score-a.score);
 for(const item of ranked){
  if(!item.score)continue;
  const doc=docs.find(doc=>doc.id===item.id);if(doc.passages.includes(item.value)||doc.passages.length>=6)continue;
  doc.passages.push(item.value);if(render().text.length>maxChars)doc.passages.pop();
 }
 return {documents:docs,...render(),sources:new Map(docs.map(doc=>[doc.id,strings(doc).join('\n')]))};
}
module.exports={loadKnowledge,selectKnowledge};
