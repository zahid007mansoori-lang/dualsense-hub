const TRIGGER_MODES = [
  { id: 0, name: 'Off', desc: 'No resistance' },
  { id: 1, name: 'Rigid', desc: 'Full stop at threshold' },
  { id: 2, name: 'Pulse', desc: 'Vibrating resistance' },
  { id: 3, name: 'Slope', desc: 'Gradual increase' },
  { id: 4, name: 'Snap', desc: 'Click-point effect' },
];

export function TriggersTab({ leftTrigger, setLeftTrigger, rightTrigger, setRightTrigger, card, btn }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {[
        { label: 'Left Trigger (L2)', val: leftTrigger, set: setLeftTrigger },
        { label: 'Right Trigger (R2)', val: rightTrigger, set: setRightTrigger },
      ].map(({ label, val, set }) => (
        <div key={label} style={card}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
            {label}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 46, height: 90, borderRadius: '6px 6px 22px 22px', background: '#0c0e18', border: '2px solid #1e2236', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${(val / 4) * 100}%`,
                  background: 'linear-gradient(to top, #00AAFF, #0055FF)',
                  transition: 'height .3s',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {TRIGGER_MODES.map(tm => (
              <button
                key={tm.id}
                onClick={() => set(tm.id)}
                style={{
                  ...btn,
                  padding: '9px 12px',
                  textAlign: 'left',
                  background: val === tm.id ? 'rgba(0,170,255,.1)' : 'rgba(255,255,255,.03)',
                  border: `1px solid ${val === tm.id ? '#00AAFF' : 'rgba(255,255,255,.07)'}`,
                  color: '#dde1f0',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: val === tm.id ? '#00AAFF' : '#dde1f0' }}>{tm.name}</div>
                <div style={{ fontSize: 11, color: '#445060', marginTop: 2 }}>{tm.desc}</div>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{ ...card, gridColumn: '1 / -1' }}>
        <p style={{ fontSize: 13, color: '#445060', lineHeight: 1.7, margin: 0 }}>
          Adaptive triggers use built-in actuators for variable resistance — simulating bowstring tension, gun recoil, or surface textures. Full control requires Chrome/Edge with USB connection.
        </p>
      </div>
    </div>
  );
}
