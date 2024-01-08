import styled from "styled-components";
import { ColorsProps } from "./types";

export const FooterBase = styled.footer<ColorsProps>`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
    background-color: ${({ colorBackground }) => colorBackground};
    color: ${({ colorText }) => colorText};
    font-family: 'Roboto', sans-serif;
    padding: 3rem;
    height: 68rem;
    margin: 1rem 0 0 0; /* top right bottom left */
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-gap: 0.8rem;
    grid-template-areas: 
    "column1" 
    "column1"
    "column2"
    "column2"
    "column3"
    "column4"
    "column5";
    @media (min-width: 740px) {
        padding: 5rem 9rem;
        height: 55rem;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 0.85rem;
        grid-template-areas: 
        "column1 column1"
        "column2 column3"
        "column2 column3"
        "column4 column5";
    }
    @media (min-width: 992px) {
        padding: 5rem;
        height: 34.18rem;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 1rem;
        grid-template-areas: 
        "column1 column2 column3 column5"
        "column1 column2 column4 column5";
    }
`;

export const FooterLogo = styled.div`
    height: 35%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    @media (min-width: 992px) {
        justify-content: start;  
    }
`;

export const Logo = styled.img`
    width: 5.5rem;
`;

export const TitleLogo = styled.h1<ColorsProps>`
    color: ${({ colorText }) => colorText};
    display: inline-block;
    font-size: 2.2rem;
    align-items: center;
    margin: 0 1rem;
`;

export const FooterSocialMedia = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    height: 10rem;
    width: 70%; 
    margin: 0 auto;
    & img {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 0.5rem;
    }
    @media (min-width: 992px) {
        justify-content: end;
        margin: 0 0 0 4rem;
    }
`;

export const SocialMediaCard = styled.div<ColorsProps>`
    height:3.4rem;
    width: 3.4rem;
    background-color: ${({ colorText }) => colorText};
    border-radius: 0.4rem;
    margin: 1rem;
    & a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    & svg {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        margin: 0;
        width: 2.4rem;
        height: 2.4rem;
        color: ${({ colorLineAndSocialMedia }) => colorLineAndSocialMedia};
    }

`;
export const FooterColumnContent1 = styled.div`
    grid-area: column1;
    @media (min-width: 740px) {
        grid-area: column1;
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
    @media (min-width: 992px) {
        margin-right: 4.5rem;
        grid-area: column1;
    }
`;

export const FooterColumnContent2 = styled.div`
    grid-area: column2;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    @media (min-width: 740px) {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
`;
export const FooterColumnContent3 = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    grid-area: column3;
    @media (min-width: 740px) {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
`;
export const FooterColumnContent4 = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    grid-area: column4;
    @media (min-width: 740px) {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
`;
export const FooterColumnContent5 = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    grid-area: column5;
    @media (min-width: 740px) {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
    }
`;
export const LinkLogo = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;
export const Line = styled.hr<ColorsProps>`
    border: 0.18rem solid ${({ colorLineAndSocialMedia }) => colorLineAndSocialMedia};
    border-radius: 0.125rem;
    text-align: right;
    width: 2.8rem; 
    margin: 0.4rem 0;
    @media (min-width: 740px) {
        width: 3rem; 
        margin: 1rem 0;
    } 
    @media (min-width: 992px) {
        width: 3.5rem; 
        margin: 1.5rem 0;
    }
`;
export const Title = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    @media (min-width: 740px) {
        font-size: 1.4rem;
    }
    @media (min-width: 992px) {
        font-size: 1.4rem;
    }
`;
export const Text = styled.p`
    padding: 0;
    margin: 0.1rem 0;
    @media (min-width: 740px) {
        margin: 0.8rem 0;
    }
    @media (min-width: 992px) {
        margin: 1.5rem 0;
    }
`;
export const Link = styled.a<ColorsProps>`
    color: ${({ colorText }) => colorText};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    @media (min-width: 740px) {
        font-size: 1.2rem;
    }
    @media (min-width: 992px) {
        font-size: 1.25rem;
    }
`;
