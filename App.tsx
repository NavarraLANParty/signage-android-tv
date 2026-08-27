import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useKeepAwake} from 'expo-keep-awake';

import {getOrGenerateUuid, loadServerHost, saveServerHost} from './src/services/storage';
import {useSignageSocket} from './src/hooks/useSignageSocket';
import Configuration from './src/components/Configuration';
import {SignRenderer} from './src/components/SignRenderer';
import {Offline} from './src/components/Offline';
import {theme} from "./src/styles/theme";


export default function App() {
    // Keep the TV screen awake continuously for digital signage playback
    useKeepAwake();

    const [serverHost, setServerHost] = useState<string>('');
    const [uuid, setUuid] = useState<string>('');
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const {connected, signPayload} = useSignageSocket(serverHost, uuid);
    const clicks = useRef<number[]>([]);


    // Initialize storage config
    useEffect(() => {
        async function init() {
            const host = await loadServerHost();
            const uuid = await getOrGenerateUuid();

            setServerHost(host ?? '');
            setUuid(uuid);
        }

        init()
            .then(() => console.log('Storage config initialized'))
            .catch(err => console.error('Error initializing storage config:', err));
    }, []);


    // Save new host from settings modal
    const handleSaveSettings = async (newHost: string) => {
        if (newHost && newHost.trim()) {
            const trimmedHost = newHost.trim();
            await saveServerHost(trimmedHost);
            setServerHost(trimmedHost);
            setShowSettings(false);
        }
    };

    const handlePress = () => {
        const now = Date.now();

        clicks.current = clicks.current.filter(
            timestamp => now - timestamp <= 1000
        );

        clicks.current.push(now);

        if (clicks.current.length >= 3) {
            setShowSettings(true);
            clicks.current = [];
            return;
        }

        console.log("PRESS");
    };

    return (
        <View style={styles.container}>
            {(!serverHost || showSettings) ? (
                <Configuration
                    key={serverHost || 'configuration'}
                    currentHost={serverHost}
                    handleOnSave={handleSaveSettings}
                />
            ) : (
                <Pressable
                    style={{flex: 1}}
                    onPress={handlePress}
                >
                    {!connected ? (
                        <Offline serverHost={serverHost}/>
                    ) : (
                        <SignRenderer
                            signPayload={signPayload}
                            uuid={uuid}
                        />
                    )}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        backgroundColor: theme.colors.bgDark,
    },
});
