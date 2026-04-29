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
    <nav className="case-nav">
      <button className="case-nav__back" onClick={onBack}>← Voltar</button>
      <div className="case-nav__div" />
      <span className="case-nav__title">{title}</span>
      <button className="nav__theme-btn" onClick={onToggleDark} title={darkMode ? 'Modo claro' : 'Modo escuro'} style={{ marginLeft: 'auto' }}>
        {darkMode ? '☀' : '☾'}
      </button>
      <div className="case-nav__progress" style={{ width: `${progress}%` }} />
    </nav>);

}

function CaseHero({ item }) {
  const covers = {
    'link-pagamento': 'images/lp-cover.png',
    'mapeamento-jornada-avon': 'images/avon-cover.png',
    'novo-carrinho': 'images/carrinho-cover.png',
    'setor-automotivo': 'images/auto-cover.png'
  };
  const cover = covers[item.id];
  return (
    <header className="case-hero">
      {cover &&
      <div style={{ width: 'calc(100% + 10vw)', marginLeft: '-5vw', marginRight: '-5vw', height: '420px', overflow: 'hidden', marginBottom: '3rem' }}>
          <img src={cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        </div>
      }
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
            <span key={t} style={{ fontSize: '0.67rem', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid var(--border-mid)', padding: '0.3rem 0.7rem' }}>{t}</span>
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
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: 0.45 }}>How Might We</div>
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
      {label && <div style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.05em', textAlign: 'center' }}>{label}</div>}
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
            {img.label && <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.6rem', letterSpacing: '0.05em' }}>{img.label}</div>}
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
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{s.images[0].label}</div>
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
              <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>{img.label}</div>
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
      <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2rem' }}>
        {item.category} · {item.year}
      </div>
      <div className="coming-soon__head">Case em construção</div>
      <p className="coming-soon__sub">Este case estará disponível em breve.</p>
      <div className="coming-soon__metrics">
        {item.metrics.map((m) =>
        <div key={m.label}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300, color: 'var(--accent)', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '0.67rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.3rem' }}>{m.label}</div>
          </div>
        )}
      </div>
      <button onClick={onBack} style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border-mid)', paddingBottom: '0.2rem' }}>
        ← Voltar ao portfólio
      </button>
    </div>);

}

function CasePage({ caseId, onBack, darkMode, onToggleDark }) {
  const item = window.PORTFOLIO_DATA.cases.find((c) => c.id === caseId);
  useEffect(() => {window.scrollTo(0, 0);}, [caseId]);
  if (!item) return null;

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