import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Compositor = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	margin-top: 12rem;
	background-color: #ffffff;
`;

export const Client = styled.div`
	font-family: 'Roboto', sans-serif;
	width: 100%;
	height: 100%;
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
  