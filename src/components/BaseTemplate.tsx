import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import logo from '../../assets/nlp-logos/nlp-logo-white.webp';

interface BaseTemplateProps {
    uuid?: string;
    children?: React.ReactNode;
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({uuid, children}) => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain" accessibilityLabel="Navarra LAN Party"/>
            <View style={styles.containerInner}>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
            <Text style={styles.footer}>
                &copy; 2018-2026 Navarra LAN Party · Todos los derechos reservados · {uuid}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flex: 1,
        width: "100%",
    },

    containerInner: {
        flex: 1,
        paddingVertical: 10,
    },

    logo: {
        width: 200,
        height: 76,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 16,
    },

    content: {
        width: '100%',

    },
    footer: {
        textAlign: 'center',
        marginTop: 24,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        padding: 16,
        width: '100%',
        fontSize: 12,
    },
});
