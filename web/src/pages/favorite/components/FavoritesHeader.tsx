import styled from "@emotion/styled";
import ColoredFavorite from "../../../assets/coloredFavorite.svg";

const FavoritesHeader = () => {
    return (
        <HeaderContainer>
            <Icon src={ColoredFavorite} />
            <ButtonContainer>
                <Label>즐겨찾기</Label>
            </ButtonContainer>
        </HeaderContainer>
    );
};

export default FavoritesHeader;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6rem 0;
`;

const Icon = styled.img`
    width: 3rem;
    height: 3rem;
`;

const ButtonContainer = styled.div`
    width: 6.5rem;
    height: 2.4rem;
    margin-top: 1.5rem;
    background-color: white;
    border-radius: 1.2rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    z-index: 1000;
`;

const Label = styled.span`
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
    user-select: none;
`;
