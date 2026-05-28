# DualSense Hub 🎮

A comprehensive PS5 DualSense controller interface for PC and web browsers. Test haptics, triggers, light bar control, and more with a beautiful, modern UI.

## Features

✅ **Live Controller Visualization** - See buttons, sticks, and triggers in real-time  
✅ **Haptic Feedback Testing** - Multiple pre-built patterns (Rumble, Pulse, Impact, Rain, Engine)  
✅ **Adaptive Triggers** - Control L2/R2 resistance modes  
✅ **Light Bar Control** - Choose preset colors or custom hex values  
✅ **Keyboard Shortcuts** - Quick access (R for Rumble, P for Pulse, I for Impact)  
✅ **Profile System** - Save/load custom controller configurations  
✅ **Performance Optimized** - Throttled polling (30 FPS), memoized components, no memory leaks  
✅ **Deadzone Filtering** - Eliminates stick drift jitter  

## Requirements

- **Browser**: Chrome/Chromium Edge (latest)
- **Connection**: USB or Bluetooth (some features require USB)
- **OS**: Windows, macOS, or Linux

## Installation

```bash
# Clone repository
git clone https://github.com/zahid007mansoori-lang/dualsense-hub.git
cd dualsense-hub

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Connect Controller**: Plug in your PS5 DualSense via USB or pair via Bluetooth
2. **Wait for Detection**: Status bar will show "✓ Controller Connected"
3. **Navigate Tabs**:
   - **Controller**: Live button/stick visualization
   - **Haptics**: Test vibration patterns and intensity
   - **Triggers**: Configure L2/R2 adaptive resistance
   - **Light Bar**: Change LED color
   - **Profiles**: Save/load controller presets

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `R` | Fire Rumble haptic |
| `P` | Fire Pulse haptic |
| `I` | Fire Impact haptic |

## API Support

- ✅ Gamepad API (polling, buttons, sticks)
- ✅ Vibration Actuator API (haptics)
- ⚠️ Adaptive Trigger API (experimental, USB-only)
- ⚠️ WebHID API (future feature)

## Technical Highlights

### Performance
- Polling throttled to 30 FPS (saves 50% CPU vs 60 FPS)
- SVG re-renders memoized with custom comparison
- Inline styles moved to constants
- Proper cleanup of RAF and timers

### Bug Fixes
- ✅ Fixed haptic timer memory leak
- ✅ Added deadzone filtering to analog sticks
- ✅ Error handling for disconnected controllers
- ✅ Proper resource cleanup on unmount

### Architecture
- Custom `useGamepad()` hook for controller polling
- Modular tab components (ControllerTab, HapticsTab, etc.)
- localStorage for profile persistence
- Keyboard event listeners with cleanup

## Troubleshooting

**Controller not detected?**
- Ensure USB connection or Bluetooth pairing is active
- Check that Chrome/Chromium Edge is used
- Refresh the page

**Haptics not working?**
- Some browsers/OS combinations don't support vibrationActuator API
- USB connection is required for full haptic support
- Check browser console for errors

**Stick drift showing?**
- Deadzone filtering is applied (0.1 threshold)
- Drift within ±0.1 is filtered out
- Adjust in `src/hooks/useGamepad.js` if needed

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Preferred, full API support |
| Edge | ✅ Full | Chromium-based, full API support |
| Firefox | ⚠️ Partial | Gamepad API only, no haptics |
| Safari | ❌ None | No Gamepad API |

## Future Enhancements

- [ ] Button remapping UI
- [ ] Custom haptic pattern creator
- [ ] Trigger curve visualization editor
- [ ] WebHID API support for more detailed control
- [ ] Gyro & accelerometer support
- [ ] Session recording/playback
- [ ] Multi-controller support

## License

MIT - Feel free to use and modify!

## Contributing

Contributions welcome! Please submit issues and PRs.

---

**Made with ❤️ for DualSense controllers and gamers everywhere**
