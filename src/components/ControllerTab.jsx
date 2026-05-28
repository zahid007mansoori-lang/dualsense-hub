export function ControllerTab({ buttons, axes, card }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ ...card, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#2a3040', marginTop: 4 }}>Buttons light up when pressed</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[{ label: 'Left Stick', x: axes[0], y: axes[1] }, { label: 'Right Stick', x: axes[2], y: axes[3] }].map(({ label, x, y }) => (
          <div key={label} style={card}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              {label}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <div style={{ position: 'relative', width: 70, height: 70, borderRadius: '50%', background: '#0c0e18', border: '2px solid #1e2236' }}>
                <div
                  style={{
                    position: 'absolute',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#00AAFF',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x * 22}px), calc(-50% + ${y * 22}px))`,
                    transition: 'transform .05s',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 12, color: '#445060' }}>
              <span>
                X: <b style={{ color: '#dde1f0' }}>{(x || 0).toFixed(2)}</b>
              </span>
              <span>
                Y: <b style={{ color: '#dde1f0' }}>{(y || 0).toFixed(2)}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          Buttons
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))', gap: 7 }}>
          {[
            ['✕', 0, '#4488FF'],
            ['○', 1, '#FF3040'],
            ['□', 2, '#FF66AA'],
            ['△', 3, '#1DBF73'],
            ['L1', 4, '#00AAFF'],
            ['R1', 5, '#00AAFF'],
            ['L2', 6, '#00AAFF'],
            ['R2', 7, '#00AAFF'],
            ['Create', 8, '#aaa'],
            ['Options', 9, '#aaa'],
            ['L3', 10, '#aaa'],
            ['R3', 11, '#aaa'],
            ['↑', 12, '#aaa'],
            ['↓', 13, '#aaa'],
            ['←', 14, '#aaa'],
            ['→', 15, '#aaa'],
            ['PS', 16, '#00AAFF'],
          ].map(([lbl, idx, col]) => (
            <div
              key={idx}
              style={{
                padding: '8px 4px',
                borderRadius: 8,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 700,
                transition: 'all .1s',
                background: buttons[idx] ? col + '22' : '#0c0e18',
                border: `1px solid ${buttons[idx] ? col : '#1e2236'}`,
                color: buttons[idx] ? col : '#2a3040',
              }}
            >
              {lbl}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
