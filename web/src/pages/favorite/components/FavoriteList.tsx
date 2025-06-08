import styled from "@emotion/styled";
import FavoriteCard from "./FavoriteCard";
import { useState, useEffect } from "react";

const FavoriteList = () => {
    const [addresses, setAddresses] = useState<string[]>([]);

    useEffect(() => {
        const favoriteAddresses = localStorage.getItem("favoriteAddresses");

        if (favoriteAddresses) {
            try {
                const parsed = JSON.parse(favoriteAddresses);
                if (Array.isArray(parsed)) {
                    setAddresses(parsed);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    const handleTrashClick = (target: string) => {
        const updated = addresses.filter((address) => address !== target);
        setAddresses(updated);
        localStorage.setItem("favoriteAddresses", JSON.stringify(updated));
    };

    return (
        <Container>
            {addresses.map((address, index) => (
                <>
                    <FavoriteCard key={address} value={address} onDelete={() => handleTrashClick(address)} />
                    {index < addresses.length - 1 && <Divider />}
                </>
            ))}
        </Container>
    );
};

export default FavoriteList;

const Container = styled.div`
    height: 100%;
    color: black;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #cdd8ff;
`;
