// portfolio-app.jsx
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#fda228",
  "darkMode": false,
  "fontStyle": "serif"
}/*EDITMODE-END*/;

function TweaksPanel({ tweaks, onUpdate }) {
  const accents = ['#fda228', '#e05f3a', '#3b7dd8', '#5c9e6b', '#9b5fc0', '#c0416e'];
  return (
    <div className="tweaks-panel">
      <div className="tweaks-title">Tweaks</div>

      <div className="tweaks-row">
        <span className="tweaks-lbl">Cor de destaque</span>
        <div className="tweaks-colors">
          {accents.map(c => (
            <button key={c} className={`tweaks-swatch${tweaks.accent === c ? ' tweaks-swatch--active' : ''}`}
              style={{ background: c }}
              onClick={() => onUpdate('accent', c)}
            />
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <span className="tweaks-lbl">Tipografia</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`tweaks-btn${tweaks.fontStyle === 'serif' ? ' tweaks-btn--on' : ''}`}
            onClick={() => onUpdate('fontStyle', 'serif')}>Serif</button>
          <button className={`tweaks-btn${tweaks.fontStyle === 'grotesque' ? ' tweaks-btn--on' : ''}`}
            onClick={() => onUpdate('fontStyle', 'grotesque')}>Grotesque</button>
        </div>
      </div>

      <div className="tweaks-row">
        <span className="tweaks-lbl">Aparência</span>
        <button
          className={`tweaks-btn${tweaks.darkMode ? ' tweaks-btn--on' : ''}`}
          onClick={() => onUpdate('darkMode', !tweaks.darkMode)}>
          {tweaks.darkMode ? '☀ Claro' : '☾ Escuro'}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pf_page')) || { type: 'home', caseId: null }; }
    catch { return { type: 'home', caseId: null }; }
  });

  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('pf_dark') === 'true'; }
    catch { return false; }
  });
  const pendingScroll = useRef(null);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('pf_dark', next);
    // sync with tweaks
    setTweaks(prev => ({ ...prev, darkMode: next }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { darkMode: next } }, '*');
  };

  // Apply tweaks to CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    const isDark = darkMode || tweaks.darkMode;
    document.documentElement.setAttribute('data-dark', isDark ? 'true' : 'false');
    const serif = "'Cormorant Garamond', Georgia, serif";
    const grotesk = "'Space Grotesk', sans-serif";
    document.documentElement.style.setProperty(
      '--font-display', tweaks.fontStyle === 'grotesque' ? grotesk : serif
    );
  }, [tweaks, darkMode]);

  // Tweaks host protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweak = (key, value) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const navigate = (type, scrollTarget = null, caseId = null) => {
    if (scrollTarget) pendingScroll.current = scrollTarget;
    setPage({ type, caseId });
  };

  useEffect(() => {
    localStorage.setItem('pf_page', JSON.stringify(page));
    if (page.type === 'home') {
      if (pendingScroll.current) {
        const t = pendingScroll.current;
        pendingScroll.current = null;
        setTimeout(() => scrollToSection(t), 80);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [page]);

  return (
    <>
      {page.type === 'home' ? (
        <>
          <Nav
            onNavigate={(type, scrollTarget) => navigate(type, scrollTarget)}
            onScrollTo={scrollToSection}
            darkMode={darkMode}
            onToggleDark={toggleDark}
          />
          <HomePage
            onCaseClick={(id) => navigate('case', null, id)}
            onScrollTo={scrollToSection}
          />
        </>
      ) : (
        <CasePage
          caseId={page.caseId}
          onBack={() => navigate('home')}
          darkMode={darkMode}
          onToggleDark={toggleDark}
        />
      )}
      {tweaksOpen && <TweaksPanel tweaks={tweaks} onUpdate={updateTweak} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
