# Signage Android TV Client (React Native / Expo)

Lightweight, high-performance Android TV client for the **Navarra Lan Party Dynamic Digital Signage System** (`signing`). 

Inspired by the KISS principles, styling, and functionality of the Raspberry Pi Client (`raspi-client`).

---

## Features

- 📺 **Full Android TV & Kiosk Mode**: Built with `landscape` lock, dark theme, and screen sleep prevention (`expo-keep-awake`).
- ⚡ **WebSocket Protocol Compatible**: Real-time sign rotation engine supporting `IFRAME`, `HTML`, `UNASSIGNED`, and direct media URL payloads.
- 🔄 **Auto-Reconnect with Exponential Backoff**: Retries WebSocket connection automatically (1s to 30s max backoff) matching `ws-client.js`.
- 💓 **Heartbeat PING/PONG**: Automatically sends `PING` text frame every 10s and listens for `PONG`.
- ⚙️ **On-Screen Settings**: Long press anywhere or press `Select` on the TV remote to bring up the server IP configuration modal.

---

## Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Web Preview (Lightweight Testing)
```bash
npm run web
```

### 3. Run on Android TV / Emulator
Ensure ADB is connected to your TV device or emulator:
```bash
npx expo run:android
```

---

## Testing with Lightweight Android TV Emulator

### Option A: Command-Line Android TV AVD (No Heavy IDE GUI)
```bash
# 1. Download Android TV system image via sdkmanager
sdkmanager "system-images;android-30;android-tv;x86_64" "platforms;android-30"

# 2. Create AVD
avdmanager create avd -n TV_Client -k "system-images;android-30;android-tv;x86_64" --device "tv_1080p"

# 3. Launch lightweight emulator instance
emulator -avd TV_Client -no-skin -no-audio -gpu host -memory 2048
```

### Option B: Real Android TV Device via ADB Over Wi-Fi
1. Enable **Developer Options** -> **ADB Debugging** on your Android TV / Chromecast.
2. Connect from your terminal:
   ```bash
   adb connect <TV_IP_ADDRESS>:5555
   ```
3. Deploy the application:
   ```bash
   npx expo run:android
   ```
