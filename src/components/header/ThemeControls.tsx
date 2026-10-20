import type { ReactElement } from 'react';
import { PALETTES } from '../../data/themes';
import { PaletteDots } from './PaletteDots';
import { ThemeToggle } from './ThemeToggle';

/**
 * The header's theme cluster: palette swatches directly beside the
 * light/dark switch. One island, so both stay in step and hydrate together.
 */
export function ThemeControls(): ReactElement {
  return (
    <div className="wd-theme-controls">
      <PaletteDots palettes={PALETTES} />
      <ThemeToggle />
    </div>
  );
}
