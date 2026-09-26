/**
 * SecurityShield — Client-Side Anti-Inspection, Copy-Paste Guard & Tamper Prevention
 * Mani DeepTech Solutions
 *
 * Rules:
 * - Normal public pages: Copy, cut, selection, and DevTools inspection are strictly BLOCKED.
 * - Admin page (/admin, #admin, [data-admin-portal]): Complete freedom for copying, pasting, and selecting.
 */

export function isAdminContext(target?: EventTarget | null): boolean {
  if (typeof window === 'undefined') return false;

  // 1. URL Path or Hash
  const path = (window.location.pathname || '').toLowerCase();
  const hash = (window.location.hash || '').toLowerCase();
  if (path.startsWith('/admin') || hash.startsWith('#admin')) return true;

  // 2. Active class on body or html
  if (
    document.body?.classList.contains('admin-active') ||
    document.documentElement?.classList.contains('admin-active')
  ) {
    return true;
  }

  // 3. Event target inside admin portal container
  if (target instanceof Element) {
    if (target.closest('[data-admin-portal]') || target.closest('.admin-portal-root')) {
      return true;
    }
  }

  // 4. Any admin portal element in DOM
  if (document.querySelector('[data-admin-portal]')) {
    return true;
  }

  return false;
}

export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Right-Click Context Menu (Blocked on normal pages, allowed on admin page)
  window.addEventListener(
    'contextmenu',
    (e: MouseEvent) => {
      if (isAdminContext(e.target)) {
        return; // Allow right-click menu in admin portal
      }
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 2. Block Copy on normal pages (Allowed in Admin Portal)
  window.addEventListener(
    'copy',
    (e: ClipboardEvent) => {
      if (isAdminContext(e.target)) {
        return; // Allow copy in admin portal
      }
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 3. Block Cut on normal pages (Allowed in Admin Portal)
  window.addEventListener(
    'cut',
    (e: ClipboardEvent) => {
      if (isAdminContext(e.target)) {
        return; // Allow cut in admin portal
      }
      e.preventDefault();
      return false;
    },
    { capture: true }
  );

  // 4. Block Paste on normal pages (Allowed in Admin Portal & form inputs)
  window.addEventListener(
    'paste',
    (e: ClipboardEvent) => {
      if (isAdminContext(e.target)) {
        return; // Allow paste anywhere in admin portal
      }
      // On public pages, only allow paste into inputs and textareas (e.g. contact form)
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (!isInput) {
        e.preventDefault();
        return false;
      }
    },
    { capture: true }
  );

  // 5. Block Text Selection Start on normal pages (outside inputs)
  window.addEventListener(
    'selectstart',
    (e: Event) => {
      if (isAdminContext(e.target)) {
        return; // Allow text selection in admin portal
      }
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (!isInput) {
        e.preventDefault();
        return false;
      }
    },
    { capture: true }
  );

  // 6. Block DevTools, Inspect, View Source & Copy/Cut Keyboard Shortcuts
  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
      const inAdmin = isAdminContext(e.target);

      // F12 key (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      if (ctrlOrCmd) {
        const key = (e.key || '').toUpperCase();
        const target = e.target as HTMLElement;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

        // Ctrl+U (View Page Source)
        if (key === 'U' || e.keyCode === 85) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+S (Save Page)
        if (key === 'S' || e.keyCode === 83) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }

        // Ctrl+Shift+I / J / C (DevTools & Inspect Element)
        if (e.shiftKey) {
          if (['I', 'J', 'C', 'K'].includes(key) || [73, 74, 67, 75].includes(e.keyCode)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        // Mac Option combinations: Cmd + Alt + I / J / C
        if (e.altKey) {
          if (['I', 'J', 'C'].includes(key) || [73, 74, 67].includes(e.keyCode)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }

        // Copy / Cut / Select-All shortcut restrictions on public pages
        if (!inAdmin) {
          // Block Ctrl+C (Copy)
          if (key === 'C' || e.keyCode === 67) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }

          // Block Ctrl+X (Cut)
          if (key === 'X' || e.keyCode === 88) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }

          // Block Ctrl+A (Select All) outside inputs
          if ((key === 'A' || e.keyCode === 65) && !isInput) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        }
      }
    },
    { capture: true }
  );

  // 7. Prevent dragging images / links to desktop
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

  // 8. Console Protection in Production
  if (import.meta.env.PROD) {
    try {
      const noop = () => {};
      console.log = noop;
      console.info = noop;
      console.debug = noop;
      console.dir = noop;
      console.table = noop;
    } catch {}
  }

  // 9. Anti-Debugging Deterrent Trap
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
