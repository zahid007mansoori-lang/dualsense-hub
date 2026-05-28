import React from 'react';

// ✅ Memoized SVG for performance
export const ControllerSVG = React.memo(
  ({ buttons: btns, axes, lightColor }) => {
    const b = i => btns[i] || false;
    const lx = axes[0] * 16;
    const ly = axes[1] * 16;
    const rx = axes[2] * 16;
    const ry = axes[3] * 16;

    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', maxWidth: 420 }}>
        <defs>
          <radialGradient id="cbg" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#252838" />
            <stop offset="100%" stopColor="#12131e" />
          </radialGradient>
        </defs>
        <path
          d="M82,82 Q62,62 57,102 Q52,162 72,202 Q92,238 132,238 Q166,238 176,200 Q181,176 200,170 Q219,176 224,200 Q234,238 268,238 Q308,238 328,202 Q348,162 343,102 Q338,62 318,82 Q290,56 200,56 Q110,56 82,82 Z"
          fill="url(#cbg)"
          stroke="#2a3050"
          strokeWidth="1.5"
        />
        <rect x="166" y="57" width="68" height="5" rx="2.5" fill={lightColor} opacity="0.95" />
        <rect x="158" y="83" width="84" height="52" rx="8" fill="#111420" stroke="#252838" strokeWidth="1" />
        {/* D-Pad */}
        <rect x="97" y="113" width="14" height="18" rx="3" fill={b(12) ? '#00AAFF' : '#1c1f30'} stroke="#2a3050" strokeWidth="1" />
        <rect x="97" y="145" width="14" height="18" rx="3" fill={b(13) ? '#00AAFF' : '#1c1f30'} stroke="#2a3050" strokeWidth="1" />
        <rect x="81" y="129" width="18" height="14" rx="3" fill={b(14) ? '#00AAFF' : '#1c1f30'} stroke="#2a3050" strokeWidth="1" />
        <rect x="109" y="129" width="18" height="14" rx="3" fill={b(15) ? '#00AAFF' : '#1c1f30'} stroke="#2a3050" strokeWidth="1" />
        {/* Face Buttons */}
        <circle cx="287" cy="116" r="9" fill={b(3) ? '#1DBF73' : '#1c1f30'} stroke={b(3) ? '#1DBF73' : '#2a3050'} strokeWidth="1.5" />
        <text x="287" y="120" textAnchor="middle" fontSize="9" fill={b(3) ? '#fff' : '#44506a'}>
          △
        </text>
        <circle cx="305" cy="133" r="9" fill={b(1) ? '#FF3040' : '#1c1f30'} stroke={b(1) ? '#FF3040' : '#2a3050'} strokeWidth="1.5" />
        <text x="305" y="137" textAnchor="middle" fontSize="9" fill={b(1) ? '#fff' : '#44506a'}>
          ○
        </text>
        <circle cx="287" cy="150" r="9" fill={b(0) ? '#4488FF' : '#1c1f30'} stroke={b(0) ? '#4488FF' : '#2a3050'} strokeWidth="1.5" />
        <text x="287" y="154" textAnchor="middle" fontSize="9" fill={b(0) ? '#fff' : '#44506a'}>
          ✕
        </text>
        <circle cx="269" cy="133" r="9" fill={b(2) ? '#FF66AA' : '#1c1f30'} stroke={b(2) ? '#FF66AA' : '#2a3050'} strokeWidth="1.5" />
        <text x="269" y="137" textAnchor="middle" fontSize="9" fill={b(2) ? '#fff' : '#44506a'}>
          □
        </text>
        {/* Sticks */}
        <circle cx="148" cy="168" r="20" fill="#0c0e18" stroke="#1c1f30" strokeWidth="1.5" />
        <circle cx={148 + lx} cy={168 + ly} r="10" fill={b(10) ? '#00AAFF' : '#252838'} stroke={b(10) ? '#00AAFF' : '#3a3d52'} strokeWidth="1.5" />
        <circle cx="240" cy="168" r="20" fill="#0c0e18" stroke="#1c1f30" strokeWidth="1.5" />
        <circle cx={240 + rx} cy={168 + ry} r="10" fill={b(11) ? '#00AAFF' : '#252838'} stroke={b(11) ? '#00AAFF' : '#3a3d52'} strokeWidth="1.5" />
        {/* Shoulder Buttons */}
        <rect x="72" y="64" width="52" height="15" rx="7" fill={b(4) ? '#00AAFF' : '#1c1f30'} stroke={b(4) ? '#00AAFF' : '#2a3050'} strokeWidth="1.5" />
        <text x="98" y="75" textAnchor="middle" fontSize="9" fill={b(4) ? '#fff' : '#44506a'} fontWeight="bold">
          L1
        </text>
        <rect x="276" y="64" width="52" height="15" rx="7" fill={b(5) ? '#00AAFF' : '#1c1f30'} stroke={b(5) ? '#00AAFF' : '#2a3050'} strokeWidth="1.5" />
        <text x="302" y="75" textAnchor="middle" fontSize="9" fill={b(5) ? '#fff' : '#44506a'} fontWeight="bold">
          R1
        </text>
        {/* Triggers */}
        <rect x="72" y="46" width="52" height="17" rx="8" fill={b(6) ? '#00AAFF' : '#181a28'} stroke={b(6) ? '#00AAFF' : '#2a3050'} strokeWidth="1.5" />
        <text x="98" y="58" textAnchor="middle" fontSize="9" fill={b(6) ? '#fff' : '#44506a'} fontWeight="bold">
          L2
        </text>
        <rect x="276" y="46" width="52" height="17" rx="8" fill={b(7) ? '#00AAFF' : '#181a28'} stroke={b(7) ? '#00AAFF' : '#2a3050'} strokeWidth="1.5" />
        <text x="302" y="58" textAnchor="middle" fontSize="9" fill={b(7) ? '#fff' : '#44506a'} fontWeight="bold">
          R2
        </text>
        {/* Menu Buttons */}
        <circle cx="174" cy="106" r="7" fill={b(8) ? '#00AAFF' : '#1c1f30'} stroke={b(8) ? '#00AAFF' : '#2a3050'} strokeWidth="1" />
        <text x="174" y="110" textAnchor="middle" fontSize="7" fill={b(8) ? '#fff' : '#44506a'}>
          ☰
        </text>
        <circle cx="226" cy="106" r="7" fill={b(9) ? '#00AAFF' : '#1c1f30'} stroke={b(9) ? '#00AAFF' : '#2a3050'} strokeWidth="1" />
        <text x="226" y="110" textAnchor="middle" fontSize="7" fill={b(9) ? '#fff' : '#44506a'}>
          ⋯
        </text>
        {/* PS Button */}
        <circle cx="200" cy="145" r="10" fill={b(16) ? '#0077FF' : '#181a28'} stroke={b(16) ? '#00AAFF' : '#2a3050'} strokeWidth="1.5" />
        <text x="200" y="149" textAnchor="middle" fontSize="10" fill={b(16) ? '#fff' : '#44506a'} fontWeight="bold">
          ⏻
        </text>
      </svg>
    );
  },
  (prev, next) => {
    // ✅ Custom comparison to prevent unnecessary re-renders
    return (
      JSON.stringify(prev.buttons) === JSON.stringify(next.buttons) &&
      JSON.stringify(prev.axes) === JSON.stringify(next.axes) &&
      prev.lightColor === next.lightColor
    );
  },
);
