import styled from 'styled-components';
import { ColorProps } from './types';

export const Notification = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NotificationContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const NotificationIcon = styled.div<ColorProps>`
    & svg {
        font-size: 7rem;
        color: ${({ colorIcon }) => colorIcon};
        margin-top: 1.2rem;
    }
    @media (min-width: 768px) {
        & svg {
            font-size: 8rem;
        }
    }
`;

export const NotificationText = styled.div`
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
    text-align: center;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

export const NotificationTitle = styled.h1`
    font-size: 1rem;
    margin: 0;
    padding: 0;
    font-weight: 700;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

export const NotificationParagraph = styled.p`
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    font-weight: 400;
    @media (min-width: 768px) {
        font-size: 0.9rem;
    }
`;

export const NotificationButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
`;