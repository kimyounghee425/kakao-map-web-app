import styled from "@emotion/styled";
import Footer from "../../components/Footer";
import FavoritesHeader from "./components/FavoritesHeader";
import FavoriteList from "./components/FavoriteList";

const Favorites = () => {
    const currentMenuIndex = 1;
    return (
        <Page>
            <FavoritesHeader />
            <ListWrapper>
                <FavoriteList />
            </ListWrapper>
            <Footer currentMenuIndex={currentMenuIndex} />
        </Page>
    );
};

export default Favorites;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #bfc9ff;
    box-sizing: border-box;
    padding-bottom: 6rem;
`;

const ListWrapper = styled.div`
    padding: 3.6rem 2.4rem 0 2.4rem;
    background-color: white;
    border-radius: 2rem 2rem 0 0;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 6rem;
`;
