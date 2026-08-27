import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_SERVER_HOST, STORAGE_HOST_KEY, STORAGE_MAC_KEY } from '../constants/config';

export async function loadServerHost(): Promise<string|null> {
  try {
    return await AsyncStorage.getItem(STORAGE_HOST_KEY);
  } catch (err) {
    console.error('Failed to load server host from storage:', err);
    return null;
  }
}

export async function saveServerHost(host: string): Promise<void> {
  try {
    if (host && host.trim()) {
      await AsyncStorage.setItem(STORAGE_HOST_KEY, host.trim());
    }
  } catch (err) {
    console.error('Failed to save server host to storage:', err);
  }
}

export async function getOrGenerateUuid(): Promise<string> {
  try {
    let mac = await AsyncStorage.getItem(STORAGE_MAC_KEY);
    if (!mac) {
      mac = `tv-${Math.floor(100000 + Math.random() * 900000)}`;
      await AsyncStorage.setItem(STORAGE_MAC_KEY, mac);
    }
    return mac;
  } catch (err) {
    console.error('Failed to get/generate device MAC:', err);
    return `tv-fallback-${Date.now()}`;
  }
}
