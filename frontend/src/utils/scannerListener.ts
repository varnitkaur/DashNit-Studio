import { useEffect } from 'react';

/**
 * Universal Keyboard-Wedge Barcode Scanner Hook
 * Listens for high-speed keystroke streams characteristic of handheld laser/CCD scanners.
 * Most USB/Bluetooth barcode scanners type characters with < 50ms intervals and finish with 'Enter'.
 */
export function useBarcodeScanner(onScan: (barcode: string) => void, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let buffer = '';
    let lastKeyTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes inside regular input fields or textareas unless target is body
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentTime = Date.now();
      const diff = currentTime - lastKeyTime;
      lastKeyTime = currentTime;

      if (e.key === 'Enter') {
        if (buffer.length >= 3) {
          onScan(buffer.trim());
        }
        buffer = '';
        return;
      }

      // If typing speed is too slow (> 150ms between keys), reset buffer unless starting
      if (diff > 150) {
        buffer = '';
      }

      if (e.key.length === 1) {
        buffer += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onScan, enabled]);
}
