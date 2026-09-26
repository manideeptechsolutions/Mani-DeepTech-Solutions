/**
 * SecurityShield — Client-Side Anti-Inspection & Tamper Prevention
 * Mani DeepTech Solutions
 */

export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  window.addEventListener(
    'contextmenu',
    (e: MouseEvent) => {
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 2. Block DevTools, Inspect & View Source Keyboard Shortcuts
  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      if (ctrlOrCmd) {
        // Ctrl+U (View Page Source)
        if (e.key === 'u' || e.key === 'U' || e.keyCode === 85) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+S (Save Page)
        if (e.key === 's' || e.key === 'S' || e.keyCode === 83) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+Shift+I / J / C (DevTools & Inspect Element)
        if (e.shiftKey) {
          const key = (e.key || '').toUpperCase();
          if (['I', 'J', 'C', 'K'].includes(key) || [73, 74, 67, 75].includes(e.keyCode)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        // Mac Option combinations: Cmd + Alt + I / J / C
        if (e.altKey) {
          const key = (e.key || '').toUpperCase();
          if (['I', 'J', 'C'].includes(key) || [73, 74, 67].includes(e.keyCode)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }
      }
    },
    { capture: true }
  );

  // 3. Prevent dragging images / media to desktop
  window.addEventListener(
    'dragstart',
    (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.tagName === 'A')) {
        e.preventDefault();
        return false;
      }
    },
    { capture: true }
  );

  // 4. Console Protection & Warning in Production
  if (import.meta.env.PROD) {
    try {
      // Neutralize console methods so credentials/state cannot be inspected
      const noop = () => {};
      console.log = noop;
      console.info = noop;
      console.debug = noop;
      console.dir = noop;
      console.table = noop;
    } catch {}
  }

  // 5. Anti-Debugging Deterrent Trap
  const devToolsDetection = () => {
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      try {
        console.clear();
      } catch {}
    }
  };

  window.addEventListener('resize', devToolsDetection, { passive: true });
}
