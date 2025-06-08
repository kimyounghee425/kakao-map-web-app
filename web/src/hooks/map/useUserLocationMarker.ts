import React, { useEffect } from "react";
import MyMarker from "../../assets/myMarker.svg";

export default function useUserLocationMarker(
    mapRef: React.RefObject<kakao.maps.Map | null>,
    userLocation?: { lat: number; lng: number } | null
) {
    useEffect(() => {
        if (!userLocation || !mapRef.current) return;

        const { lat, lng } = userLocation;
        const map = mapRef.current;
        const kakaoLatLng = new window.kakao.maps.LatLng(lat, lng);

        const imageSize = new window.kakao.maps.Size(32, 32);
        const imageOption = { offset: new window.kakao.maps.Point(16, 32) }; // 중심 offset
        const markerImage = new window.kakao.maps.MarkerImage(MyMarker, imageSize, imageOption);

        const userMarker = new window.kakao.maps.Marker({
            map,
            position: kakaoLatLng,
            image: markerImage,
        });

        map.setCenter(kakaoLatLng);

        // 클린업
        return () => {
            userMarker.setMap(null);
        };
    }, [mapRef, userLocation]);
}
