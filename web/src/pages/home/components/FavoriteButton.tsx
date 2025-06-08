import styled from "@emotion/styled";
import ColoredFavorite from "../../../assets/coloredFavorite.svg";
import UnColoredFavorite from "../../../assets/unColoredFavorite.svg";
import { useState, useEffect } from "react";
import { isInsideWebView } from "../../../utils/utils";

interface FavoriteButtonProps {
    selectedAddress: string | null;
    onFavoriteUpdate: () => void;
}

const FavoriteButton = ({ selectedAddress, onFavoriteUpdate }: FavoriteButtonProps) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [savedAddresses, setSavedAddresses] = useState<string[]>([]);

    // 컴포넌트 마운트 시 로컬스토리지에서 저장된 주소 목록 가져오기
    useEffect(() => {
        const stored = localStorage.getItem("favoriteAddresses");
        if (stored) {
            setSavedAddresses(JSON.parse(stored));
        }
    }, []);

    // 현재 선택된 주소가 이미 저장되어 있는지 확인
    useEffect(() => {
        if (selectedAddress) {
            setIsSelected(savedAddresses.includes(selectedAddress));
        }
    }, [selectedAddress, savedAddresses]);

    const handleClickStar = () => {
        if (!selectedAddress) {
            alert("먼저 지도에서 위치를 선택해주세요.");
            return;
        }

        let updatedAddresses: string[];

        if (isSelected) {
            // 이미 저장된 경우 제거
            updatedAddresses = savedAddresses.filter((addr) => addr !== selectedAddress);
            alert(`"${selectedAddress}"가 즐겨찾기에서 제거되었습니다.`);
        } else {
            // 저장되지 않은 경우 추가
            updatedAddresses = [...savedAddresses, selectedAddress];
            alert(`"${selectedAddress}"가 즐겨찾기에 추가되었습니다.`);
        }

        // 로컬스토리지 업데이트
        localStorage.setItem("favoriteAddresses", JSON.stringify(updatedAddresses));
        setSavedAddresses(updatedAddresses);
        setIsSelected(!isSelected);

        // 업데이트 알림
        onFavoriteUpdate();
    };

    return (
        <ButtonContainer onClick={handleClickStar}>
            <img src={isSelected ? ColoredFavorite : UnColoredFavorite} />
        </ButtonContainer>
    );
};

export default FavoriteButton;

const isWebView = isInsideWebView();

const ButtonContainer = styled.div`
    position: fixed;
    top: ${isWebView ? "6.7rem" : "1.7rem"};
    right: 1.3rem;
    z-index: 1000;
`;
