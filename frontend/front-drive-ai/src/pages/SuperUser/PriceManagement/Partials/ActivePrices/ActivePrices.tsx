import React, { useState, useEffect } from "react";
import { PageBody } from "./styles";
import { LeftCards } from "./LeftCards";
import { RightCard } from "./RightCard";
import { getAllComissionsInfo } from "services";

const ActivePrices = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [change, setChange] = useState<boolean>(true);

  const handleButtonClick = (index: number) => {
    setActiveCardIndex(index);
  };

  const [loading, setLoading] = useState(true);

  const [comissionsInfo, setComissionsInfo] = useState(0);

  const getComissionsInfo = async () => {
    try {
      const response = await getAllComissionsInfo();
      setComissionsInfo(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComissionsInfo();
  }, [change]);

  console.log("Comissions and suscriptions info: ", comissionsInfo);

  return (
    <PageBody>
      <LeftCards onButtonClick={handleButtonClick} prices={comissionsInfo} />
      <RightCard activeCardIndex={activeCardIndex} change={setChange} />
    </PageBody>
  );
};

export default ActivePrices;
