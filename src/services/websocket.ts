/**
 * Normalizes host strings (e.g., "192.168.1.100:8080" or "http://192.168.1.100:8080")
 * to valid WebSocket URLs (ws:// or wss://).
 */
export function normalizeWsUrl(serverHost: string, uuid: string): string {
  let baseHost = serverHost.trim();
  if (!baseHost.startsWith('ws://') && !baseHost.startsWith('wss://')) {
    baseHost = baseHost.replace(/^http:\/\//i, 'ws://')
                       .replace(/^https:\/\//i, 'wss://');
    if (!baseHost.startsWith('ws://') && !baseHost.startsWith('wss://')) {
      baseHost = `ws://${baseHost}`;
    }
  }
  baseHost = baseHost.replace(/\/$/, '');
  return `${baseHost}/ws?uuid=${encodeURIComponent(uuid)}`;
}
