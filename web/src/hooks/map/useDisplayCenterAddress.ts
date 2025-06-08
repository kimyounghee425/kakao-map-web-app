import React, { useEffect } from "react";

export default function useDisplayCenterAddress(mapRef: React.RefObject<kakao.maps.Map | null>) {
    useEffect(() => {
        const map = mapRef.current;

        // 주소-좌표 변환 객체 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시
        const handleIdle = () => {
            if (map === null) return;
            geocoder.coord2RegionCode(
                map.getCenter().getLng(),
                map.getCenter().getLat(),
                function (result: RegionCodeResult[], status: string) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const infoDiv = document.getElementById("centerAddr");
                        if (infoDiv) {
                            for (let i = 0; i < result.length; i++) {
                                // 행정동의 region_type 값은 "H"
                                if (result[i].region_type === "H") {
                                    infoDiv.innerHTML = result[i].address_name;
                                    break;
                                }
                            }
                        }
                    }
                }
            );
        };

        if (!map) return;
        window.kakao.maps.event.addListener(map, "idle", handleIdle);

        // 클린업
        return () => {
            window.kakao.maps.event.removeListener(map, "idle", handleIdle);
        };
    }, [mapRef]);
}
