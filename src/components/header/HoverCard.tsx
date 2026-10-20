import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { NamedIcon } from './icons';
import type { IconName } from './icons';

/**
 * HoverCard — one trigger, one structured panel. Every header hovercard goes
 * through this component so padding, type scale and spacing are identical.
 *
 * Mouse + keyboard work from CSS alone (`:hover` / `:focus-within` in
 * styles/components/header.css), so the panel opens even before this island
 * hydrates. State here is pure enhancement: click/tap pins the panel open
 * (touch has no real hover), opening one card closes any other pinned card,
 * and outside-click / Escape close it (Escape also restores focus).
 */

export interface CardRow {
  readonly label: string;
  readonly value: string;
  readonly icon?: IconName;
  /** Longer explanation, exposed as a native tooltip on the row. */
  readonly title?: string;
}

interface HoverCardProps {
  /** Accessible name for the trigger and the panel. */
  readonly label: string;
  /** Small uppercase heading at the top of the panel. */
  readonly heading: string;
  readonly rows: readonly CardRow[];
  /** What the visitor sees/clicks. */
  readonly trigger: ReactNode;
  /** Visual style of the trigger: a bare icon button, or inline text. */
  readonly variant?: 'icon' | 'text';
}

const OPEN_EVENT = 'wd:hovercard-open';

export function HoverCard({ label, heading, rows, trigger, variant = 'icon' }: HoverCardProps): ReactElement {
  const id = useId();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent): void => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      close();
      buttonRef.current?.focus();
    };
    const onSiblingOpen = (event: Event): void => {
      if (event instanceof CustomEvent && event.detail !== id) close();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_EVENT, onSiblingOpen);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_EVENT, onSiblingOpen);
    };
  }, [open, close, id]);

  const toggle = (): void => {
    if (!open) window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    setOpen((value) => !value);
  };

  const panelId = `${id}-panel`;

  return (
    <span ref={rootRef} className="wd-hovercard" data-variant={variant} data-open={open ? '' : undefined}>
      <button
        ref={buttonRef}
        type="button"
        className="wd-hovercard__trigger"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        {trigger}
      </button>
      <div className="wd-hovercard__panel" id={panelId} role="group" aria-label={label}>
        <p className="wd-hovercard__heading">{heading}</p>
        <dl className="wd-hovercard__rows">
          {rows.map((row) => (
            <div className="wd-hovercard__row" key={row.label} title={row.title}>
              <dt>
                {row.icon ? <NamedIcon name={row.icon} className="wd-hovercard__row-icon" /> : null}
                {row.label}
              </dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </span>
  );
}
