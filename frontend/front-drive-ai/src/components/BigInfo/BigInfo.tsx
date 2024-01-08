import React from "react";
import { BigInfoProp } from "./types";
import { BigInfoContainer } from "./styles";

/**
 * BigInfo component used to show text or react components with background in different sizes and colors
 */

const BigInfo: React.FC<BigInfoProp> = ({
  children,
  image = "https://placekitten.com/g/200/300",
  imagePosition = "right",
  height = "500px",
  padding = "0px",
  backgroundColor = "white",
  imageWidth = "100%",
  imageHeight = "100%",
  imageAlign = "center",
}) => {
  return (
    // BigInfoContainer is a styled component that modifies the container based on the props given: height, padding, imagePosition and image
    <BigInfoContainer
      image={image}
      imagePosition={imagePosition}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      imageAlign={imageAlign}
      
    >
      <div className="big-info">
        <div className="big-info-left" style={{ flex: 1 }}>
          {imagePosition === "left" ? (
            <img className="big-info-img" src={image} alt="big-info-img" />
          ) : (
            children
          )}
        </div>
        <div className="big-info-right" style={{ flex: 1 }}>
          {imagePosition === "left" ? (
            children
          ) : (
            <img className="big-info-img" src={image} alt="big-info-img" />
          )}
        </div>
      </div>
    </BigInfoContainer>
  );
};

// Export the BigInfo component
export default BigInfo;