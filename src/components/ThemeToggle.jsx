import { useTheme } from './ThemeProvider.jsx';

export default function ThemeToggle() {
  const { mode, cycleMode } = useTheme();
  const nextMode = mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system';
  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={cycleMode}
      aria-label={`Theme is ${mode}; switch to ${nextMode} mode`}
      title={`Theme: ${mode}`}
    >
      <span aria-hidden="true">{mode === 'dark' ? '◐' : mode === 'light' ? '☼' : '◑'}</span>
      <span className="theme-toggle-label">{mode}</span>
    </button>
  );
}
