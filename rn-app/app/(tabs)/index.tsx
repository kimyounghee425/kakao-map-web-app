import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function App() {
    const webviewRef = useRef<WebView>(null);
    const [webViewReady, setWebViewReady] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("위치 권한 거부됨");
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            };

            const message = JSON.stringify({
                type: "location",
                payload: coords,
            });

            webviewRef.current?.postMessage(message);
        })();
    }, []);

    const handleMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === "getLocation") {
                console.log("요청수신");  
                // 위치 요청 받음 -> 위치 측정 -> 다시 웹으로 전달
                (async () => {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== "granted") {
                        console.log("위치 권한 거부됨");
                        return;
                    }

                    const loc = await Location.getCurrentPositionAsync({});
                    const coords = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                    };
                    // console.log(coords);
                    const message = JSON.stringify({
                        type: "location",
                        payload: coords,
                    });
                    console.log("직전임", message);
                    if (webViewReady && webviewRef.current) {
                        webviewRef.current.postMessage(message);
                    } else {
                        console.log("WebView가 아직 준비되지 않음");
                    }
                })();
            }
        } catch (e) {
            console.log("RN 메시지 파싱 실패:", e);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webviewRef}
                source={{ uri: "https://react-native-study-seven.vercel.app/?from=app" }}
                // source={{ uri: "http://localhost:5173/?from=app" }}
                // source={{ uri: "http://192.168.0.9:5173/?from=app" }}
                style={StyleSheet.absoluteFill}
                javaScriptEnabled={true}
                geolocationEnabled={true}
                onMessage={handleMessage}
                onLoadEnd={() => setWebViewReady(true)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0, // 상태바 높이 무시
    },
});
