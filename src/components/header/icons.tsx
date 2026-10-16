import type { ReactElement, SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'>;

/** Shared 24x24 outline-icon frame: 1.6px round strokes, inherits `currentColor`. */
function Frame({ children, ...rest }: IconProps & { children: ReactElement | ReactElement[] }): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function SunIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
    </Frame>
  );
}

export function MoonIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </Frame>
  );
}

export function TagIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <path d="M20 12.5 12.5 20a1.5 1.5 0 0 1-2.12 0l-6.38-6.38a1.5 1.5 0 0 1 0-2.12L11.5 4H19a1 1 0 0 1 1 1v7.5Z" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </Frame>
  );
}

export function InfoIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.75" r="1.1" fill="currentColor" stroke="none" />
    </Frame>
  );
}

export function ToolIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Frame>
  );
}

export function ModelIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <rect x="3" y="8" width="18" height="10" rx="1.5" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      <circle cx="8.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </Frame>
  );
}

export function ClockIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Frame>
  );
}

export function PackageIcon(props: IconProps): ReactElement {
  return (
    <Frame {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </Frame>
  );
}

export type IconName = 'tool' | 'model' | 'clock' | 'package' | 'tag';

const REGISTRY: Record<IconName, (props: IconProps) => ReactElement> = {
  tool: ToolIcon,
  model: ModelIcon,
  clock: ClockIcon,
  package: PackageIcon,
  tag: TagIcon,
};

export function NamedIcon({ name, ...rest }: IconProps & { name: IconName }): ReactElement {
  const Component = REGISTRY[name];
  return <Component {...rest} />;
}
