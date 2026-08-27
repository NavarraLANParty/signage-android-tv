import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../styles/theme';

export interface TextSignProps {
  text: string;
}

export function TextSign({ text }: TextSignProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.layout.paddingScreen,
    backgroundColor: theme.colors.bgDark,
  },
  text: {
    fontSize: theme.typography.textSignSize,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    padding: theme.layout.paddingScreen,
    fontWeight: '500',
  },
});
