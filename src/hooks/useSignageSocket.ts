import { useState, useEffect, useRef } from 'react';
import { PING_INTERVAL_MS, INITIAL_BACKOFF_MS, MAX_BACKOFF_MS } from '../constants/config';
import { normalizeWsUrl } from '../services/websocket';
import { SignPayload } from '../types/signage';

export interface UseSignageSocketResult {
  connected: boolean;
  signPayload: SignPayload | null;
}

export function useSignageSocket(
  serverHost: string,
  uuid: string
): UseSignageSocketResult {
  const [connected, setConnected] = useState<boolean>(false);
  const [signPayload, setSignPayload] = useState<SignPayload | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(INITIAL_BACKOFF_MS);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!uuid || !serverHost) return;

    let isMounted = true;

    function connectWebSocket() {
      const wsUrl = normalizeWsUrl(serverHost, uuid);
      console.log('Connecting to Signage WebSocket:', wsUrl);

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        console.log('WebSocket connected successfully');
        setConnected(true);
        backoffRef.current = INITIAL_BACKOFF_MS;

        // Setup PING heartbeat loop
        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send('PING');
          }
        }, PING_INTERVAL_MS);
      };

      ws.onmessage = (evt: WebSocketMessageEvent) => {
        if (!isMounted) return;
        const raw = evt.data;

        // Ignore PONG heartbeat response
        if (raw === 'PONG') return;

        try {
          const msg: SignPayload = JSON.parse(raw);
          setSignPayload(msg);
        } catch (err) {
          console.warn('Non-JSON WebSocket frame received:', raw);
        }
      };

      ws.onclose = () => {
        if (!isMounted) return;
        console.log(`WebSocket closed. Retrying in ${backoffRef.current}ms`);
        setConnected(false);

        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);

        setTimeout(() => {
          if (isMounted) connectWebSocket();
        }, backoffRef.current);

        backoffRef.current = Math.min(MAX_BACKOFF_MS, backoffRef.current * 2);
      };

      ws.onerror = (err: Event) => {
        if (!isMounted) return;

        const errorMessage = (err as { message?: string }).message;
        if (errorMessage && errorMessage.trim()) {
          console.error(`WebSocket transport error (${errorMessage}). Reconnecting...`);
        } else {
          console.error('WebSocket transport error. Reconnecting...');
        }

        setConnected(false);

        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      };
    }

    connectWebSocket();

    return () => {
      isMounted = false;
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [uuid, serverHost]);

  return { connected, signPayload };
}
