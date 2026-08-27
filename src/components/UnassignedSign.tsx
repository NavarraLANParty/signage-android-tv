import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {components} from '../styles/components';
import {BaseTemplate} from "./BaseTemplate";

interface UnassignedSignProps {
    uuid: string;
}

export function UnassignedSign({ uuid }: UnassignedSignProps) {
    return (
        <BaseTemplate uuid={uuid}>
            <Text style={components.title}>¡Pantalla conectada!</Text>
            <Text style={[components.text, styles.subtitle]}>La pantalla se encuentra conectada y a la espera.</Text>
        </BaseTemplate>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        textAlign: 'center',
    }
});
