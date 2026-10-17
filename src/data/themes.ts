/**
 * Colour-palette registry — the single list the UI and CI read from.
 *
 * Palettes are a second axis, independent of light/dark mode: every palette
 * defines BOTH a dark and a light variant, so 5 palettes x 2 modes = 10 looks.
 *
 * To add one:
 *   1. add an entry below (id must be lowercase-kebab),
 *   2. copy src/styles/theme/palettes/hud.css to <id>.css and edit the values,
 *   3. add `@import './theme/palettes/<id>.css';` to src/styles/theme.css,
 *   4. add its "active swatch" selector to src/styles/components/header.css.
 * `pnpm run docs:verify` fails if step 2 or 4 is skipped.
 */
export interface PaletteDef {
  readonly id: string;
  /** Short name shown in the swatch's tooltip and accessible label. */
  readonly label: string;
  readonly description: string;
  /**
   * The palette's dominant colour (its dark-mode `--wd-accent`), painted on
   * the header swatch. Hand-copied rather than read live because every
   * swatch must show ITS palette's colour while another palette is active.
   * Keep in sync with `--wd-accent` in `./theme/palettes/<id>.css`.
   */
  readonly swatch: string;
}

export const PALETTES = [
  {
    id: 'hud',
    label: 'Recon',
    description: 'Gunmetal canvas, cyan readouts.',
    swatch: '#35d0e0',
  },
  {
    id: 'ranger',
    label: 'Ranger',
    description: 'Deep military green on dark olive.',
    swatch: '#86c45a',
  },
  {
    id: 'amber',
    label: 'Amber',
    description: 'Tactical amber over warm charcoal.',
    swatch: '#ffb02e',
  },
  {
    id: 'danger',
    label: 'Danger',
    description: 'Alert red on a blackened canvas.',
    swatch: '#ff4a3d',
  },
  {
    id: 'violet',
    label: 'Season 5',
    description: 'Neon violet over dark steel.',
    swatch: '#a875ff',
  },
] as const satisfies readonly PaletteDef[];

/** A registered palette, with its literal `id` preserved. */
export type Palette = (typeof PALETTES)[number];
export type PaletteId = Palette['id'];

export const DEFAULT_PALETTE: PaletteId = 'hud';
export const PALETTE_STORAGE_KEY = 'bf6-palette';
export const PALETTE_ATTRIBUTE = 'data-palette';

/** Starlight's own key + attribute for light/dark mode (see ThemeProvider.astro). */
export const MODE_STORAGE_KEY = 'starlight-theme';
export const MODE_ATTRIBUTE = 'data-theme';

export type ThemeMode = 'light' | 'dark';

export function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some((p) => p.id === value);
}
