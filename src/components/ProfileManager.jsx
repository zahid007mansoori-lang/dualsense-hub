import { useState } from 'react';

export function ProfileManager({ profiles, onLoadProfile, onSaveProfile, onDeleteProfile, currentState, btn, card }) {
  const [newProfileName, setNewProfileName] = useState('');

  const handleSave = () => {
    if (newProfileName.trim()) {
      onSaveProfile(newProfileName, currentState);
      setNewProfileName('');
    }
  };

  return (
    <div style={card}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#445060', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
        ⚙️ Profiles
      </p>
      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="New profile name"
            value={newProfileName}
            onChange={e => setNewProfileName(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,.1)',
              background: '#0c0e18',
              color: '#dde1f0',
              fontSize: 12,
            }}
            onKeyPress={e => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            style={{
              ...btn,
              padding: '8px 12px',
              background: '#00AAFF',
              color: '#fff',
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 8,
            }}
          >
            Save
          </button>
        </div>
        {Object.entries(profiles).map(([name, profile]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0c0e18', borderRadius: 8, border: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, margin: 0, color: '#dde1f0' }}>{name}</p>
              <p style={{ fontSize: 10, color: '#445060', margin: '4px 0 0' }}>Light: {profile.lightColor}</p>
            </div>
            <button
              onClick={() => onLoadProfile(name)}
              style={{
                ...btn,
                padding: '6px 10px',
                background: 'rgba(0,170,255,.1)',
                color: '#00AAFF',
                fontWeight: 600,
                fontSize: 11,
                borderRadius: 6,
              }}
            >
              Load
            </button>
            <button
              onClick={() => onDeleteProfile(name)}
              style={{
                ...btn,
                padding: '6px 10px',
                background: 'rgba(255,48,64,.1)',
                color: '#FF3040',
                fontWeight: 600,
                fontSize: 11,
                borderRadius: 6,
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
