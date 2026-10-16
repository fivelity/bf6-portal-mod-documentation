import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { MODE_ATTRIBUTE, MODE_STORAGE_KEY } from '../../data/themes';
import type { ThemeMode } from '../../data/themes';
import { MoonIcon, SunIcon } from './icons';
import { useDocumentAttribute } from './useDocumentAttribute';

const isMode = (value: string | null): value is ThemeMode => value === 'light' || value === 'dark';

/** Writes the mode the same way Starlight's own picker does. */
function applyMode(mode: ThemeMode): void {
  document.documentElement.setAttribute(MODE_ATTRIBUTE, mode);
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    /* storage can be blocked (private mode); the attribute still applies for this page */
  }
}

/**
 * Light/dark switch: a pill track with a sun and a moon, and a sliding thumb
 * that carries the active one. The thumb position and icon colours are
 * driven by CSS from `<html data-theme>` (see styles/components/header.css),
 * so the control is already correct on first paint — React only adds the
 * behaviour and the accessible state.
 */
export function ThemeToggle(): ReactElement {
  const mode = useDocumentAttribute<ThemeMode>(MODE_ATTRIBUTE, 'dark', isMode);
  const isDark = mode === 'dark';

  const toggle = useCallback(() => applyMode(isDark ? 'light' : 'dark'), [isDark]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="wd-mode-toggle"
      onClick={toggle}
    >
      <span className="wd-mode-toggle__track" aria-hidden="true">
        <span className="wd-mode-toggle__thumb" />
        <SunIcon className="wd-mode-toggle__icon wd-mode-toggle__icon--sun" />
        <MoonIcon className="wd-mode-toggle__icon wd-mode-toggle__icon--moon" />
      </span>
    </button>
  );
}
