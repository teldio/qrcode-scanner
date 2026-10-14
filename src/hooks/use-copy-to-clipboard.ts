import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';

import { haptics } from '@/utils/haptics';

const COPIED_FEEDBACK_MS = 2000;

/**
 * Copies text and remembers which item was copied for a moment, so the UI can show a
 * "copied" state. `key` identifies the item when several share one hook (e.g. list rows).
 */
export function useCopyToClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (copiedKey === null) return;
    const timer = setTimeout(() => setCopiedKey(null), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copiedKey]);

  const copy = async (text: string, key: string = text) => {
    // Always true on iOS/Android; on web it reports whether the browser allowed the write.
    const saved = await Clipboard.setStringAsync(text);
    if (!saved) return;
    haptics.success();
    setCopiedKey(key);
  };

  return { copy, copiedKey };
}
