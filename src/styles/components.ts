import {theme} from "./theme";

export const components = {
    title: {
        fontSize: theme.typography.titleSize,
        fontWeight: '700',
        textAlign: 'center',
        color: theme.colors.primaryColor,
        marginVertical: 4,
    },
    text: {
        fontSize: theme.typography.bodySize,
        color: theme.colors.textPrimary,
        marginBottom: 4,
    },
    button: {
        backgroundColor: theme.colors.primaryColor,
    },
    input: {
        backgroundColor: theme.colors.bgInput,
        color: theme.colors.textPrimary,
        borderRadius: theme.layout.borderRadius,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: theme.typography.bodySize,
        borderWidth: 1,
        borderColor: theme.colors.borderInput,
        marginBottom: 20,
    },
    saveButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: theme.layout.borderRadius,
        alignItems: 'center',
    },
} as const;