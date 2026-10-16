import { useCallback, useRef } from 'react';
import type { CSSProperties, KeyboardEvent, ReactElement } from 'react';
import { DEFAULT_PALETTE, PALETTE_ATTRIBUTE, PALETTE_STORAGE_KEY, isPaletteId } from '../../data/themes';
import type { Palette, PaletteId } from '../../data/themes';
import { useDocumentAttribute } from './useDocumentAttribute';

interface PaletteDotsProps {
  readonly palettes: readonly Palette[];
}

const isPalette = (value: string | null): value is PaletteId => isPaletteId(value);

function applyPalette(id: PaletteId): void {
  document.documentElement.setAttribute(PALETTE_ATTRIBUTE, id);
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* storage can be blocked; the attribute still applies for this page */
  }
}

/** A swatch's colour is passed as a custom property so CSS owns every visual state. */
interface SwatchStyle extends CSSProperties {
  '--swatch': string;
}

/**
 * Palette picker: one filled square swatch per palette, each in that
 * palette's own dominant colour. Behaves as a radio group (arrow keys move
 * and select). The active ring is drawn by CSS from `<html data-palette>`,
 * so there is no flash of the wrong selection before hydration.
 */
export function PaletteDots({ palettes }: PaletteDotsProps): ReactElement {
  const active = useDocumentAttribute<PaletteId>(PALETTE_ATTRIBUTE, DEFAULT_PALETTE, isPalette);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const step =
        event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
      if (step === 0) return;
      event.preventDefault();
      const index = palettes.findIndex((p) => p.id === active);
      const next = palettes[(index + step + palettes.length) % palettes.length];
      if (!next) return;
      applyPalette(next.id);
      refs.current[palettes.indexOf(next)]?.focus();
    },
    [palettes, active],
  );

  return (
    <div className="wd-palette" role="radiogroup" aria-label="Colour palette" onKeyDown={onKeyDown}>
      {palettes.map((palette, index) => {
        const style: SwatchStyle = { '--swatch': palette.swatch };
        const selected = palette.id === active;
        return (
          <button
            key={palette.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={palette.label}
            title={`${palette.label} — ${palette.description}`}
            tabIndex={selected ? 0 : -1}
            className="wd-palette__dot"
            data-palette-id={palette.id}
            style={style}
            onClick={() => applyPalette(palette.id)}
          />
        );
      })}
    </div>
  );
}
