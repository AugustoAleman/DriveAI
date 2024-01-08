import React from "react";
import { LoadingTextProp } from "./types";
import { RoundedContainer } from "./styles";



const LoadingText: React.FC<LoadingTextProp> = ({
    height="5%", width="80%"
}) => {
    return(
        <RoundedContainer style={{height:`${height}`, width:`${width}`}}>

        </RoundedContainer>
    );
}
export default LoadingText;