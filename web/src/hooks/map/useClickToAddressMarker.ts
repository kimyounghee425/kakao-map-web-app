import React, { useEffect } from "react";

export default function useClickToAddressMarker(
    mapRef: React.RefObject<kakao.maps.Map | null>,
    setSelectedAddress: (address: string | null) => void
) {
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(0, 0),
        });

        // 주소-좌표 변환 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 인포윈도우 생성 - 옵션 추가
        const infowindow = new window.kakao.maps.InfoWindow({
            zindex: 1,
            removable: true,
        });

        const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
            const latlng = mouseEvent.latLng;

            geocoder.coord2Address(
                latlng.getLng(),
                latlng.getLat(),
                function (result: GeocoderResult[], status: string) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        // 도로명주소
                        const roadAddress = result[0].road_address?.address_name || null;
                        // 지번주소
                        const jibunAddress = result[0].address.address_name;

                        // 도로명주소 없으면 지번주소
                        setSelectedAddress(roadAddress || jibunAddress);

                        let detailAddr = result[0].road_address
                            ? "<div>도로명 : " + result[0].road_address.address_name + "</div>"
                            : "";
                        detailAddr += "<div>지번 : " + result[0].address.address_name + "</div>";

                        const content =
                            '<div class="bAddr" style="min-width: 220px; padding:5px; font-size:12px; color: black">' +
                            '<span class="title" style="font-weight:bold; display:block;">법정동 주소정보</span>' +
                            detailAddr +
                            "</div>";
                        console.log(detailAddr);
                        // 마커를 표시
                        marker.setPosition(latlng);
                        marker.setMap(map);

                        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                }
            );
        };

        window.kakao.maps.event.addListener(map, "click", handleClick);

        // 클린업
        return () => {
            window.kakao.maps.event.removeListener(map, "click", handleClick);
        };
    }, [mapRef, setSelectedAddress]);
}
