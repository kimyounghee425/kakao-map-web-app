import styled from "@emotion/styled";
import coloredFavorite from "../../../assets/coloredFavorite.svg";
import ReversedColoredFavorite from "../../../assets/reversedColoredFavorite.svg";
import { isInsideWebView } from "../../../utils/utils";

interface FavoriteLabelProps {
    showFavorites: boolean;
    toggleShowFavorites: () => void;
}

const FavoriteLabel = ({ showFavorites, toggleShowFavorites }: FavoriteLabelProps) => {
    return (
        <ButtonContainer showFavorites={showFavorites} onClick={toggleShowFavorites}>
            <Icon src={showFavorites ? ReversedColoredFavorite : coloredFavorite} alt="star" />
            <Label showFavorites={showFavorites}>즐겨찾기</Label>
        </ButtonContainer>
    );
};

export default FavoriteLabel;

const isWebView = isInsideWebView();

const ButtonContainer = styled.div<{ showFavorites: boolean }>`
    position: fixed;
    top: ${isWebView ? "6.7rem" : "1.7rem"};
    left: 2rem;
    width: 8.6rem;
    height: 2.4rem;
    background-color: ${({ showFavorites }) => (showFavorites ? "#5061FF" : "white")};
    border-radius: 1.2rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    padding-left: 0.8rem;
    box-sizing: border-box;
    cursor: pointer;
    z-index: 1000;
`;

const Icon = styled.img`
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
`;

const Label = styled.span<{ showFavorites: boolean }>`
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ showFavorites }) => (showFavorites ? "white" : "black")};
    user-select: none;
`;
