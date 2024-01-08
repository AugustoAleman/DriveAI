import { BigInfo } from "components/BigInfo";
import theme from "theme/theme";
import picture1  from "pages/AboutUs/partials/picture1.png";
import picture2  from "pages/AboutUs/partials/picture2.png";
import picture3  from "pages/AboutUs/partials/picture3.png";
import picture4  from "pages/AboutUs/partials/picture4.png";
import { Button } from "components/Button";
import { CustomHeaders, DivColumn, GeneralDiv, Texto, Div1,Div2, Text1,Text2,CenterButton, TwoImg } from "./styles";
import { useEffect, useState } from "react";

const AboutUs = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    return (
        <GeneralDiv>

            <BigInfo
            backgroundColor={theme.palette.background.default}
            height="100%"
            image={picture1}
            imageAlign="center"
            imageHeight="100%"
            imagePosition="left"
            imageWidth="100%"
            padding="0px"
            >
                <GeneralDiv>
                    <CustomHeaders>
                        ¿Quiénes somos?
                    </CustomHeaders>
                    <Texto>
                    DriveAI es una plataforma que busca crear la experiencia de compra de autos definitiva. Queremos que puedas conseguir el auto de tus sueños de la forma mas fácil, segura y transparente. Con nosotros encontrarás autos nuevos de las mejores marcas de México.  
                    </Texto>
                </GeneralDiv>
            </BigInfo>

            <GeneralDiv>
                <CustomHeaders>
                    Desde la agencia hasta tu puerta
                </CustomHeaders>
                <Texto>
                Olvídate del tedio de ir a las agencias, con DriveAI puedes comprar tu auto desde donde tú quireas. Realiza tu proceso de compra de forma personalizada con los precios que más te convengan, prueba de manejo y envío a donde más te convenga. Nuestros vendedores están a tu disposicición y listos para acompañarte desde el primer momento de tu proceso.
                </Texto>
            </GeneralDiv>

            <img src={picture2}></img>
            { screenWidth < 750 ? (
                <DivColumn>
                <Div1>
                  <Text1>¿Quieres registrar a tu grupo?</Text1>
                  <Text2> Si eres un representante de un grupo automotriz, realiza tu registro ahora para comenzar a anunciar tus autos de la mejor forma. DriveAI te permite tener control total del proceso de venta de inicio a fin, acceso a estadísticas para mejor toma desiciones, gestión de personal y agencias en cualquier lugar de México. Déjalo en nuestras manos.</Text2>
                  <CenterButton>
                  <Button
                  onClick={() => {}}
                  href="/register-formulaire-group"
                  
                  fontSize="10px"
                  >
                  Únetenos
                  </Button>
                  </CenterButton>
                
                </Div1>
                
                
              </DivColumn>
            ):(
            <DivColumn>
                        <Div1>
                            <Text1>¿Quieres registrar a tu grupo?</Text1>
                            <Text2> Si eres un representante de un grupo automotriz, realiza tu registro ahora para comenzar a anunciar tus autos de la mejor forma. DriveAI te permite tener control total del proceso de venta de inicio a fin, acceso a estadísticas para mejor toma desiciones, gestión de personal y agencias en cualquier lugar de México. Déjalo en nuestras manos.</Text2>
                            <CenterButton>
                                <Button
                                    onClick={() => {}}
                                    
                                    fontSize="20px"
                                    href="http://localhost:3000/register-formulaire-group"
                                >
                                Únetenos
                                </Button>
                            </CenterButton>
                        </Div1>
                        <Div2>
                            <TwoImg src={picture3} ></TwoImg>
                            <TwoImg src={picture4} ></TwoImg>
                        </Div2>
              
                    </DivColumn>
            )      
            }
        </GeneralDiv>
    );
    
  };
  
  export default AboutUs;