import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export interface HtmlSignProps {
  content: string;
}

export function HtmlSign({ content }: HtmlSignProps) {
  return (
    <WebView
      source={{ html: content }}
      style={styles.webView}
      javaScriptEnabled
    />
  );
}

const styles = StyleSheet.create({
  webView: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: '#000000',
  },
});
