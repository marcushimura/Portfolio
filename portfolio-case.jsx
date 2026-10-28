// portfolio-case.jsx
const { useState, useEffect } = React;

function CaseNav({ title, onBack, darkMode, onToggleDark }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.getElementById('case-content');
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      setProgress(Math.min(100, Math.max(0, -el.getBoundingClientRect().top / total * 100)));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className="case-nav" aria-label="Navegação do case">
      <button className="case-nav__back" onClick={onBack}>← Voltar</button>
      <div className="case-nav__div" />
      <span className="case-nav__title">{title}</span>
      <button className="nav__theme-btn" onClick={onToggleDark} aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'} title={darkMode ? 'Modo claro' : 'Modo escuro'} style={{ marginLeft: 'auto' }}>
        {darkMode ? '☀' : '☾'}
      </button>
      <div className="case-nav__progress" style={{ width: `${progress}%` }} />
    </nav>);

}

function CaseBanner({ item }) {
  const cover = window.getCaseCover(item);
  return cover ? <div className="case-banner"><img src={cover} alt={item.title} fetchPriority="high" /></div> : null;
}

function CaseHero({ item }) {
  return (
    <header className="case-hero">
      <CaseBanner item={item} />
      <div className="case-hero__cat">{item.category} · {item.year}</div>
      <h1 className="case-hero__title">{item.title}</h1>
      <p className="case-hero__tagline">{item.tagline}</p>
      <div className="case-hero__metrics">
        {item.metrics.map((m) =>
        <div key={m.label}>
            <div className="case-hero__m-val">{m.value}</div>
            <div className="case-hero__m-lbl">{m.label}</div>
          </div>
        )}
      </div>
      {item.sections?.overview &&
      <div className="case-hero__meta">
          {[
        { l: 'Duração', v: item.sections.overview.duration },
        { l: 'Papel', v: item.sections.overview.role },
        { l: 'Time', v: item.sections.overview.team },
        { l: 'Plataformas', v: item.sections.overview.platforms }].
        map(({ l, v }) =>
        <div key={l}>
              <div className="case-hero__m-label">{l}</div>
              <div className="case-hero__m-value">{v}</div>
            </div>
        )}
        </div>
      }
    </header>);

}

function Sec({ label, children }) {
  return (
    <RevealWrapper>
      <section className="cs">
        <div className="cs__label">{label}</div>
        {children}
      </section>
    </RevealWrapper>);

}

function OverviewSec({ s }) {
  return (
    <Sec label="01 · Visão Geral">
      <h2 className="cs__headline" style={{ width: "615px" }}>{s.headline}</h2>
      <div className="cs__2col">
        <div>
          <p className="cs__body" style={{ width: "649px" }}>{s.description}</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {s.tags.map((t) =>
            <span key={t} style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid var(--border-mid)', padding: '0.3rem 0.7rem' }}>{t}</span>
            )}
          </div>
        </div>
        <div />
      </div>
    </Sec>);

}

function OpportunitySec({ s }) {
  return (
    <Sec label="02 · Oportunidade">
      <h2 className="cs__headline">{s.headline}</h2>
      <div className="cs__2col">
        <div>
          <p className="cs__body">{s.problem}</p>
          {s.context && <p className="cs__body" style={{ marginTop: '1.5rem' }}>{s.context}</p>}
        </div>
        {s.howMightWe ?
        <div style={{ padding: '2.5rem', background: 'var(--fg)', color: 'var(--bg)' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: 0.45 }}>How Might We</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 300, lineHeight: 1.45, fontStyle: 'italic' }}>"{s.howMightWe}"</p>
          </div> :
        <div />}
      </div>
    </Sec>);

}

function PlanningSec({ s }) {
  return (
    <Sec label="03 · Planejamento">
      <h2 className="cs__headline">{s.headline}</h2>
      <p className="cs__body" style={{ marginBottom: '3rem' }}>{s.methodology}</p>
      <div>
        {s.phases.map((p, i) =>
        <div key={i} className="tl-item">
            <span className="tl-item__name">{p.name}</span>
            <span className="tl-item__dur">{p.duration}</span>
            <span className="tl-item__acts">{p.activities}</span>
          </div>
        )}
      </div>
    </Sec>);

}

function ResearchSec({ s }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <Sec label="04 · Pesquisa">
      <h2 className="cs__headline">{s.headline}</h2>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      {s.competitiveImg || s.valueCanvasImg ?
      <div style={{ marginBottom: s.insights.length ? '3rem' : 0 }}>
          <p className="cs__body" style={{ marginBottom: '2rem' }}>{s.method}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
            {s.competitiveImg &&
          <img src={s.competitiveImg} alt="Mapa de afinidade"
          style={{ width: '100%', display: 'block', cursor: 'pointer' }}
          onClick={() => setLightbox({ src: s.competitiveImg, alt: 'Mapa de afinidade' })} />
          }
            {s.valueCanvasImg &&
          <img src={s.valueCanvasImg} alt="Value Proposition Canvas"
          style={{ width: '100%', display: 'block', cursor: 'pointer' }}
          onClick={() => setLightbox({ src: s.valueCanvasImg, alt: 'Value Proposition Canvas' })} />
          }
          </div>
        </div> :

      <p className="cs__body" style={{ marginBottom: s.insights.length ? '3rem' : 0 }}>{s.method}</p>
      }
      {s.insights.length > 0 &&
      <div className="cs__3col" style={{ marginTop: '2rem' }}>
          {s.insights.map((ins, i) =>
        <div key={i} className="insight">
              <div className="insight__tag">Insight 0{i + 1}</div>
              <div className="insight__title">{ins.title}</div>
              <div className="insight__body">{ins.description}</div>
            </div>
        )}
        </div>
      }
    </Sec>);

}

function IdeationSec({ s }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <Sec label="05 · Ideação">
      <h2 className="cs__headline">{s.headline}</h2>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      {s.wireframesImg ?
      <div className="cs__2col" style={{ marginBottom: s.concepts.length ? '3rem' : 0 }}>
          <p className="cs__body">{s.description}</p>
          <img src={s.wireframesImg} alt="Wireframes"
        style={{ width: '100%', display: 'block', cursor: 'pointer' }}
        onClick={() => setLightbox({ src: s.wireframesImg, alt: 'Wireframes' })} />
        
        </div> :

      <p className="cs__body" style={{ marginBottom: '3rem' }}>{s.description}</p>
      }
      {s.concepts.length > 0 &&
      <div className="cs__3col" style={{ marginTop: '2rem' }}>
        {s.concepts.map((c, i) =>
        <div key={i} className={`concept${c.name.slice(-1) === s.chosen ? ' concept--chosen' : ''}`}>
            <div className="concept__tag">{c.name}</div>
            <div className="concept__title">{c.subtitle}</div>
            <div className="concept__body">{c.description}</div>
            {c.name.slice(-1) === s.chosen && <div className="concept__badge">Escolhido</div>}
          </div>
        )}
        </div>
      }
      {s.rationale &&
      <p className="cs__body" style={{ marginTop: '2rem', fontStyle: 'italic', borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem' }}>
          {s.rationale}
        </p>
      }
    </Sec>);

}

function MobileFrame({ src, alt, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        width: '240px', height: '480px',
        border: '8px solid #1a1a1a', borderRadius: '32px',
        boxShadow: '0 0 0 2px #333, 0 16px 40px rgba(0,0,0,0.25)',
        overflow: 'hidden', position: 'relative',
        background: '#fff', flexShrink: 0
      }}>
        {/* notch */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '18px', background: '#1a1a1a', borderRadius: '0 0 12px 12px', zIndex: 2 }} />
        <div style={{ width: '100%', height: '100%', overflowY: 'scroll', overflowX: 'hidden', paddingTop: '18px' }}>
          <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
      {label && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em', textAlign: 'center' }}>{label}</div>}
    </div>);

}

function WireframesSec({ s }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <Sec label="05.5 · Wireframes">
      <h2 className="cs__headline">{s.headline}</h2>
      <p className="cs__body" style={{ marginBottom: '2.5rem', maxWidth: '62ch' }}>{s.description}</p>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {s.images.map((img, i) =>
        <div key={i} style={{ cursor: 'pointer' }} onClick={() => setLightbox({ src: img.src, alt: img.label })}>
            <img src={img.src} alt={img.label} style={{ width: '100%', display: 'block', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.85'} onMouseLeave={(e) => e.target.style.opacity = '1'} />
            {img.label && <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.6rem', letterSpacing: '0.05em' }}>{img.label}</div>}
          </div>
        )}
      </div>
    </Sec>);

}

function UISec({ s }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <Sec label="06 · UI">
      <h2 className="cs__headline">{s.headline}</h2>
      <p className="cs__body" style={{ marginBottom: '3rem', width: "757px" }}>{s.description}</p>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      {s.mobileImages ?
      <div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: '3rem' }}>
            {s.mobileImages.map((img, i) =>
          <MobileFrame key={i} src={img.src} alt={img.label} label={img.label} />
          )}
          </div>
          {s.highlights.length > 0 &&
        <div style={{ marginTop: '2rem' }}>
              {s.highlights.map((h, i) =>
          <div key={i} className="ui-hl"><div className="ui-hl__dot" /><div className="ui-hl__text">{h}</div></div>
          )}
            </div>
        }
        </div> :
      s.images && s.images.length === 1 ?
      <div className="cs__2col" style={{ alignItems: 'start' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => setLightbox({ src: s.images[0].src, alt: s.images[0].label })}>
            <img src={s.images[0].src} alt={s.images[0].label} style={{ width: '100%', display: 'block' }} onMouseEnter={(e) => e.target.style.opacity = '0.85'} onMouseLeave={(e) => e.target.style.opacity = '1'} />
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{s.images[0].label}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {s.highlights.length > 0 && s.highlights.map((h, i) =>
          <div key={i} className="ui-hl"><div className="ui-hl__dot" /><div className="ui-hl__text">{h}</div></div>
          )}
          </div>
        </div> :
      s.images && s.images.length > 1 ?
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {s.images.map((img, i) =>
        <div key={i} style={{ cursor: 'pointer' }} onClick={() => setLightbox({ src: img.src, alt: img.label })}>
              <img src={img.src} alt={img.label} style={{ width: '100%', display: 'block', borderRadius: '4px', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.target.style.opacity = '0.85'} onMouseLeave={(e) => e.target.style.opacity = '1'} />
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{img.label}</div>
            </div>
        )}
        </div> :

      <div />
      }
      {s.highlights.length > 0 &&
      <div style={{ marginTop: '2rem' }}>
          {s.highlights.map((h, i) =>
        <div key={i} className="ui-hl">
              <div className="ui-hl__dot" />
              <div className="ui-hl__text">{h}</div>
            </div>
        )}
        </div>
      }
    </Sec>);

}

function UsabilitySec({ s }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <Sec label="07 · Teste de Usabilidade">
      <h2 className="cs__headline">{s.headline}</h2>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      {s.resultImg ?
      <div className="cs__2col" style={{ alignItems: 'start', marginBottom: '3rem' }}>
          <p className="cs__body" style={{ margin: 0 }}>{s.description}</p>
          <img src={s.resultImg} alt="Resultado do teste A/B"
        style={{ width: '100%', display: 'block', cursor: 'pointer' }}
        onClick={() => setLightbox({ src: s.resultImg, alt: 'Resultado A/B' })} />
        
        </div> :

      <p className="cs__body" style={{ marginBottom: '3rem' }}>{s.description}</p>
      }
      <table className="res-table">
        <thead>
          <tr><th>Métrica</th><th>Antes</th><th>Depois</th></tr>
        </thead>
        <tbody>
          {s.results.map((r, i) =>
          <tr key={i}>
              <td>{r.metric}</td>
              <td className="before">{r.before}</td>
              <td className="after">{r.after}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Sec>);

}

function LearningsSec({ s }) {
  return (
    <Sec label="08 · Aprendizados">
      <h2 className="cs__headline">{s.headline}</h2>
      {s.items.map((item, i) =>
      <div key={i} className="learning">
          <div className="learning__num">{item.number}</div>
          <div>
            <div className="learning__title">{item.title}</div>
            <div className="learning__body">{item.description}</div>
          </div>
        </div>
      )}
    </Sec>);

}

function ComingSoon({ item, onBack }) {
  return (
    <div className="coming-soon">
      <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-ink)', marginBottom: '2rem' }}>
        {item.category} · {item.year}
      </div>
      <div className="coming-soon__head">Case em construção</div>
      <p className="coming-soon__sub">Este case estará disponível em breve.</p>
      <div className="coming-soon__metrics">
        {item.metrics.map((m) =>
        <div key={m.label}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300, color: 'var(--accent-ink)', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem' }}>{m.label}</div>
          </div>
        )}
      </div>
      <button onClick={onBack} style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border-mid)', paddingBottom: '0.2rem' }}>
        ← Voltar ao portfólio
      </button>
    </div>);

}

function StoryFigure({ image, onOpen, opening = false }) {
  return (
    <figure className={`story-figure${opening ? ' story-figure--opening' : ''}${image.compact ? ' story-figure--compact story-figure--pricing' : ''}`}>
      <button className="story-figure__zoom" onClick={() => onOpen(image)} aria-label={`Ampliar imagem: ${image.alt}`}>
        <img src={image.src} alt={image.alt} loading={opening ? 'eager' : 'lazy'} />
        <span className="story-figure__hint">Ampliar imagem</span>
      </button>
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function HighlightedText({ text, phrases = [] }) {
  const parts = [];
  let cursor = 0;
  while (cursor < text.length) {
    let next = -1, match = '';
    phrases.forEach(phrase => {
      const index = text.indexOf(phrase, cursor);
      if (index !== -1 && (next === -1 || index < next)) { next = index; match = phrase; }
    });
    if (next === -1) { parts.push(text.slice(cursor)); break; }
    if (next > cursor) parts.push(text.slice(cursor, next));
    parts.push(<strong key={next}>{match}</strong>);
    cursor = next + match.length;
  }
  return <>{parts}</>;
}

async function loadInterfacePreview(src, signal) {
  const response = await fetch(src, { signal });
  if (!response.ok) throw new Error('Preview unavailable');
  const source = await response.text();
  const url = new URL(src, window.location.href);
  // srcdoc has its own URL; preserve the supplied example's entry-point parameters.
  const adapted = source.replaceAll('new URLSearchParams(location.search)', `new URLSearchParams(${JSON.stringify(url.search)})`);
  const base = `<base href="${url.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}">`;
  const inert = '<script>document.body.inert = true;<\/script>';
  return adapted.replace(/<head>/i, '<head>' + base).replace(/<\/body>/i, inert + '</body>');
}

function InterfaceFigure({ image }) {
  const canvasRef = React.useRef(null);
  const [html, setHtml] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setHtml(null);
    setFailed(false);
    loadInterfacePreview(image.src, controller.signal).then(source => {
      if (!controller.signal.aborted) setHtml(source);
    }).catch(error => {
      if (error.name !== 'AbortError') setFailed(true);
    });
    return () => controller.abort();
  }, [image.src]);
  React.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => canvas.style.setProperty('--interface-scale', canvas.clientWidth / image.width);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [image.width]);
  return (
    <figure className="story-figure story-interface">
      <a className="story-interface__open" href={image.href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir prévia em nova aba: ${image.alt}`}>
        <div ref={canvasRef} className="story-interface__canvas" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
          {html ? <iframe srcDoc={html} sandbox="allow-scripts" width={image.width} height={image.height} title={image.alt} tabIndex={-1} aria-hidden="true" /> :
            <p className="story-interface__status" role="status">{failed ? 'Não foi possível carregar a prévia. Clique para abrir o exemplo.' : 'Carregando prévia…'}</p>}
        </div>
        <span className="story-interface__hint">Abrir prévia ↗</span>
      </a>
      <figcaption>{image.caption} <a href={image.href} target="_blank" rel="noopener noreferrer">Explorar esta tela ↗</a></figcaption>
    </figure>
  );
}

function FileStructure({ structure }) {
  return <figure className="story-files">
    <div className="story-files__tree">
      <p className="story-files__label">Organização do pacote</p>
      <code>origami/</code>
      <ul>{structure.files.map(file => <li key={file}><code>{file}</code></li>)}</ul>
    </div>
    <div className="story-files__template">
      <p className="story-files__label">templates/page-shell.md · trecho</p>
      <pre tabIndex={0} aria-label="Trecho do template page-shell.md"><code>{structure.template}</code></pre>
    </div>
    <figcaption>Seleção de arquivos e trecho do template extraídos do pacote Origami enviado.</figcaption>
  </figure>;
}

function PrototypePanel({ prototype }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('budgets');
  const canvasRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const resize = () => canvas.style.setProperty('--prototype-scale', canvas.clientWidth / 1280);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [open]);
  const single = prototype.mode === 'single';
  const src = single ? prototype.src : `${prototype.src}?page=${page}&theme=light`;
  return (
    <section className="story-prototype" aria-labelledby="prototype-title">
      <div className="story-prototype__heading">
        <div>
          <p className="story-prototype__eyebrow">{prototype.eyebrow || 'Protótipo interativo'}</p>
          <h3 id="prototype-title">{prototype.title || 'Explore a experiência'}</h3>
          <p>{prototype.description || 'Navegue por Model Pricing e Budgets e experimente as configurações apresentadas neste case.'}</p>
        </div>
        <a className="story-prototype__external" href={src} target="_blank" rel="noopener noreferrer">Abrir em nova aba <span aria-hidden="true">↗</span></a>
      </div>
      <p className="story-prototype__note">{prototype.note || 'Ambiente de demonstração com dados de exemplo.'}</p>
      <div className="story-prototype__desktop">
        {!open ? <button className="story-prototype__launch" onClick={() => setOpen(true)}>{prototype.action || 'Explorar protótipo aqui'} <span aria-hidden="true">↓</span></button> : <>
          <div className="story-prototype__toolbar" role="group" aria-label="Área do protótipo">
            {!single && <>
              <button aria-pressed={page === 'budgets'} onClick={() => setPage('budgets')}>Budgets</button>
              <button aria-pressed={page === 'pricing'} onClick={() => setPage('pricing')}>Model Pricing</button>
            </>}
            {single && <span className="story-prototype__screen-label">Exemplo Discovery · Origami</span>}
            <button className="story-prototype__close" onClick={() => setOpen(false)}>Recolher ↑</button>
          </div>
          <div ref={canvasRef} className="story-prototype__canvas">
            <iframe key={src} src={src} title={single ? prototype.title : `Protótipo do Spend Management — ${page === 'pricing' ? 'Model Pricing' : 'Budgets'}`} />
          </div>
        </>}
      </div>
      <p className="story-prototype__mobile">Abra em nova aba para explorar o protótipo em uma área maior.</p>
    </section>
  );
}

function StoryDetails({ section, phrases }) {
  return <>
    {section.tags && <ul className="story-tags" aria-label="Competências do projeto">{section.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
    {section.question && <aside className="story-question"><p>How Might We</p><blockquote>“{section.question}”</blockquote></aside>}
    {section.steps && <dl className="story-steps">{section.steps.map(step => <div key={step.title}><dt>{step.title}</dt><dd>{step.text}</dd></div>)}</dl>}
    {section.cards && <div className="story-cards">{section.cards.map(card => <article className={`insight${card.selected ? ' story-card--selected' : ''}`} key={card.label}>
      {card.selected && <p className="story-card__badge">Escolhido</p>}
      <p className="insight__tag">{card.label}</p>
      <h3 className="insight__title">{card.title}</h3>
      <p className="story-section__body"><HighlightedText text={card.text} phrases={phrases} /></p>
    </article>)}</div>}
    {section.note && <p className="story-note">{section.note}</p>}
  </>;
}

function NarrativeCase({ item, onBack, darkMode, onToggleDark }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <div className="page-enter narrative-case" id="case-content">
      <CaseNav title={item.title} onBack={onBack} darkMode={darkMode} onToggleDark={onToggleDark} />
      <div className="story-banner"><CaseBanner item={item} /></div>
      <header className="story-header">
        <div className="case-hero__cat">{item.category} · {item.year}</div>
        <h1 className="case-hero__title">{item.detailTitle}</h1>
        {item.story.subtitle && <p className="story-header__subtitle">{item.story.subtitle}</p>}
        <p className="story-header__lead">{item.story.lead || item.tagline}</p>
        {item.story.heroMetrics && <dl className="story-hero-metrics">{item.story.heroMetrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
        <dl className="story-meta">
          {item.story.meta.map(meta => <div key={meta.label}><dt>{meta.label}</dt><dd>{meta.value}</dd></div>)}
        </dl>
        {item.story.openingInterface && <InterfaceFigure image={item.story.openingInterface} />}
      </header>
      {item.story.sections.map(section => (
        <Sec label={section.label} key={section.label}>
          <div className="story-section">
            <h2 className="cs__headline">{section.title}</h2>
            <div className="story-section__body">
              {section.paragraphs.map(paragraph => <p key={paragraph}><HighlightedText text={paragraph} phrases={item.story.emphasis} /></p>)}
            </div>
          </div>
          <StoryDetails section={section} phrases={item.story.emphasis} />
          {section.image && <StoryFigure image={section.image} onOpen={setLightbox} />}
          {section.fileStructure && <FileStructure structure={section.fileStructure} />}
          {section.codeSample && <figure className="story-code-sample"><figcaption>{section.codeSample.label}</figcaption><pre tabIndex={0} aria-label={section.codeSample.label}><code>{section.codeSample.text}</code></pre></figure>}
          {section.testimonials && <div className="story-testimonials">{section.testimonials.map(testimonial => <figure className="story-testimonial" key={testimonial.author}>
            <span className="story-testimonial__mark" aria-hidden="true">“</span>
            <blockquote><p>{testimonial.quote}</p></blockquote>
            <figcaption><strong>{testimonial.author}</strong><span>{testimonial.note}</span></figcaption>
          </figure>)}</div>}
          {section.blocks?.map(block => (
            <div className="story-solution" key={block.title}>
              <div className="story-solution__copy">
                <h3>{block.title}</h3>
                {(block.paragraphs || [block.text]).filter(Boolean).map(paragraph => <p className="story-section__body" key={paragraph}><HighlightedText text={paragraph} phrases={item.story.emphasis} /></p>)}
              </div>
              {block.listing && <InterfaceFigure image={block.listing} />}
              {block.image && (block.image.compact ? <div className="story-pricing-detail">
                <div>
                  <h4>Configuração de preços por tipo de token</h4>
                  <p className="story-section__body">Os valores de referência podem ser configurados por modelo e tipo de token para calcular o <strong>custo estimado do consumo</strong>.</p>
                </div>
                <StoryFigure image={block.image} onOpen={setLightbox} />
              </div> : <StoryFigure image={block.image} onOpen={setLightbox} />)}
              {block.link && <p className="story-external-link"><a href={block.link.href} target="_blank" rel="noopener noreferrer">{block.link.label} <span aria-hidden="true">↗</span></a></p>}
            </div>
          ))}
          {section.componentsDemo && <OrigamiShowcase />}
          {section.gallery && <div className="story-gallery">{section.gallery.map((media, index) => media.kind === 'interface' ? <InterfaceFigure key={media.image.src + index} image={media.image} /> : <StoryFigure key={media.image.src + index} image={media.image} onOpen={setLightbox} />)}</div>}
          {section.points && <ul className="story-points">{section.points.map(point => <li key={point}>{point}</li>)}</ul>}
          {section.closingParagraphs && <div className="story-section__body story-section__closing">{section.closingParagraphs.map(paragraph => <p key={paragraph}><HighlightedText text={paragraph} phrases={item.story.emphasis} /></p>)}</div>}
          {section.closingInterface && <InterfaceFigure image={section.closingInterface} />}
          {item.story.prototype && (item.story.prototype.afterSection ? section.label === item.story.prototype.afterSection : Boolean(section.blocks)) && <PrototypePanel prototype={item.story.prototype} />}
        </Sec>
      ))}
      <div className="story-back"><button className="case-nav__back" onClick={onBack}>← Voltar ao portfólio</button></div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function CasePage({ caseId, onBack, darkMode, onToggleDark }) {
  const item = window.PORTFOLIO_DATA.cases.find((c) => c.id === caseId);
  React.useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); }, [caseId]);
  if (!item) return null;
  if (item.story) return <NarrativeCase item={item} onBack={onBack} darkMode={darkMode} onToggleDark={onToggleDark} />;

  const { sections } = item;

  return (
    <div className="page-enter" id="case-content">
      <CaseNav title={item.title} onBack={onBack} darkMode={darkMode} onToggleDark={onToggleDark} />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <CaseHero item={item} />
        {item.hasSections && sections ?
        <>
            {sections.overview && <OverviewSec s={sections.overview} />}
            {sections.opportunity && sections.opportunity.problem && <OpportunitySec s={sections.opportunity} />}
            {sections.planning && <PlanningSec s={sections.planning} />}
            {sections.research && <ResearchSec s={sections.research} />}
            {sections.ideation && <IdeationSec s={sections.ideation} />}
            {sections.wireframes && <WireframesSec s={sections.wireframes} />}
            {sections.ui && <UISec s={sections.ui} />}
            {sections.usabilityTest && <UsabilitySec s={sections.usabilityTest} />}
            {sections.learnings && <LearningsSec s={sections.learnings} />}
            <div style={{ padding: '4rem 5vw', borderTop: '1px solid var(--border)' }}>
              <button className="case-nav__back" onClick={onBack}
            style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border-mid)', paddingBottom: '0.2rem' }}>
                ← Voltar ao portfólio
              </button>
            </div>
          </> :

        <ComingSoon item={item} onBack={onBack} />
        }
      </div>
    </div>);

}

Object.assign(window, { CasePage });
