import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {BaseTemplate} from './BaseTemplate';
import {components} from "../styles/components";

export interface IframeSignProps {
    url: string;
}

const DESKTOP_USER_AGENT =
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const INJECTED_SIGNAGE_SCRIPT = `
(function() {
    function applySignageFixes() {
        // 1. Force 1080p desktop viewport width
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'viewport');
            if (document.head) {
                document.head.appendChild(meta);
            } else if (document.documentElement) {
                document.documentElement.appendChild(meta);
            }
        }
        if (meta && meta.getAttribute('content') !== 'width=1920') {
            meta.setAttribute('content', 'width=1920');
            window.dispatchEvent(new Event('resize'));
        }

        // 2. Fix missing glyphs on Android TV (e.g. U+1F5A7)
        if (document.body) {
            var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue && node.nodeValue.includes('🖧')) {
                    node.nodeValue = node.nodeValue.replace(/🖧/g, '🌐');
                }
            }
        }

        // 3. Hide scrollbars
        if (document.head && !document.getElementById('nlp-signage-styles')) {
            var style = document.createElement('style');
            style.id = 'nlp-signage-styles';
            style.textContent = '::-webkit-scrollbar { display: none !important; } html, body { scrollbar-width: none !important; -ms-overflow-style: none !important; }';
            document.head.appendChild(style);
        }
    }

    applySignageFixes();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySignageFixes);
    }

    // Observers for dynamic single-page applications (Next.js, Grafana)
    try {
        var headObserver = new MutationObserver(function() {
            applySignageFixes();
        });
        if (document.head) {
            headObserver.observe(document.head, { childList: true, subtree: true, attributes: true, attributeFilter: ['content'] });
        }

        var bodyObserver = new MutationObserver(function() {
            applySignageFixes();
        });
        if (document.body) {
            bodyObserver.observe(document.body, { childList: true, subtree: true });
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                if (document.body) {
                    bodyObserver.observe(document.body, { childList: true, subtree: true });
                }
            });
        }
    } catch (e) {}

    // Periodic resize notifications to trigger re-layouts in responsive frameworks
    [200, 500, 1000, 2000, 3500].forEach(function(delay) {
        setTimeout(function() {
            applySignageFixes();
            window.dispatchEvent(new Event('resize'));
        }, delay);
    });
})();
true;
`;

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
            mediaPlaybackRequiresUserAction={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            mixedContentMode="always"
            javaScriptEnabled
            domStorageEnabled
            textZoom={100}
            userAgent={DESKTOP_USER_AGENT}
            injectedJavaScript={INJECTED_SIGNAGE_SCRIPT}
            injectedJavaScriptBeforeContentLoaded={INJECTED_SIGNAGE_SCRIPT}
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
