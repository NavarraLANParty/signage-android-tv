import React from 'react';
import {Text, View} from 'react-native';
import {components} from '../styles/components';

import {BaseTemplate} from "./BaseTemplate";

export interface OfflineBadgeProps {
    serverHost: string;
}

export function Offline({serverHost}: OfflineBadgeProps) {
    return (
        <BaseTemplate>
            <View>
                <Text style={components.title}>Dispositivo desconectado</Text>
                <Text style={components.text}>El dispositivo no puede conectar con el servidor. La pantalla continuará
                    intentando reconectarse.</Text>
            </View>
        </BaseTemplate>
    );
}