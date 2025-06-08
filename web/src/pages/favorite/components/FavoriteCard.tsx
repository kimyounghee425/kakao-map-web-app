import styled from "@emotion/styled";
import Trash from "../../../assets/trash.svg";

interface FavoriteCardProps {
    value: string;
    onDelete: () => void;
}

const FavoriteCard = ({ value, onDelete }: FavoriteCardProps) => {
    return (
        <Container>
            {value} <Icon src={Trash} onClick={onDelete} />
        </Container>
    );
};

export default FavoriteCard;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    font-size: 1.4rem;
    overflow-y: auto;
`;

const Icon = styled.img`
    width: 2.2rem;
`;
