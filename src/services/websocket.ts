/**
 * Normalizes host strings (e.g., "192.168.1.100:8080" or "http://192.168.1.100:8080")
 * to valid WebSocket URLs (ws:// or wss://).
 */
export function normalizeWsUrl(serverHost: string, uuid: string): string {
  let baseHost = serverHost.trim();
  if (!baseHost.startsWith('ws://') && !baseHost.startsWith('wss://')) {
    if (/^https:\/\//i.test(baseHost)) {
      baseHost = baseHost.replace(/^https:\/\//i, 'wss://');
    } else if (/^http:\/\//i.test(baseHost)) {
      baseHost = baseHost.replace(/^http:\/\//i, 'ws://');
    } else {
      const isLocalIpWithPort = /^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.).*:\d+/.test(baseHost);
      baseHost = isLocalIpWithPort ? `ws://${baseHost}` : `wss://${baseHost}`;
    }
  }
  baseHost = baseHost.replace(/\/$/, '');
  return `${baseHost}/ws?uuid=${encodeURIComponent(uuid)}`;
}
