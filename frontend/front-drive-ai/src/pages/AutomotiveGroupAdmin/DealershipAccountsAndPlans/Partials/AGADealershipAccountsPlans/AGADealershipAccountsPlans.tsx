import React, { useState, useEffect } from "react";
import { PageBackground, CardContent } from "./styles";
import { Card } from "components/Card";
import { FirstPlan } from "./FirstPlan";
import { SecondPlan } from "./SecondPlan";
import { ThirdPlan } from "./ThirdPlan";
import { FourthPlan } from "./FourthPlan";
import { useAppContext } from "store/app-context/app-context";
import { getSuscriptionByUserId, putPlanTypeByUserId, getAllComissionsInfo } from "services";

const AGADealershipAccountsPlans = () => {
  const appContext = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [hasChanged, setHasChanged] = useState(false);
  const [comissionsInfo, setComissionsInfo] = useState(0);

  const body = {
    planType: selectedPlan,
  };

  const { user } = appContext;

  const getSuscriptionByUserIdResponse = async () => {
    console.log("Getting subscription plans");
    await getSuscriptionByUserId(user?.id)
      .then((res) => {
        if (res && res.planType) {
          console.log("Suscription plans: ", res.planType);
          setSelectedPlan(res.planType);
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while getting the subscription plans:",
          error
        );
      });
  };

  useEffect(() => {
    getSuscriptionByUserIdResponse();
  }, []); // Run only once when the component mounts

  const updatePlanTypeByUserId = async () => {
    console.log("Changing plan type");
    await putPlanTypeByUserId(user?.id, body)
      .then((res) => {
        if (res && res.data) {
          console.log("Plan type changed successfully", res.data);
        }
      })
      .catch((error) => {
        console.error("An error occurred while changing the plan type:", error);
      });
  };

  useEffect(() => {
    if (hasChanged) {
      body.planType = selectedPlan;
      console.log("The plan type was changed to", body);
      updatePlanTypeByUserId();
      setHasChanged(false);
    }
  }, [hasChanged]);

  const getComissionsInfo = async () => {
    try {
      const response = await getAllComissionsInfo();
      setComissionsInfo(response);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComissionsInfo();
  }, []);

  return (
    <>
      <PageBackground>
        <Card
          borderRadius="None"
          color="#FFFFFF"
          height="484px"
          width="1184px"
          margin="2rem"
          padding="1rem"
        >
          <CardContent>
            <FirstPlan
              highlighted={selectedPlan === "Free"}
              setSelectedPlan={setSelectedPlan}
              hasChanged={setHasChanged}
            />
            <SecondPlan
              highlighted={selectedPlan === "Plus"}
              setSelectedPlan={setSelectedPlan}
              hasChanged={setHasChanged}
              price={comissionsInfo}
            />
            <ThirdPlan
              highlighted={selectedPlan === "Pro"}
              setSelectedPlan={setSelectedPlan}
              hasChanged={setHasChanged}
              price={comissionsInfo}
            />
            <FourthPlan
              highlighted={selectedPlan === "Enterprise"}
              setSelectedPlan={setSelectedPlan}
              hasChanged={setHasChanged}
              price={comissionsInfo}
            />
          </CardContent>
        </Card>
      </PageBackground>
    </>
  );
};

export default AGADealershipAccountsPlans;
