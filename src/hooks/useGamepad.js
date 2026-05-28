import { useState, useEffect, useRef, useCallback } from 'react';

const DEADZONE = 0.1;

const applyDeadzone = (value) => {
  return Math.abs(value) > DEADZONE ? value : 0;
};

export function useGamepad() {
  const [connected, setConnected] = useState(false);
  const [axes, setAxes] = useState([0, 0, 0, 0]);
  const [buttons, setButtons] = useState(Array(17).fill(false));
  const raf = useRef(null);
  const frameCount = useRef(0);

  useEffect(() => {
    const poll = () => {
      frameCount.current++;
      // ✅ Throttle to 30 FPS (poll every 2 frames)
      if (frameCount.current % 2 === 0) {
        const pads = navigator.getGamepads?.();
        if (pads) {
          const pad = Array.from(pads).find(Boolean);
          if (pad) {
            setConnected(true);
            // ✅ Apply deadzone to analog sticks
            const processedAxes = Array.from(pad.axes).map(a => {
              const deadzoned = applyDeadzone(a);
              return +deadzoned.toFixed(3);
            });
            setAxes(processedAxes);
            setButtons(Array.from(pad.buttons).map(b => b.pressed));
          } else {
            setConnected(false);
          }
        } else {
          setConnected(false);
        }
      }
      raf.current = requestAnimationFrame(poll);
    };
    raf.current = requestAnimationFrame(poll);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const vibrate = useCallback((strong, weak, duration) => {
    try {
      const pads = navigator.getGamepads?.();
      if (!pads) return;
      const pad = Array.from(pads).find(Boolean);
      if (pad?.vibrationActuator) {
        pad.vibrationActuator.playEffect('dual-rumble', {
          duration,
          strongMagnitude: Math.min(1, strong),
          weakMagnitude: Math.min(1, weak),
        });
      }
    } catch (err) {
      console.error('Vibration failed:', err);
    }
  }, []);

  return { connected, axes, buttons, vibrate };
}
