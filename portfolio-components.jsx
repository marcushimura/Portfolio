// portfolio-components.jsx
const { useState, useEffect, useRef } = React;

function useDialogFocus(active, rootRef, onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active || !rootRef.current) return;
    const root = rootRef.current;
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const controls = () => Array.from(root.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.getClientRects().length > 0);
    document.body.style.overflow = 'hidden';
    (controls()[0] || root).focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      } else if (event.key === 'Tab') {
        const items = controls();
        const first = items[0], last = items[items.length - 1];
        if (!first) { event.preventDefault(); root.focus(); return; }
        if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previous && previous.isConnected && typeof previous.focus === 'function') previous.focus();
    };
  }, [active, rootRef]);
}

function Lightbox({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const dialogRef = useRef(null);
  useDialogFocus(true, dialogRef, onClose);

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
    <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${alt}`} tabIndex={-1} onClick={scale === 1 ? onClose : undefined}
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
      <button aria-label="Fechar imagem ampliada" onClick={onClose} style={{
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
        <button key={label} aria-label={delta > 0 ? 'Aumentar imagem' : 'Diminuir imagem'} onClick={(e) => {e.stopPropagation();zoom(delta);}} style={{
          width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.1rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>{label}</button>
        )}
        <button onClick={(e) => {e.stopPropagation();reset();}} style={{
          padding: '0 1rem', height: '36px', border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.75rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer'
        }}>Restaurar zoom</button>
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
  const menuRef = useRef(null);
  useDialogFocus(menuOpen, menuRef, () => setMenuOpen(false));
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
      <nav aria-label="Navegação principal" className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <button className="nav__name" onClick={() => onNavigate('home')}>Marcus<span>.</span></button>
        <div className="nav__links">
          {links.map((l) => <button key={l.id} className="nav__link" onClick={() => go(l.id)}>{l.label}</button>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="nav__theme-btn" onClick={onToggleDark} aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'} title={darkMode ? 'Modo claro' : 'Modo escuro'}>
            {darkMode ? '☀' : '☾'}
          </button>
          <button className="nav__menu-btn" aria-controls="portfolio-menu" aria-haspopup="dialog" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {menuOpen &&
      <div ref={menuRef} id="portfolio-menu" className="menu-overlay" role="dialog" aria-modal="true" aria-label="Menu de navegação" tabIndex={-1}>
          <button className="menu-overlay__close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>✕</button>
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

// Pointer motion runs only while a layer is settling; text and controls stay anchored.
function attachHeroParallax(hero) {
  const media = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, previousTime = 0;
  const paint = time => {
    const amount = 1 - Math.exp(-Math.min(previousTime ? time - previousTime : 16, 64) / 95);
    previousTime = time;
    x += (targetX - x) * amount;
    y += (targetY - y) * amount;
    const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < .001;
    if (settled) { x = targetX; y = targetY; }
    hero.style.setProperty('--hero-pointer-x', x.toFixed(4));
    hero.style.setProperty('--hero-pointer-y', y.toFixed(4));
    frame = settled ? 0 : requestAnimationFrame(paint);
    if (settled) previousTime = 0;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
  const move = event => {
    if (!media.matches || event.pointerType !== 'mouse') return;
    const box = hero.getBoundingClientRect();
    targetX = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    targetY = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    schedule();
  };
  const reset = () => { targetX = 0; targetY = 0; schedule(); };
  const preferenceChanged = () => {
    cancelAnimationFrame(frame); frame = 0; previousTime = 0;
    x = y = targetX = targetY = 0;
    hero.style.removeProperty('--hero-pointer-x');
    hero.style.removeProperty('--hero-pointer-y');
  };
  hero.addEventListener('pointermove', move, { passive: true });
  hero.addEventListener('pointerleave', reset);
  window.addEventListener('blur', reset);
  media.addEventListener('change', preferenceChanged);
  return () => {
    hero.removeEventListener('pointermove', move);
    hero.removeEventListener('pointerleave', reset);
    window.removeEventListener('blur', reset);
    media.removeEventListener('change', preferenceChanged);
    preferenceChanged();
  };
}

function Hero({ onScrollTo }) {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const portraitRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => attachHeroParallax(heroRef.current), []);

  React.useLayoutEffect(() => {
    const alignAction = () => {
      if (!heroRef.current || !nameRef.current) return;
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      if (!mobile && introRef.current) {
        const topFraction = window.matchMedia('(max-width: 1100px)').matches ? .48 : .51;
        const minHeight = Math.ceil((introRef.current.offsetHeight + 48) / (1 - topFraction));
        heroRef.current.style.setProperty('--hero-min-height', `${minHeight}px`);
      }
      const heroBox = heroRef.current.getBoundingClientRect();
      const portrait = portraitRef.current;
      if (portrait && portrait.naturalWidth) {
        const portraitBox = portrait.getBoundingClientRect();
        const renderedHeight = Math.min(portraitBox.height, portraitBox.width * portrait.naturalHeight / portrait.naturalWidth);
        const portraitTop = portraitBox.bottom - heroBox.top - renderedHeight;
        const statementAnchor = window.matchMedia('(max-width: 768px)').matches ? .78 : .36;
        heroRef.current.style.setProperty('--hero-visual-anchor', `${portraitTop + renderedHeight * statementAnchor}px`);

      }
      const nameBox = nameRef.current.getBoundingClientRect();
      const opticalOffset = parseFloat(getComputedStyle(nameRef.current).fontSize) * .08;
      heroRef.current.style.setProperty('--hero-name-center', `${nameBox.top - heroBox.top + nameBox.height / 2 + opticalOffset}px`);
    };
    const observer = new ResizeObserver(alignAction);
    observer.observe(heroRef.current);
    observer.observe(nameRef.current);
    observer.observe(portraitRef.current);
    observer.observe(introRef.current);
    portraitRef.current.addEventListener('load', alignAction);
    document.fonts.ready.then(alignAction);
    alignAction();
    const portrait = portraitRef.current;
    return () => {
      observer.disconnect();
      portrait.removeEventListener('load', alignAction);
    };
  }, []);

  return (
    <section ref={heroRef} className="editorial-hero" id="top" aria-labelledby="hero-name">
      <div className="editorial-hero__art" aria-hidden="true">
        <img className="editorial-hero__disk" src="images/terracotta-disk.svg" alt="" />
        <svg className="editorial-hero__ring" viewBox="0 0 200 200" fill="none" aria-hidden="true"><circle cx="100" cy="100" r="94"/><circle cx="100" cy="100" r="79"/><circle cx="100" cy="100" r="64"/></svg>
        <svg className="editorial-hero__orbit" viewBox="0 0 180 180" fill="none" aria-hidden="true"><circle cx="90" cy="90" r="74"/><circle cx="90" cy="16" r="6" className="editorial-hero__orbit-dot"/></svg>
        <svg className="editorial-hero__spark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2v28M2 16h28"/></svg>
        <img className="editorial-hero__asterisk" src="images/asterisk.svg" alt="" />
      </div>
      <img ref={portraitRef} className="editorial-hero__portrait" src="images/marcus-photo-bg.png" alt="Marcus Araújo" fetchPriority="high" />
      <div className="editorial-hero__glass" aria-hidden="true" />
      <div ref={introRef} className="editorial-hero__intro">
        <p className="editorial-hero__role">Senior Product Designer</p>
        <h1 ref={nameRef} id="hero-name">Marcus<br />Araújo</h1>
        <hr className="editorial-hero__rule" aria-hidden="true" />
        <p className="editorial-hero__tagline">Design que melhora a experiência e gera resultado.</p>
      </div>
      <div className="editorial-hero__action">
        <button onClick={() => onScrollTo('casos')}>Ver cases <span aria-hidden="true">↓</span></button>
      </div>
    </section>
  );
}

function getCaseCover(item) {
  const covers = {
    'link-pagamento': 'images/lp-cover-yellow.png',
    'mapeamento-jornada-avon': 'images/avon-cover-yellow.png',
    'novo-carrinho': 'images/carrinho-cover-yellow.png',
    'setor-automotivo': 'images/auto-cover-yellow.png'
  };
  return item.cover || covers[item.id];
}

function CaseCard({ item, index, onClick }) {
  return (
    <article className="case-card">
      <button className="case-card__link" onClick={onClick} aria-label={`Ver case: ${item.title}`}>
        <div className="case-card__cover"><img src={getCaseCover(item)} alt={item.title} loading="lazy" /></div>
        <div className="case-card__content">
          <span className="case-card__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="case-card__intro">
            <h2 className="case-card__title">{item.title}</h2>
            <div className="case-card__cat">{item.category} · {item.year}</div>
            <p className="case-card__tagline">{item.tagline}</p>
          </div>
        </div>
      </button>
    </article>
  );
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
          Design com<br />propósito<br />&amp; <span className="headline-highlight">resultado</span>
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={120}>
        <span className="about__exp">15</span>
        <div className="about__exp-label">anos de experiência</div>
        <p className="about__body">{about}</p>
        <a className="about__cv-link" href="downloads/Marcus_Araujo_CV.pdf" target="_blank" rel="noopener noreferrer">Ver currículo <span aria-hidden="true">↗</span></a>
      </RevealWrapper>
    </section>);

}

function ContactSection() {
  const { contact } = window.PORTFOLIO_DATA;
  return (
    <section className="contact" id="contato">
      <img className="contact__graphic" src="images/asterisk.svg" alt="" aria-hidden="true" />
      <RevealWrapper>
        <div className="contact__label">Contato</div>
        <h2 className="contact__headline">
          Vamos<br /><span className="headline-highlight">conversar</span>?
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={120}>
        <a href={`mailto:${contact.email}`} className="contact__link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" /></svg>
          {contact.email}
          <span className="contact__link-arrow">→</span>
        </a>
        <a href={`https://wa.me/55${contact.phone.replace(/\D/g, '')}`} className="contact__link" target="_blank" rel="noopener noreferrer" aria-label={`Conversar pelo WhatsApp: ${contact.phone}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}><path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.94 11.94 0 0 0 5.79 1.48h.01C18.64 23.84 24 18.49 24 11.91c0-3.18-1.24-6.17-3.48-8.43ZM12.06 21.82a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.51-5.28c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.46-4.45 9.89-9.97 9.89Zm5.44-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.48 1.7.62.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>
          {contact.phone}
          <span className="contact__link-arrow">→</span>
        </a>
        <a href="https://www.linkedin.com/in/marcushimura/" className="contact__link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Marcus Araújo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5 }}><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.11-.02-2.53-1.54-2.53-1.55 0-1.79 1.21-1.79 2.45v4.72H9.52V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 2.99 0 3.56 1.97 3.56 4.53v5.25Z"/></svg>
          LinkedIn
          <span className="contact__link-arrow">↗</span>
        </a>
      </RevealWrapper>
    </section>);

}

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copy">© 2026 Marcus Araújo · Construído com Codex ♥</span>
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
  RevealWrapper, ImgPh, Nav, Hero, Lightbox, getCaseCover,
  CasesSection, AboutSection, ContactSection, Footer, HomePage
});
