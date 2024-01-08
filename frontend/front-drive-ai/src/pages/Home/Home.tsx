import theme from "theme/theme";
import { BigInfo } from "components/BigInfo";
import { Button } from "components/Button";
import tabla from "pages/Home/partials/tabla.png";
import picture1 from "pages/Home/partials/picture1.png";
import picture2 from "pages/Home/partials/picture2.png";
import { CenterDivColumn, Search, CustomHeaders, DivRow, CenterDiv, DivColumn,TextCustom, TextDif, DivInput, ImageSize, CenterButtons, SpaceButtons, Div1, Text1, Text2, DivButton, DivColumnR, Points, DivColumnResPoint, TextDescriptive, DivColumnLine, Circle, CircleMiddle, LineBetweenPoint, CircleDown, SingleLineUp, SingleLine, TwoImg, Div2, GeneralHomeWrapper} from './styles';



import { Carousel } from "./partials/Carousel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
	// HANDLE RESIZING
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate();
	const onWritte = (event: React.ChangeEvent<HTMLInputElement>) =>{
		setSearchQuery(event.target.value);
	}

	const handleKeyDown = (event:any) => {
		if (event.key === 'Enter') {
			navigate('/vehicle-catalog');
			localStorage.setItem('miString', searchQuery);
		}
	};

	

	useEffect(() => {
	  const handleResize = () => setScreenWidth(window.innerWidth);
	  window.addEventListener('resize', handleResize);
	  return () => window.removeEventListener('resize', handleResize);
	}, []);
	if(screenWidth < 750){
	  return(
	  <GeneralHomeWrapper>
		<CenterDivColumn>
		  <TextCustom>
			Encuentra la mejor opción <br/> <TextDif>garantizado </TextDif>
		  </TextCustom>
		  <DivInput>
			<Search value={searchQuery} placeholder="Ingrese las preferencias de su carro" onKeyDown={handleKeyDown} onChange={onWritte}></Search>
			<Button
			onClick={() => {
				navigate('/vehicle-catalog');
				localStorage.setItem('miString', searchQuery);
			}}
			fontSize="50%"
			
			
			
	  
			>
			Buscar
			</Button>
		  </DivInput>
		</CenterDivColumn>
		<CustomHeaders >
		¿Cómo Funciona?
		</CustomHeaders>
		<DivRow>
		  <DivColumnResPoint>
			  <Points>
				Explora
			  </Points>
		  </DivColumnResPoint>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		  
		  <DivColumnResPoint>
			  <Points>
				Compara
			  </Points>
		  </DivColumnResPoint>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		  
		  <DivColumnResPoint>
			  <Points>
				Cotiza
			  </Points>
		  </DivColumnResPoint>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		
		  <DivColumnResPoint>
			  <Points>
				Disfruta
			  </Points>
		  </DivColumnResPoint>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR> 
		</DivRow>
		<CustomHeaders>
		¿Por qué comprar con DriveAi?
	  </CustomHeaders>
	  <CenterDiv>
		<ImageSize src={tabla} />
		<CustomHeaders>
		¿Listo para tu siguiente auto?
		</CustomHeaders>
		<CenterButtons>
		<SpaceButtons>
		<Button
		  onClick={() => {}}
		  fontSize="8px"
		  href="/login"
		>
		Empezar
		</Button>
		</SpaceButtons>
		<SpaceButtons>
		<Button
		backgroundColor={theme.palette.tertiary.main}
		color="#000000"
		onClick={() => {}}
		href="/about-us"
		
		fontSize="8px"
		
		>
		Aprender más
		</Button>
		</SpaceButtons>
  
		</CenterButtons>
	  </CenterDiv>
	  
	  <CustomHeaders>
		Testimonios
	  </CustomHeaders>
	  <Carousel ></Carousel>
  
	  <DivColumn>
		<Div1>
		  <Text1>¿Quieres registrar a tu grupo?</Text1>
		  <Text2> Si eres un representante de un grupo automotriz, realiza tu registro ahora para comenzar a anunciar tus autos de la mejor forma. DriveAI te permite tener control total del proceso de venta de inicio a fin, acceso a estadísticas para mejor toma desiciones, gestión de personal y agencias en cualquier lugar de México. Déjalo en nuestras manos.</Text2>
		  <DivButton>
		  <Button
		  onClick={() => {}}
		  href="/register-formulaire-group"
		  
		  fontSize="10px"
		  >
		  Unetenos
		  </Button>
		  </DivButton>
		</Div1>
		
		
	  </DivColumn>
  
  
	  </GeneralHomeWrapper>
	  );
	}else{
  
	return (
	  <GeneralHomeWrapper>
  
	  <BigInfo
	  backgroundColor = {theme.palette.background.default}
	  height="100%"
	  image="https://img.remediosdigitales.com/89a565/nissan-kicks-2021-precio-mexico_/1366_2000.jpg"
	  imageAlign="center"
	  imageHeight="100%"
	  imagePosition="right"
	  imageWidth="100%"
	  padding="0px"
	  >
	  <CenterDivColumn>
	  <TextCustom>
		Encuentra la mejor opción <br/> <TextDif>garantizado </TextDif>
	  </TextCustom>
	  <DivInput>
	  <Search value={searchQuery} placeholder="Ingrese las preferencias de su carro" onChange={onWritte} onKeyDown={handleKeyDown}></Search>
	  <Button
	  onClick={() => {
		localStorage.setItem('miString', searchQuery);
		navigate('/vehicle-catalog');
		
	  }}
	  fontSize="1.2vw"
	  
	  
	  >
	  Buscar
	  
	  </Button>
	  </DivInput>
	  </CenterDivColumn>
	  </BigInfo>
  
	  <CustomHeaders >
		¿Cómo Funciona?
	  </CustomHeaders>
  
	  <BigInfo
	  backgroundColor={theme.palette.background.default}
	  height="100%"
	  image = "https://noticias.coches.com/wp-content/uploads/2011/06/trato-venta-coche.jpg"
	  imageAlign="center"
	  imageHeight="100%"
	  imagePosition="left"
	  imageWidth="100%"
	  padding="0px"
	  > 
		<DivRow>
		  <DivColumnLine>
			  <Circle></Circle>
			  <SingleLine></SingleLine>
		  </DivColumnLine>
		  <DivColumnR>
			  <Points>
				Explora
			  </Points>
		  </DivColumnR>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		  <DivColumnLine>
			  <LineBetweenPoint></LineBetweenPoint>
			  <CircleMiddle></CircleMiddle>
			  <LineBetweenPoint></LineBetweenPoint>
		  </DivColumnLine>
		  <DivColumnR>
			  <Points>
				Compara
			  </Points>
		  </DivColumnR>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		  <DivColumnLine>
			  <LineBetweenPoint></LineBetweenPoint>
			  <CircleMiddle></CircleMiddle>
			  <LineBetweenPoint></LineBetweenPoint>
		  </DivColumnLine>
		  <DivColumnR>
			  <Points>
				Cotiza
			  </Points>
		  </DivColumnR>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR>
		</DivRow>
		<DivRow>
		<DivColumnLine>
			  <SingleLineUp></SingleLineUp>
			  <CircleDown></CircleDown>
		  </DivColumnLine>
		  <DivColumnR>
			  <Points>
				Disfruta
			  </Points>
		  </DivColumnR>
		  <DivColumnR>
			  <TextDescriptive>
				La tecnología de DriveAi permite a los usuarios realizar búsquedas verdaderamente personalizadas. En el buscador, introduce lo que quieras buscar, como si de un amigo se tratara.
			  </TextDescriptive>
		  </DivColumnR> 
		</DivRow>
		
	  
	  </BigInfo>
  
	  <CustomHeaders>
		¿Por qué comprar con DriveAi?
	  </CustomHeaders>
	  <CenterDiv>
		<ImageSize src={tabla} />
		<CustomHeaders>
		¿Listo para tu siguiente auto?
		</CustomHeaders>
		<CenterButtons>
		<SpaceButtons>
		<Button
		  onClick={() => {}}
		  width="12vw"
		  fontSize="1.4vw"
		  height="5vh"
		  href="/login"
		>
		Empezar
		</Button>
		</SpaceButtons>
		<SpaceButtons>
		<Button
		backgroundColor={theme.palette.tertiary.main}
		color="#000000"
		onClick={() => {}}
		href="/about-us"
		width="12vw"
		fontSize="1.1vw"
		height="5vh"
		>
		Aprender más
		</Button>
		</SpaceButtons>
  
		</CenterButtons>
	  </CenterDiv>
	  
	  <CustomHeaders>
		Testimonios
	  </CustomHeaders>
	  <Carousel></Carousel>
	  <DivColumn>
		<Div1>
		  <Text1>¿Quieres registrar a tu grupo?</Text1>
		  <Text2> Si eres un representante de un grupo automotriz, realiza tu registro ahora para comenzar a anunciar tus autos de la mejor forma. DriveAI te permite tener control total del proceso de venta de inicio a fin, acceso a estadísticas para mejor toma desiciones, gestión de personal y agencias en cualquier lugar de México. Déjalo en nuestras manos.</Text2>
		  <DivButton>
		  <Button
		  onClick={() => {}}
		  href="/register-formulaire-group"
		  width="12vw"
		  fontSize="1.4vw"
		  >
		  Únetenos
		  </Button>
		  </DivButton>
		</Div1>
		<Div2>
		  <TwoImg src={picture1} ></TwoImg>
		  <TwoImg src={picture2} ></TwoImg>
		</Div2>
	  </DivColumn>
	  </GeneralHomeWrapper>
	);
	}
  };
export default Home;
