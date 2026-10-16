import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to an attribute on <html> (e.g. `data-theme`, `data-palette`).
 *
 * The document element is the single source of truth for both axes: the
 * pre-paint scripts in Starlight's ThemeProvider and Head.astro set it before
 * first paint, and every instance of a control (the header one and the one in
 * the mobile menu) reads it back through this hook, so they never drift apart.
 *
 * `fallback` is used during server rendering and for unrecognised values.
 */
export function useDocumentAttribute<T extends string>(
  name: string,
  fallback: T,
  isValid: (value: string | null) => value is T,
): T {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: [name] });
      return () => observer.disconnect();
    },
    [name],
  );

  const getSnapshot = useCallback((): T => {
    const value = document.documentElement.getAttribute(name);
    return isValid(value) ? value : fallback;
  }, [name, fallback, isValid]);

  const getServerSnapshot = useCallback((): T => fallback, [fallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
