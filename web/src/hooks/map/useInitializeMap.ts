import React, { useEffect } from "react";

export default function useInitializeMap(mapRef: React.RefObject<kakao.maps.Map | null>) {
    useEffect(() => {
        const container = document.getElementById("map");
        if (!container || mapRef.current) return;

            const options = {
                center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                level: 3,
            };


            mapRef.current = new window.kakao.maps.Map(container, options);
        
    }, []);
}
