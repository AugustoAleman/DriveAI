import styled from "styled-components";

export const Carousel = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

export const StyledImage = styled.img`
    flex: 0 1 20%;
    height: 50px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

export const ImageWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
  scroll-snap-align: start;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  padding: 5px;
  font-size: 20px;
  cursor: pointer;
`;