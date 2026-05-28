import { useState, useEffect, useRef, useCallback } from 'react';
import { useGamepad } from './hooks/useGamepad';
import { ControllerSVG } from './components/ControllerSVG';
import { ControllerTab } from './components/ControllerTab';
import { HapticsTab } from './components/HapticsTab';
import { TriggersTab } from './components/TriggersTab';
import { LightBarTab } from './components/LightBarTab';
import { ProfileManager } from './components/ProfileManager';

const TABS = ['Controller', 'Haptics', 'Triggers', 'Light Bar', 'Profiles'];
const MODES = ['PS5 / PC', 'Xbox'];

// ✅ Move styles outside component
const STYLES = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 20,
  },
  btn: {
    border: 'none',
    cursor: 'pointer',
    borderRadius: 8,
    fontFamily: 'inherit',
    transition: 'all .15s',
  },
};

export default function App() {
  const { connected, axes, buttons, vibrate } = useGamepad();
  const [tab, setTab] = useState(0);
  const [mode, setMode] = useState(0);
  const [lightColor, setLightColor] = useState('#00AAFF');
  const [leftTrigger, setLeftTrigger] = useState(0);
  const [rightTrigger, setRightTrigger] = useState(0);
  const [rumbleL, setRumbleL] = useState(60);
  const [rumbleR, setRumbleR] = useState(40);
  const [activeHaptic, setActiveHaptic] = useState(null);
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('dualsense-profiles');
    return saved ? JSON.parse(saved) : {};
  });
  const hapticTimer = useRef(null);

  // ✅ Clean up haptic timer on unmount
  useEffect(() => {
    return () => {
      if (hapticTimer.current) clearTimeout(hapticTimer.current);
    };
  }, []);

  // ✅ Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'r' || e.key === 'R') fireHaptic({ id: 'rumble', strong: 0.7, weak: 0.3, dur: 500 });
      if (e.key === 'p' || e.key === 'P') fireHaptic({ id: 'pulse', strong: 0.9, weak: 0.1, dur: 150 });
      if (e.key === 'i' || e.key === 'I') fireHaptic({ id: 'impact', strong: 1.0, weak: 0.8, dur: 80 });
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const fireHaptic = useCallback(
    p => {
      vibrate(p.strong, p.weak, p.dur);
      setActiveHaptic(p.id);
      if (hapticTimer.current) clearTimeout(hapticTimer.current);
      hapticTimer.current = setTimeout(() => setActiveHaptic(null), p.dur + 200);
    },
    [vibrate],
  );

  const saveProfile = (name, state) => {
    const newProfiles = { ...profiles, [name]: state };
    setProfiles(newProfiles);
    localStorage.setItem('dualsense-profiles', JSON.stringify(newProfiles));
  };

  const loadProfile = name => {
    const profile = profiles[name];
    if (profile) {
      setLightColor(profile.lightColor);
      setRumbleL(profile.rumbleL);
      setRumbleR(profile.rumbleR);
      setLeftTrigger(profile.leftTrigger);
      setRightTrigger(profile.rightTrigger);
    }
  };

  const deleteProfile = name => {
    const newProfiles = { ...profiles };
    delete newProfiles[name];
    setProfiles(newProfiles);
    localStorage.setItem('dualsense-profiles', JSON.stringify(newProfiles));
  };

  const currentState = { lightColor, rumbleL, rumbleR, leftTrigger, rightTrigger };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0b14', color: '#dde1f0', fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes blink { 0%,100%{opacity:.4} 50%{opacity:1} }
        .float { animation: floatUp 4s ease-in-out infinite; }
        .blink { animation: blink 2s ease-in-out infinite; }
        input[type=range] { -webkit-appearance:none; appearance:none; height:6px; border-radius:3px; background:#1e2236; outline:none; cursor:pointer; width:100%; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#00AAFF; cursor:pointer; }
        input[type=color] { cursor: pointer; }
        button:hover { opacity:.8; }
      `}</style>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '20px 16px 48px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
              <span style={{ color: '#00AAFF' }}>Dual</span>Sense Hub
            </h1>
            <p style={{ fontSize: 12, color: '#445060', marginTop: 2 }}>PS5 Controller · PC & Xbox Bridge</p>
          </div>
          <div style={{ display: 'flex', gap: 4, background: '#141520', borderRadius: 10, padding: 3 }}>
            {MODES.map((m, i) => (
              <button
                key={m}
                onClick={() => setMode(i)}
                style={{
                  ...STYLES.btn,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  background: mode === i ? '#00AAFF' : 'transparent',
                  color: mode === i ? '#fff' : '#445060',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 10,
            marginBottom: 18,
            background: connected ? 'rgba(0,255,136,.07)' : 'rgba(255,48,64,.07)',
            border: `1px solid ${connected ? 'rgba(0,255,136,.2)' : 'rgba(255,48,64,.2)'}`,
          }}
        >
          <span className={connected ? 'blink' : ''} style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: connected ? '#00FF88' : '#FF3040' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: connected ? '#00FF88' : '#FF3040' }}>
            {connected ? '✓ Controller Connected' : '⚠ No controller detected — connect via USB or Bluetooth'}
          </span>
          <span style={{ fontSize: 11, color: '#445060', marginLeft: 'auto' }}>
            Keyboard: R (Rumble) · P (Pulse) · I (Impact)
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.07)', marginBottom: 20, overflowX: 'auto' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                ...STYLES.btn,
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 0,
                background: 'none',
                color: tab === i ? '#00AAFF' : '#445060',
                borderBottom: `2px solid ${tab === i ? '#00AAFF' : 'transparent'}`,
                marginBottom: -1,
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {tab === 0 && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ ...STYLES.card, textAlign: 'center' }}>
              <div className="float">
                <ControllerSVG buttons={buttons} axes={axes} lightColor={lightColor} />
              </div>
              <p style={{ fontSize: 11, color: '#2a3040', marginTop: 4 }}>Buttons light up when pressed</p>
            </div>
            <ControllerTab buttons={buttons} axes={axes} card={STYLES.card} />
          </div>
        )}
        {tab === 1 && <HapticsTab activeHaptic={activeHaptic} fireHaptic={fireHaptic} rumbleL={rumbleL} setRumbleL={setRumbleL} rumbleR={rumbleR} setRumbleR={setRumbleR} card={STYLES.card} btn={STYLES.btn} />}
        {tab === 2 && <TriggersTab leftTrigger={leftTrigger} setLeftTrigger={setLeftTrigger} rightTrigger={rightTrigger} setRightTrigger={setRightTrigger} card={STYLES.card} btn={STYLES.btn} />}
        {tab === 3 && <LightBarTab lightColor={lightColor} setLightColor={setLightColor} card={STYLES.card} btn={STYLES.btn} />}
        {tab === 4 && <ProfileManager profiles={profiles} onLoadProfile={loadProfile} onSaveProfile={saveProfile} onDeleteProfile={deleteProfile} currentState={currentState} btn={STYLES.btn} card={STYLES.card} />}
      </div>
    </div>
  );
}
