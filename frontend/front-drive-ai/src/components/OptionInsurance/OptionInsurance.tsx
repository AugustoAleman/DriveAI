import React, {useState} from "react";
import { OptionInsuranceProp } from "./types";
import { Button, Image, Text } from "./styles";

/**
 * This component allows you to choose an insurance option, and upon selection, 
 * the border color will change to purple while the background remains transparent. 
 */
const OptionInsurance: React.FC<OptionInsuranceProp> = ({
  index = -1,
  text = "Name",
  imageUrl = "https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png",
  width = 5,
  active,
  onClick,
}) => {

  // This is the useState that holds the logic if the component is active or not
  const [isSelected, setIsSelected] = useState(active);

  // This is the default onCLick function, that is overrided depending in the index prop
  const handleOnClick = () => {
    setIsSelected(!isSelected);
  };

  // Here its defined the button with the image and text that was defined
  return (
    <Button
      isSelected={active ? active : isSelected}

      // Here is where the onClick function its overrided or used the defulta one
      onClick={() => {
        if (index == -1) {
          handleOnClick();
        } else {
          onClick();
        }
      }}
      width={width}
    >
      <Image src={imageUrl} alt={text} width={width} />
      <Text width={width}>{text}</Text>
    </Button>
  );
};
export default OptionInsurance;
