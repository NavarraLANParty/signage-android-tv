import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {BaseTemplate} from './BaseTemplate';
import {components} from '../styles/components';

interface ConfigurationProps {
    currentHost: string;
    handleOnSave: (newHost: string) => void;
}

export const Configuration: React.FC<ConfigurationProps> = ({currentHost, handleOnSave}) => {
    const [host, setHost] = useState<string>(currentHost);

    useEffect(() => {
        setHost(currentHost);
    }, [currentHost]);

    const onSave = () => {
        const normalizedHost = host.trim();
        handleOnSave(normalizedHost);
    };

    return (
        <BaseTemplate>
            <View style={styles.container}>
                <Text style={components.title}>Configuración</Text>
                <Text style={components.text}>Host del servidor</Text>
                <TextInput
                    style={components.input}
                    value={host}
                    onChangeText={setHost}
                    placeholder="sign.nlp.party"
                    placeholderTextColor="#777777"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    returnKeyType="send"
                    onSubmitEditing={onSave}
                />

                <TouchableOpacity style={[components.saveButton, components.button]} onPress={onSave}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
            </View>
        </BaseTemplate>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 24,
    }
});


export default Configuration