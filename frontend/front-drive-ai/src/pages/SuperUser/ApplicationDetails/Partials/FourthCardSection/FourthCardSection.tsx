import React from "react";
import { Card } from "components/Card";
import { ContentCardContainer4, ContentCardTitle4, LabelNotes } from "./styles";

const FourthCardSection = ({ request, setRequest }: any) => {
  
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setRequest((prevRequest: any) => ({
      ...prevRequest,
      description: value,
    }));
  };

  return (
    <>
      <Card
        border="none"
        borderRadius="Medium"
        color="#FFFFFF"
        cursor="default"
        height="78%"
        hoverColor="#CBD0D0"
        hasHoverColor={false}
        margin="2rem 0"
        padding="0px"
        shadow=" 20px 20px 7px rgba(0, 0, 0, 0.3)"
        width="90%"
        children={
          <ContentCardContainer4>
            <ContentCardTitle4>
              <h3>Notas</h3>
            </ContentCardTitle4>
            <LabelNotes
              placeholder="Aqui añande tus notas"
              onChange={handleInputChange}
            />
          </ContentCardContainer4>
        }
      />
    </>
  );
};

export default FourthCardSection;
