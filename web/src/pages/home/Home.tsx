import styled from "@emotion/styled";
import KakaoMap from "./components/KakaoMap";
import Footer from "../../components/Footer";
import FavoriteLabel from "./components/FavoriteLabel";
import FavoriteButton from "./components/FavoriteButton";
import { useState } from "react";
import Location from "../../assets/location.svg";
import useWebViewMessage from "../../hooks/useWebViewMessage";

const Home = () => {
    const currentMenuIndex = 0;
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [favoriteUpdateTrigger, setFavoriteUpdateTrigger] = useState<number>(0);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const location = useWebViewMessage();

    const handleFavoriteUpdate = () => {
        setFavoriteUpdateTrigger((prev) => prev + 1);
    };

    const handleRequestLocation = () => {
        window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "getLocation" }));
    };

    return (
        <Page>
            <FavoriteLabel
                showFavorites={showFavorites}
                toggleShowFavorites={() => setShowFavorites((prev) => !prev)}
            />
            <FavoriteButton
                selectedAddress={selectedAddress}
                onFavoriteUpdate={handleFavoriteUpdate}
            />
            <KakaoMap
                setSelectedAddress={setSelectedAddress}
                favoriteUpdateTrigger={favoriteUpdateTrigger}
                showFavorites={showFavorites}
                userLocation={location}
            />
            <LocationIcon src={Location} onClick={handleRequestLocation} />
            <Footer currentMenuIndex={currentMenuIndex} />
        </Page>
    );
};

export default Home;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 6rem;
`;

const LocationIcon = styled.img`
    position: fixed;
    z-index: 1000;
    bottom: 7rem;
    left: 1rem;
`;
