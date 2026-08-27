import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {BaseTemplate} from './BaseTemplate';
import {components} from "../styles/components";

export interface IframeSignProps {
    url: string;
}

export function IframeSign({url}: IframeSignProps) {
    const [errorCode, setErrorCode] = useState<string | number | null>(null);

    useEffect(() => {
        setErrorCode(null);
    }, [url]);

    if (errorCode !== null) {
        return (
            <BaseTemplate>
                <Text style={components.title}>Se ha producido un error</Text>
                <Text style={components.text}>Se ha producido un error renderizando el contenido web.
                    El código de error corresponde con {errorCode}</Text>
            </BaseTemplate>
        );
    }

    return (
        <WebView
            source={{uri: url}}
            style={styles.webView}
            allowsInlineMediaPlayback
            javaScriptEnabled
            domStorageEnabled
            onHttpError={(syntheticEvent) => {
                const {nativeEvent} = syntheticEvent;
                setErrorCode(nativeEvent.description);
            }}
            onError={(syntheticEvent) => {
                const {nativeEvent} = syntheticEvent;
                setErrorCode(nativeEvent.description || 'ERROR');
            }}
        />
    );
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: '#000000',
    },
});
