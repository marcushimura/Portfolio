function OrigamiShowcase() {
  const colors=[['primaryBase','#792FAD'],['primarySofter','#F1E7F6'],['neutralStronger','#1C1C1C'],['neutralStrong','#474747'],['neutralSoft','#D4D4D4'],['neutralSoftest','#FFFFFF']];
  return <section className="origami-component-gallery" aria-label="Fundamentos do Origami">
    <div className="origami-component-gallery__heading"><div><h3>Foundations</h3><p>Tokens, tipografia, botões e ícones que orientam a criação das interfaces.</p></div></div>
    <div className="origami-demo origami-demo--surface origami-foundations">
      <section className="origami-foundations__section"><h4>Tokens de cor</h4><div className="origami-foundations__colors">{colors.map(([name,color])=><div key={name}><span className="origami-foundations__swatch" style={{backgroundColor:color}} aria-hidden="true"/><strong>{name}</strong><code>{color}</code></div>)}</div>
        <h5>Espaçamento</h5><div className="origami-foundations__spacing">{[4,8,12,16,20].map(size=><div key={size}><span style={{width:size,height:size}} aria-hidden="true"/><code>{size}px</code></div>)}</div>
      </section>
      <section className="origami-foundations__section"><h4>Tipografia</h4><div className="origami-foundations__type"><div><span className="origami-foundations__letters">Aa</span><strong>Inter</strong><p>Regular · Medium · Semibold · Bold</p></div><div className="origami-foundations__scale">{[[32,'Título'],[24,'Subtítulo'],[20,'Seção'],[16,'Texto de apoio'],[14,'Texto da interface']].map(([size,label])=><div key={size}><span style={{fontSize:size}}>{label}</span><code>{size}px</code></div>)}</div></div></section>
      <section className="origami-foundations__section"><h4>Botões</h4><div className="origami-demo-row">{[['contained','Primário'],['outlined','Secundário'],['text','Texto'],['ghost','Neutro']].map(([variant,label])=><button type="button" key={variant} className={'sds-button sds-button--'+variant+' sds-button--md'}>{label}</button>)}<button type="button" className="sds-button sds-button--contained sds-button--md" disabled>Desabilitado</button></div></section>
      <section className="origami-foundations__section"><h4>Ícones</h4><div className="origami-foundations__icons">{[['menu','Menu'],['arrow_upward','Seta para cima'],['arrow_downward','Seta para baixo']].map(([name,label])=><div key={name}><span aria-hidden="true" dangerouslySetInnerHTML={{__html:window.ORIGAMI_COMPONENT_ASSETS.icons[name]}}/><span>{label}</span></div>)}</div></section>
    </div>
  </section>;
}
Object.assign(window,{OrigamiShowcase});
if(typeof document!=='undefined'&&typeof document.getElementById==='function'){
  const root=document.getElementById('origami-components-root');
  if(root)ReactDOM.createRoot(root).render(<OrigamiShowcase/>);
}
