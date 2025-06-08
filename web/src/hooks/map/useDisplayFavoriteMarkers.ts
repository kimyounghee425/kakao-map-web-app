import React, { useEffect } from "react";
import ColoredFavorite from "../../assets/coloredFavorite.svg";

const createFavoriteMarker = (
    map: kakao.maps.Map,
    address: string,
    geocoder: kakao.maps.services.Geocoder,
    markerImage: kakao.maps.MarkerImage,
    infowindow: kakao.maps.InfoWindow,
    markersRef: React.RefObject<kakao.maps.Marker[]>
) => {
    geocoder.addressSearch(address, (result: GeocoderResult[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

            const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
                image: markerImage,
                title: address,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
                const content = `
          <div style="padding:10px; min-width:200px;">
              <div style="font-weight:bold; margin-bottom:5px; color:#333;">즐겨찾기 주소</div>
              <div style="font-size:12px; color:#666;">${address}</div>
          </div>`;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });

            markersRef.current.push(marker);
        }
    });
};

export default function useDisplayFavoriteMarkers(
    mapRef: React.RefObject<kakao.maps.Map | null>,
    markersRef: React.RefObject<kakao.maps.Marker[]>,
    showFavorites: boolean,
    favoriteUpdateTrigger: number
) {
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // 주소-좌표 변환 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 인포윈도우 생성 - 옵션 추가
        const infowindow = new window.kakao.maps.InfoWindow({
            zindex: 1,
            removable: true,
        });

        // 즐겨찾기 마커 이미지 설정
        const imageSize = new window.kakao.maps.Size(24, 35);
        const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
        const markerImage = new window.kakao.maps.MarkerImage(
            ColoredFavorite,
            imageSize,
            imageOption
        );

        // 로컬스토리지에서 저장된 주소들을 가져와서 마커 표시
        const displayFavoriteMarkers = () => {
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];

            const stored = localStorage.getItem("favoriteAddresses");
            if (!stored || !showFavorites) return;

            const addresses: string[] = JSON.parse(stored);
            addresses.forEach((address) => {
                createFavoriteMarker(map, address, geocoder, markerImage, infowindow, markersRef);
            });
        };
        displayFavoriteMarkers();

        // storage 이벤트 리스너 추가
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "favoriteAddresses") {
                displayFavoriteMarkers();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        // 즐찾 추가될 때마다 마커 업데이트
        if (favoriteUpdateTrigger > 0) {
            displayFavoriteMarkers();
        }

        // 클린업
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            if (!favoriteUpdateTrigger) markersRef.current.forEach((marker) => marker.setMap(null));
        };
    }, [mapRef, markersRef, showFavorites, favoriteUpdateTrigger]);
}
