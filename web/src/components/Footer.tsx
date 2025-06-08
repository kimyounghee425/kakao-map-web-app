import styled from "@emotion/styled";
import UnColoredStar from "../assets/unColoredStar.svg";
import UnColoredHome from "../assets/unColoredHome.svg";
import ColoredStar from "../assets/coloredStar.svg";
import ColoredHome from "../assets/coloredHome.svg";
import { useNavigate } from "react-router-dom";

interface MenuFooterProps {
    currentMenuIndex: number;
}

interface MenuItem {
    text: string;
    icon: string;
    iconSelected: string;
}

const Footer = ({ currentMenuIndex }: MenuFooterProps) => {
    const navigate = useNavigate();

    const menus: MenuItem[] = [
        {
            text: "홈",
            icon: UnColoredHome,
            iconSelected: ColoredHome,
        },
        {
            text: "즐겨찾기",
            icon: UnColoredStar,
            iconSelected: ColoredStar,
        },
    ];

    const handleClick = (currentIndex: number) => {
        let path = "";
        if (currentIndex === 0) {
            path = "/";
        } else if (currentIndex === 1) {
            path = "/favorites";
        }
        navigate(path);
    };

    return (
        <FooterContainer>
            {menus.map((menu, index) => {
                return (
                    <IconDivider key={index} onClick={() => handleClick(index)}>
                        <Image src={index === currentMenuIndex ? menu.iconSelected : menu.icon} />
                        <IconName>{menu.text}</IconName>
                    </IconDivider>
                );
            })}
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 6rem;
    z-index: 1;
    background-color: white;
`;

const IconDivider = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: 1.6rem;
`;

const IconName = styled.p`
    margin-top: 0.5rem;
    color: #888888;
`;
