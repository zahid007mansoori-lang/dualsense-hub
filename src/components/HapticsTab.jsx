const HAPTIC_PATTERNS = [
  { id: 'rumble', label: 'Rumble', icon: '〜', strong: 0.7, weak: 0.3, dur: 500 },
  { id: 'pulse', label: 'Pulse', icon: '◎', strong: 0.9, weak: 0.1, dur: 150 },
  { id: 'impact', label: 'Impact', icon: '✦', strong: 1.0, weak: 0.8, dur: 80 },
  { id: 'rain', label: 'Rain', icon: '≋', strong: 0.2, weak: 0.5, dur: 600 },
  { id: 'engine', label: 'Engine', icon: '⚙', strong: 0.4, weak: 0.6, dur: 800 },
];

export function HapticsTab({ activeHaptic, fireHaptic, rumbleL, setRumbleL, rumbleR, setRumbleR, card, btn }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Haptic Patterns</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
          {HAPTIC_PATTERNS.map(p => {
            const active = activeHaptic === p.id;
            return (
              <button
                key={p.id}
                onClick={() => fireHaptic(p)}
                style={{
                  ...btn,
                  padding: '18px 10px',
                  textAlign: 'center',
                  background: active ? 'rgba(0,170,255,.12)' : 'rgba(255,255,255,.03)',
                  border: `1px solid ${active ? '#00AAFF' : 'rgba(255,255,255,.07)'}`,
                  color: '#dde1f0',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: active ? '#00AAFF' : '#dde1f0' }}>{p.label}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 18 }}>Rumble Intensity</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { label: 'Low Freq', val: rumbleL, set: setRumbleL },
            { label: 'High Freq', val: rumbleR, set: setRumbleR },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 13, color: '#00AAFF', fontWeight: 700 }}>{val}%</span>
              </div>
              <input type="range" min="0" max="100" value={val} onChange={e => set(+e.target.value)} />
            </div>
          ))}
        </div>
        <button
          onClick={() => fireHaptic({ id: 'test', strong: rumbleL / 100, weak: rumbleR / 100, dur: 500 })}
          style={{
            ...btn,
            marginTop: 18,
            width: '100%',
            padding: 12,
            background: '#00AAFF',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 10,
          }}
        >
          ⚡ Test Rumble
        </button>
      </div>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          API Support
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['Gamepad API', 'getGamepads' in navigator],
            ['WebHID API', 'hid' in navigator],
            ['Controller', navigator.getGamepads?.().some(Boolean)],
            ['Chrome/Edge', /Chrome|Edg/.test(navigator.userAgent)],
          ].map(([lbl, ok]) => (
            <div key={lbl} style={{ padding: '11px 14px', borderRadius: 10, background: '#0c0e18', border: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: ok ? '#00FF88' : '#FF3040', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
