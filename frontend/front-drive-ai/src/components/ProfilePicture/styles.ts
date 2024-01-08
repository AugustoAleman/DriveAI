import styled from "styled-components";
import { ImageContainerProps } from "./types";

export const ImageBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	align-self: center;

	height: 35rem;
	width: 20rem;

	background-color: #ffffff;
	border-radius: 10px;

	margin: 0 auto;
`;

export const Titulo = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	margin-bottom: 0.5rem;
	margin-top: 0.5rem;
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  display: grid;
  width: 90%;
  height: auto;
  object-fit: fill;
  border-radius: 50%;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 16px;
  max-width: 300px;
  aspect-ratio: 1/1;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  transform: scaleX(-1);
`;
