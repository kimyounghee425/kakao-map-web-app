export {};

declare global {
    interface Window {
        kakao: {
            maps: typeof kakao.maps;
        };
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
    }

    namespace kakao.maps.event {
        interface MouseEvent {
            latLng: kakao.maps.LatLng;
        }

        function addListener(
            target: kakao.maps.Map | kakao.maps.Marker,
            type: string,
            handler: (mouseEvent: kakao.maps.event.MouseEvent) => void
        ): void;

        function removeListener(
            target: kakao.maps.Map | kakao.maps.Marker,
            type: string,
            handler: (event: kakao.maps.event.MouseEvent) => void
        ): void;
    }

    namespace kakao.maps {
        class Map {
            constructor(container: HTMLElement, options: KakaoMapOptions);
            setCenter(latlng: LatLng): void;
            getCenter(): LatLng;
        }

        class LatLng {
            constructor(lat: number, lng: number);
            getLat(): number;
            getLng(): number;
        }

        class Size {
            constructor(width: number, height: number);
        }

        class Point {
            constructor(x: number, y: number);
        }

        class Marker {
            constructor(options: MarkerOptions);
            setMap(map: Map | null): void;
            setPosition(position: LatLng): void;
        }

        class MarkerImage {
            constructor(src: string, size: Size, options?: MarkerImageOptions);
        }

        class InfoWindow {
            constructor(options?: { zindex?: number; removable?: boolean });
            open(map: Map, marker: Marker): void;
            setContent(content: string): void;
        }

        namespace services {
            class Geocoder {
                addressSearch(
                    query: string,
                    callback: (result: GeocoderResult[], status: string) => void
                ): void;
                coord2Address(
                    lng: number,
                    lat: number,
                    callback: (result: GeocoderResult[], status: string) => void
                ): void;
                coord2RegionCode(
                    lng: number,
                    lat: number,
                    callback: (result: RegionCodeResult[], status: string) => void
                ): void;
            }

            const Status: {
                OK: string;
            };
        }
    }

    interface KakaoMapOptions {
        center: kakao.maps.LatLng;
        level?: number;
        mapTypeId?: string;
        draggable?: boolean;
        scrollwheel?: boolean;
        disableDoubleClick?: boolean;
        disableDoubleClickZoom?: boolean;
        projectionId?: string;
        tileAnimation?: boolean;
        keyboardShortcuts?: boolean | object;
        speed?: number;
    }

    interface MarkerOptions {
        map?: kakao.maps.Map;
        position: kakao.maps.LatLng;
        image?: kakao.maps.MarkerImage;
        title?: string;
        draggable?: boolean;
        clickable?: boolean;
        zIndex?: number;
        opacity?: number;
        altitude?: number;
        range?: number;
    }

    interface MarkerImageOptions {
        alt?: string;
        coords?: string;
        offset?: kakao.maps.Point;
        shape?: string;
        spriteOrigin?: kakao.maps.Point;
        spriteSize?: kakao.maps.Size;
    }

    interface RegionCodeResult {
        address_name: string;
        region_type: string;
    }

    interface GeocoderResult {
        x: string; // longitude
        y: string; // latitude
        address: {
            address_name: string;
            region_1depth_name: string;
            region_2depth_name: string;
            region_3depth_name: string;
        };
        road_address?: {
            address_name: string;
            building_name: string;
            zone_no: string;
        };
    }
}
