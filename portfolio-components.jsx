// portfolio-components.jsx
const { useState, useEffect, useRef } = React;

function Lightbox({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    setScale((s) => Math.min(4, Math.max(1, s - e.deltaY * 0.002)));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {setDragging(true);dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };}
  };
  const handleMouseMove = (e) => {
    if (dragging) setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const handleMouseUp = () => setDragging(false);

  const zoom = (delta) => setScale((s) => Math.min(4, Math.max(1, s + delta)));
  const reset = () => {setScale(1);setPos({ x: 0, y: 0 });};

  return (
    <div onClick={scale === 1 ? onClose : undefined}
    onWheel={handleWheel}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      cursor: scale > 1 ? dragging ? 'grabbing' : 'grab' : 'zoom-out',
      animation: 'pageIn 0.2s ease',
      userSelect: 'none'
    }}>
      {/* close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        color: '#fff', opacity: 0.6, fontSize: '1.4rem',
        background: 'none', border: 'none', cursor: 'pointer', zIndex: 2
      }}>✕</button>
      {/* zoom controls */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem', zIndex: 2
      }}>
        {[{ label: '−', delta: -0.5 }, { label: '+', delta: 0.5 }].map(({ label, delta }) =>
        <button key={label} onClick={(e) => {e.stopPropagation();zoom(delta);}} style={{
          width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.1rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>{label}</button>
        )}
        <button onClick={(e) => {e.stopPropagation();reset();}} style={{
          padding: '0 1rem', height: '36px', border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.72rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer'
        }}>Reset</button>
      </div>
      <img src={src} alt={alt}
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
        transition: dragging ? 'none' : 'transform 0.15s ease',
        transformOrigin: 'center center'
      }} />
      
    </div>);

}

function RevealWrapper({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {if (e.isIntersecting) {setVisible(true);obs.disconnect();}},
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(22px)',
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`
    }}>{children}</div>);

}

function ImgPh({ label, height = 380 }) {
  return (
    <div className="img-ph" style={{ height }}>
      <span className="img-ph__label">[ {label} ]</span>
    </div>);

}

function Nav({ onNavigate, onScrollTo, darkMode, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
  { label: 'Casos', id: 'casos' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Contato', id: 'contato' }];

  const go = (id) => {onNavigate('home', id);setMenuOpen(false);};

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <button className="nav__name" onClick={() => onNavigate('home')}>Marcus<span>.</span></button>
        <div className="nav__links">
          {links.map((l) => <button key={l.id} className="nav__link" onClick={() => go(l.id)}>{l.label}</button>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="nav__theme-btn" onClick={onToggleDark} title={darkMode ? 'Modo claro' : 'Modo escuro'}>
            {darkMode ? '☀' : '☾'}
          </button>
          <button className="nav__menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {menuOpen &&
      <div className="menu-overlay">
          <button className="menu-overlay__close" onClick={() => setMenuOpen(false)}>✕</button>
          <div className="menu-overlay__links">
            {links.map((l, i) =>
          <button key={l.id} className="menu-overlay__link" onClick={() => go(l.id)}>
                <span className="menu-overlay__num">0{i + 1}</span>
                <span className="menu-overlay__label">{l.label}</span>
                <span className="menu-overlay__arrow">→</span>
              </button>
          )}
          </div>
        </div>
      }
    </>);

}

function Hero({ onScrollTo }) {
  const { tagline } = window.PORTFOLIO_DATA;
  return (
    <section className="hero" id="top">
      <div className="hero__top">
        <div className="hero__text">
          <div className="hero__deco-circle-sm" />
          <div className="hero__greeting">Senior Product Designer · São Paulo · 15 anos</div>
          <h1 className="hero__name">
            Marcus<br /><em>Araújo</em>
          </h1>
        </div>
        <div className="hero__photo-wrap">
          <div className="hero__photo">
            <img src="images/marcus-hero.png" alt="Marcus Araújo" />
          </div>
        </div>
      </div>
      <div className="hero__bottom">
        <div>
          <button className="hero__cta" onClick={() => onScrollTo('casos')}>
            Ver casos <span>↓</span>
          </button>
        </div>
        <p className="hero__tagline">{tagline}</p>
      </div>
    </section>);

}

function CaseCard({ item, index, onClick }) {
  const nums = ['01', '02', '03', '04'];
  const covers = {
    'link-pagamento': 'images/lp-cover.png',
    'mapeamento-jornada-avon': 'images/avon-cover.png',
    'novo-carrinho': 'images/carrinho-cover.png',
    'setor-automotivo': 'images/auto-cover.png'
  };
  const cover = covers[item.id];
  return (
    <article className="case-card" onClick={onClick} role="button" tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      {cover &&
      <div style={{ width: '100%', height: '220px', overflow: 'hidden', marginBottom: '2rem', marginTop: '-3.5rem', marginLeft: '-5vw', marginRight: '-5vw', width: 'calc(100% + 10vw)' }}>
          <img src={cover} alt={item.title} style={{ width: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', height: "222px" }} />
        </div>
      }
      <div className="case-card__num">{nums[index]}</div>
      <h2 className="case-card__title">{item.title}</h2>
      <div className="case-card__cat">{item.category} · {item.year}</div>
      <p className="case-card__tagline">{item.tagline}</p>
      <div className="case-card__metrics">
        {item.metrics.map((m) =>
        <div key={m.label}>
            <div className="case-card__metric-val">{m.value}</div>
            <div className="case-card__metric-lbl">{m.label}</div>
          </div>
        )}
      </div>
      <span className="case-card__arrow">→</span>
    </article>);

}

function CasesSection({ onCaseClick }) {
  const { cases } = window.PORTFOLIO_DATA;
  return (
    <section id="casos">
      <div className="cases-grid">
        {cases.map((c, i) =>
        <RevealWrapper key={c.id} delay={i * 80}>
            <CaseCard item={c} index={i} onClick={() => onCaseClick(c.id)} />
          </RevealWrapper>
        )}
      </div>
    </section>);

}

function AboutSection() {
  const { about } = window.PORTFOLIO_DATA;
  return (
    <section className="about" id="sobre">
      <div className="about__deco" />
      <RevealWrapper>
        <div className="about__label">Sobre</div>
        <h2 className="about__headline">
          Design com<br />propósito<br /><em>&amp; resultado</em>
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={120}>
        <span className="about__exp">15</span>
        <div className="about__exp-label">anos de experiência</div>
        <p className="about__body">{about}</p>
      </RevealWrapper>
    </section>);

}

function ContactSection() {
  const { contact } = window.PORTFOLIO_DATA;
  return (
    <section className="contact" id="contato">
      <div className="contact__deco-circle" />
      <div className="contact__deco-inner" />
      <RevealWrapper>
        <div className="contact__label">Contato</div>
        <h2 className="contact__headline">
          <em>Vamos</em><br />conversar?
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={120}>
        <a href={`mailto:${contact.email}`} className="contact__link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>
          {contact.email}
          <span className="contact__link-arrow">→</span>
        </a>
        <a href={`tel:+55${contact.phone.replace(/\D/g, '')}`} className="contact__link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.29 6.29l1.06-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          {contact.phone}
          <span className="contact__link-arrow">→</span>
        </a>
      </RevealWrapper>
    </section>);

}

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copy">© 2025 Marcus Araújo · Construído com Figma + Claude ♥</span>
      <span className="footer__role">Senior Product Designer</span>
    </footer>);

}

function HomePage({ onCaseClick, onScrollTo }) {
  return (
    <div className="page-enter">
      <Hero onScrollTo={onScrollTo} />
      <CasesSection onCaseClick={onCaseClick} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>);

}

Object.assign(window, {
  RevealWrapper, ImgPh, Nav, Hero, Lightbox,
  CasesSection, AboutSection, ContactSection, Footer, HomePage
});