const LIGHT_PRESETS = [
  { name: 'PS Blue', color: '#00AAFF' },
  { name: 'Red', color: '#FF3040' },
  { name: 'Green', color: '#00FF88' },
  { name: 'Purple', color: '#CC44FF' },
  { name: 'Gold', color: '#FFB800' },
  { name: 'White', color: '#FFFFFF' },
];

export function LightBarTab({ lightColor, setLightColor, card, btn }) {
  const handleColorChange = (e) => {
    setLightColor(e.target.value);
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
          Presets
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 8 }}>
          {LIGHT_PRESETS.map(preset => (
            <button
              key={preset.color}
              onClick={() => setLightColor(preset.color)}
              style={{
                ...btn,
                padding: '12px 8px',
                textAlign: 'center',
                background: lightColor === preset.color ? 'rgba(0,170,255,.1)' : 'rgba(255,255,255,.03)',
                border: `2px solid ${lightColor === preset.color ? preset.color : 'rgba(255,255,255,.1)'}`,
                borderRadius: 10,
                color: '#dde1f0',
              }}
            >
              <div style={{ width: '100%', height: 24, borderRadius: 6, background: preset.color, marginBottom: 6 }} />
              <div style={{ fontSize: 11, fontWeight: 600 }}>{preset.name}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
          Custom Color
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="color"
            value={lightColor}
            onChange={handleColorChange}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              border: '2px solid rgba(255,255,255,.1)',
              cursor: 'pointer',
            }}
          />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Current Color</p>
            <p style={{ fontSize: 12, color: '#00AAFF', fontFamily: 'monospace' }}>{lightColor.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          Preview
        </p>
        <div style={{ padding: 24, background: '#0c0e18', borderRadius: 10, textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: lightColor,
              boxShadow: `0 0 40px ${lightColor}99`,
              transition: 'all .3s ease-in-out',
            }}
          />
        </div>
      </div>
      <div style={card}>
        <p style={{ fontSize: 13, color: '#445060', lineHeight: 1.7, margin: 0 }}>
          The light bar color is simulated in this interface. To use it with real PS5 controllers, you'll need to connect via WebHID API or use platform-specific drivers.
        </p>
      </div>
    </div>
  );
}
