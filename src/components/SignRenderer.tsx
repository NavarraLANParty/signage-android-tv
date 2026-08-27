import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { UnassignedSign } from './UnassignedSign';
import { IframeSign } from './IframeSign';
import { HtmlSign } from './HtmlSign';
import { TextSign } from './TextSign';
import { SignPayload, IframeSignPayload, HtmlSignPayload, UnassignedPayload, RaspiSignPayload } from '../types/signage';

export interface SignRendererProps {
  signPayload: SignPayload | null;
  uuid: string;
}

export function SignRenderer({ signPayload, uuid }: SignRendererProps) {
  if (!signPayload || typeof signPayload !== 'object') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  // 1. Backend state: UNASSIGNED
  if ((signPayload as UnassignedPayload).type === 'UNASSIGNED') {
    return <UnassignedSign uuid={uuid} />;
  }

  // 2. Backend state: IFRAME sign
  if ((signPayload as IframeSignPayload).type === 'IFRAME' && (signPayload as IframeSignPayload).url) {
    const iframePayload = signPayload as IframeSignPayload;
    return <IframeSign url={iframePayload.url} />;
  }

  // 3. Backend state: HTML sign
  if ((signPayload as HtmlSignPayload).type === 'HTML' && (signPayload as HtmlSignPayload).content) {
    const htmlPayload = signPayload as HtmlSignPayload;
    return <HtmlSign content={htmlPayload.content} />;
  }

  // 4. Fallback: Direct media or text format from raspi-client structure
  const raspiObj = signPayload as RaspiSignPayload;
  const signObj = raspiObj.sign || raspiObj;
  const body = signObj.body || signObj.text || '';
  const isUrl = /^https?:\/\//i.test(body);
  const isMedia = /\.(mp4|webm|jpg|jpeg|png|gif)$/i.test(body);

  if (isUrl && !isMedia) {
    return <IframeSign url={body} />;
  }

  if (body) {
    return <TextSign text={body} />;
  }

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.fallbackText}>Waiting for sign content...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
