import { useEffect, useState } from "react";

export default function useWebViewMessage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const handler = (event: Event) => {
            const message = event as MessageEvent<string>;
            if (typeof message.data !== "string") return;

            try {
                const data = JSON.parse(message.data);
                if (data.type === "location") {
                    const { latitude, longitude } = data.payload;
                    console.log("수신된 위치:", latitude, longitude);

                    // 마커 찍기 로직 호출
                    setLocation({ lat: latitude, lng: longitude });
                }
            } catch (e) {
                console.warn("WebView 메시지 파싱 실패", e);
            }
        };

        document.addEventListener("message", handler); // Android
        window.addEventListener("message", handler); // iOS

        return () => {
            document.removeEventListener("message", handler);
            window.removeEventListener("message", handler);
        };
    }, []);

    return location;
}
