import styled from "@emotion/styled";
import { useRef } from "react";
import { isInsideWebView } from "../../../utils/utils";
import useUserLocationMarker from "../../../hooks/map/useUserLocationMarker";
import useInitializeMap from "../../../hooks/map/useInitializeMap";
import useDisplayFavoriteMarkers from "../../../hooks/map/useDisplayFavoriteMarkers";
import useClickToAddressMarker from "../../../hooks/map/useClickToAddressMarker";
import useDisplayCenterAddress from "../../../hooks/map/useDisplayCenterAddress";

interface KakaoMapProps {
    setSelectedAddress: (address: string | null) => void;
    favoriteUpdateTrigger: number;
    showFavorites: boolean;
    userLocation?: { lat: number; lng: number } | null;
}

function KakaoMap({
    setSelectedAddress,
    favoriteUpdateTrigger,
    showFavorites,
    userLocation,
}: KakaoMapProps) {
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const markersRef = useRef<kakao.maps.Marker[]>([]);

    useUserLocationMarker(mapRef, userLocation);
    useInitializeMap(mapRef);
    useDisplayFavoriteMarkers(mapRef, markersRef, showFavorites, favoriteUpdateTrigger);
    useClickToAddressMarker(mapRef, setSelectedAddress);
    useDisplayCenterAddress(mapRef);

    return (
        <Container>
            <AddressInfo id="centerAddr">지도를 이동시켜주세요</AddressInfo>
            <MapContainer id="map" />
        </Container>
    );
}

export default KakaoMap;

const isWebView = isInsideWebView();

const Container = styled.div`
    flex: 1 1 auto;
    position: relative;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const AddressInfo = styled.div`
    position: fixed;
    left: 2rem;
    top: ${isWebView ? "9.7rem" : "4.7rem"};
    border-radius: 4px;
    background: #fff;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1000;
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    color: #333;
    min-width: 18rem;
`;
