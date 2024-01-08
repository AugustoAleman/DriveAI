import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	background: linear-gradient(to bottom, #bcbcbc, white);
	//min-height: 100vh; // Change this line to ensure the container has full height
	height: 100%;
`;

export const FixedNavbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10; // A higher value will ensure the navbar stays above other elements
`;

export const PageContent = styled.div`
	margin-left: 70px; // Match this value with the width of the navbar
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, #BCBCBC, white);
`;

export const useStyles = makeStyles((theme) => ({
	StaticHeader: {
		position: "fixed",
		top: 0,
		left: 70,
		right: 0,
		zIndex: 20, // To make sure it stays on top of other elements
		background: "white",
	},
}));
