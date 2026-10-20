import type { ReactElement } from 'react';
import { HoverCard } from './HoverCard';
import type { CardRow } from './HoverCard';
import { TagIcon } from './icons';

interface SdkVersionProps {
  readonly sdkVersion: string;
  readonly modTypesVersion: string;
  readonly utilsVersion: string;
}

/**
 * Always-visible SDK version: tag icon + version in the theme accent colour.
 * Hovering or focusing it opens the standard hovercard with the package
 * versions it was generated from. Values come from data/sdk-info.ts (parsed
 * from the installed packages) — never hand-typed.
 */
export function SdkVersion({ sdkVersion, modTypesVersion, utilsVersion }: SdkVersionProps): ReactElement {
  const rows: readonly CardRow[] = [
    { label: 'SDK', value: sdkVersion },
    { label: 'mod-types', value: modTypesVersion },
    { label: 'utils', value: utilsVersion },
  ];

  return (
    <HoverCard
      label={`Official BF6 Portal SDK ${sdkVersion}`}
      heading="Versions"
      rows={rows}
      variant="text"
      trigger={
        <>
          <TagIcon className="wd-sdk-tag__icon" />
          <span className="wd-sdk-tag__label">SDK</span>
          <span className="wd-sdk-tag__version">{sdkVersion}</span>
        </>
      }
    />
  );
}
