// Evidence-based guide with a server-side AI service and local search fallback.
const guideSuggestions = ['B2B e SaaS', 'Design Systems', 'IA no processo de design'];
function normalizeGuideText(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
function findPortfolioEvidence(question, cases) {
  const query = normalizeGuideText(question);
  const stop = new Set(['qual','quais','como','sobre','para','com','uma','que','seu','sua','voce','marcus','experiencia','trabalho','projeto','projetos','tem','nos','dos','das','por','mais','uso','processo','design']);
  let terms = [...new Set(query.match(/[a-z0-9]+/g) || [])].filter(t => (t.length > 2 || t === 'ia') && !stop.has(t));
  if (/b2b|saas/.test(query)) terms.push('b2b','saas','governanca');
  if (/design systems?|sistema.*design|ui kit|componentes/.test(query)) terms.push('origami','biblioteca','componentes');
  if (/\bia\b|inteligencia artificial/.test(query)) terms.push('origami','inteligencia artificial','ai gateway');
  if (/pesquisa|research/.test(query)) terms.push('pesquisa','research','entrevistas');
  if (/pagamento|fintech/.test(query)) terms.push('pagamento','fintech');
  terms = [...new Set(terms)];
  return cases.map(item => {
    const sections = item.story?.sections || [];
    const intro = normalizeGuideText([item.title,item.category,item.tagline].join(' '));
    const searchable = normalizeGuideText(JSON.stringify([item.story || item.sections || {}, item.tagline]));
    const matches = terms.filter(t=>intro.includes(t)||searchable.includes(t)).length;
    const score = terms.reduce((sum,t) => sum + (intro.includes(t) ? 4 : searchable.includes(t) ? 1 : 0),0);
    const paragraphs = sections.flatMap(section => section.paragraphs || []);
    const ranked = paragraphs.map(text => ({text,score:terms.reduce((sum,t)=>sum+(normalizeGuideText(text).includes(t)?1:0),0)})).sort((a,b)=>b.score-a.score);
    return {id:item.id,title:item.title,category:item.category,summary:item.tagline,evidence:ranked[0]?.score ? ranked[0].text : null,score,matches};
  }).filter(item=>item.score>0 && item.matches>=Math.min(2,terms.length)).sort((a,b)=>b.score-a.score).filter((item,index,ranked)=>item.score>=ranked[0].score/2).slice(0,2);
}
function PortfolioGuide({ onCaseClick }) {
  const [question,setQuestion] = React.useState('');
  const [open,setOpen] = React.useState(false);
  const [turns,setTurns] = React.useState([]);
  const [mode,setMode] = React.useState('local');
  const [busy,setBusy] = React.useState(false);
  const requestRef = React.useRef(null);
  const apiBase = (window.PORTFOLIO_GUIDE_API || '').replace(/\/$/, '');
  React.useEffect(()=>{
    if(typeof fetch!=='function')return;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),3000);
    fetch(apiBase+'/api/guide/status',{signal:controller.signal}).then(response=>response.ok?response.json():null).then(status=>{if(!controller.signal.aborted&&status?.mode==='ai')setMode('ai');}).catch(()=>{}).finally(()=>clearTimeout(timer));
    return ()=>{clearTimeout(timer);controller.abort();requestRef.current?.abort();};
  },[apiBase]);
  const close = () => {
    requestRef.current?.abort();setBusy(false);setOpen(false);
    setTurns(previous=>previous.map(turn=>turn.pending?{...turn,pending:false,error:'Consulta cancelada.'}:turn));
  };
  const dialogRef = React.useRef(null), feedRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement, root = document.getElementById('root');
    const wasInert = root.inert, overflow = document.body.style.overflow;
    root.inert = true; document.body.style.overflow = 'hidden';
    dialogRef.current.querySelector('button').focus({preventScroll:true});
    const keydown = event => {
      if(event.key==='Escape'){event.preventDefault();close();return;}
      if(event.key!=='Tab')return;
      const controls = [...dialogRef.current.querySelectorAll('button:not(:disabled), input, a[href]')].filter(el=>el.getClientRects().length);
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&(document.activeElement===first||!dialogRef.current.contains(document.activeElement))){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||!dialogRef.current.contains(document.activeElement))){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',keydown);
    return ()=>{root.inert=wasInert;document.body.style.overflow=overflow;document.removeEventListener('keydown',keydown);if(previous?.isConnected)previous.focus({preventScroll:true});};
  },[open]);
  React.useEffect(()=>{
    if(!open||!feedRef.current)return;
    const feed=feedRef.current, latest=feed.lastElementChild;
    if(latest)feed.scrollTop=Math.max(0,latest.offsetTop-feed.offsetTop);
  },[open,turns]);
  React.useEffect(()=>{
    // A disabled input loses focus in Chrome while the request is pending.
    if(open&&!busy&&document.activeElement===document.body)
      dialogRef.current?.querySelector('input')?.focus({preventScroll:true});
  },[open,busy]);
  const ask = async value => {
    const text=value.trim().slice(0,300);if(!text||busy||requestRef.current)return;
    const id=Date.now()+'-'+Math.random().toString(36).slice(2);
    const results=findPortfolioEvidence(text,window.PORTFOLIO_DATA.cases);
    setQuestion('');setOpen(true);
    if(mode!=='ai'){
      setTurns(previous=>[...previous.slice(-4),{id,question:text,results}]);return;
    }
    const history=turns.filter(turn=>turn.answer&&!turn.error).slice(-4).flatMap(turn=>[{role:'user',content:turn.question},{role:'assistant',content:turn.answer.slice(0,2000)}]);
    const controller=new AbortController();requestRef.current=controller;
    setBusy(true);setTurns(previous=>[...previous.slice(-4),{id,question:text,results,pending:true}]);
    try{
      const response=await fetch(apiBase+'/api/guide',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({question:text,history})});
      let body;
      try{body=await response.json();}catch{throw new Error('O serviço de respostas está indisponível. Tente novamente em instantes.');}
      if(!response.ok)throw new Error(body.error||'Não foi possível consultar a IA.');
      if(typeof body.answer!=='string'||!Array.isArray(body.sources))throw new Error('Resposta inválida.');
      const references=body.sources.filter(source=>source.caseId!=='profile').map(source=>{
        const item=window.PORTFOLIO_DATA.cases.find(item=>item.id===source.caseId);
        return item?{id:item.id,title:item.title,category:item.category,evidence:source.quote}:null;
      }).filter(Boolean).filter((reference,index,references)=>references.findIndex(item=>item.id===reference.id)===index);
      if(!controller.signal.aborted)setTurns(previous=>previous.map(turn=>turn.id===id?{...turn,pending:false,answer:body.answer,results:references}:turn));
    }catch(error){
      if(!controller.signal.aborted)setTurns(previous=>previous.map(turn=>turn.id===id?{...turn,pending:false,error:error instanceof TypeError?'Não foi possível conectar ao assistente. Tente novamente em instantes.':error.message,results}:turn));
    }finally{if(requestRef.current===controller){requestRef.current=null;setBusy(false);}}
  };
  const field = suffix => <form className="portfolio-guide__form" onSubmit={event=>{event.preventDefault();ask(question);}}>
    <label className="portfolio-guide__sr" htmlFor={'guide-question-'+suffix}>O que você gostaria de saber sobre meu trabalho?</label>
    <input id={'guide-question-'+suffix} value={question} onChange={event=>setQuestion(event.target.value)} maxLength={300} disabled={busy} autoComplete="off" placeholder="Pergunte sobre projetos, experiência ou processo…"/>
    <button type="submit" disabled={busy||!question.trim()} aria-label="Enviar pergunta"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
  </form>;
  return <section className="portfolio-guide" aria-labelledby="portfolio-guide-title">
    <div className="portfolio-guide__intro"><h2 id="portfolio-guide-title">Explore minha experiência</h2><p>Encontre os projetos e as decisões que mais se conectam ao que você procura.</p></div>
    <div className="portfolio-guide__entry">{field('home')}<div className="portfolio-guide__suggestions" aria-label="Sugestões de perguntas">{guideSuggestions.map(text=><button key={text} type="button" disabled={busy} onClick={()=>ask(text)}>{text}<span aria-hidden="true">↗</span></button>)}</div><p className="portfolio-guide__note">{mode==='ai'?'Assistente com IA · Respostas baseadas nos cases publicados.':'Guia baseado no conteúdo dos cases. Sem IA generativa nesta versão.'}</p></div>
    {open&&ReactDOM.createPortal(<div className="portfolio-guide__overlay" onClick={event=>{if(event.target===event.currentTarget)close();}}>
      <section className="portfolio-guide__panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="guide-dialog-title">
        <header><div><p className="portfolio-guide__eyebrow">GUIA DO PORTFÓLIO</p><h2 id="guide-dialog-title">Sobre meu trabalho</h2></div><button className="portfolio-guide__close" type="button" aria-label="Fechar guia" onClick={close}>×</button></header>
        <div className="portfolio-guide__feed" ref={feedRef} role="log" aria-label="Perguntas e conteúdos relacionados" aria-live="polite" aria-relevant="additions">{turns.map((turn,index)=><article key={turn.id||index} className="portfolio-guide__turn"><h3>{turn.question}</h3>{turn.pending?<p role="status" className="portfolio-guide__answer">Consultando os cases…</p>:<>{turn.answer&&<p className="portfolio-guide__answer portfolio-guide__generated">{turn.answer}</p>}{turn.error&&<p role="alert" className="portfolio-guide__answer">{turn.error} Abaixo, referências da busca local quando disponíveis.</p>}{turn.results.length?<><p className="portfolio-guide__answer">{turn.answer?'Referências utilizadas na resposta:':'Estes cases trazem experiências relacionadas à sua pergunta:'}</p>{turn.results.map(result=><div className="portfolio-guide__result" key={result.id}><p className="portfolio-guide__category">{result.category}</p><h4>{result.title}</h4><p>{result.evidence||result.summary}</p><button type="button" onClick={()=>{close();onCaseClick(result.id);}}>Explorar case <span aria-hidden="true">↗</span></button></div>)}</>:!turn.answer&&<p className="portfolio-guide__answer">Não encontrei uma referência clara nos cases para essa pergunta. Tente um projeto ou tema, como Origami, pagamentos ou pesquisa. Para outros assuntos, <a href={'mailto:'+window.PORTFOLIO_DATA.contact.email}>fale comigo</a>.</p>}</>}</article>)}</div>
        <footer>{field('panel')}<p className="portfolio-guide__note">{mode==='ai'?'Perguntas e histórico desta conversa são enviados à Groq para gerar as respostas.':'Trechos dos cases publicados · Sem respostas geradas por IA'}</p></footer>
      </section>
    </div>,document.body)}
  </section>;
}
Object.assign(window,{PortfolioGuide,findPortfolioEvidence});
