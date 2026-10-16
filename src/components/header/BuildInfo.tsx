import type { ReactElement } from 'react';
import { HoverCard } from './HoverCard';
import type { CardRow } from './HoverCard';
import { InfoIcon } from './icons';

interface BuildInfoProps {
  readonly tool: string;
  readonly model: string;
  readonly elapsedLabel: string;
  readonly elapsedTitle: string;
}

/** Build provenance behind a single borderless icon. Computed at build time. */
export function BuildInfo({ tool, model, elapsedLabel, elapsedTitle }: BuildInfoProps): ReactElement {
  const rows: readonly CardRow[] = [
    { label: 'Built with', value: tool, icon: 'tool' },
    { label: 'Model', value: model, icon: 'model' },
    { label: 'Elapsed', value: elapsedLabel, icon: 'clock', title: elapsedTitle },
  ];

  return (
    <HoverCard
      label="Build info"
      heading="Build info"
      rows={rows}
      variant="icon"
      trigger={<InfoIcon className="wd-icon-chip__glyph" />}
    />
  );
}
