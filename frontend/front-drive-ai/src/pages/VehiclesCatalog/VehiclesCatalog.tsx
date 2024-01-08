import VehicleCatalog from "components/VehiclesCatalog/VehiclesCatalog";
import Button  from "components/Button/Button";
import { Search, SearchBox, TitleText } from "./styles";
import { useState, useEffect } from "react";
import { getCatalogueByQuery } from "services";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const VehiclesCatalogRouter = () => {

    const [catalog, setCatalog] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [vehicleId, setVehicleId] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    //Seter

    const getVehicleCatalogByQuery = async (query: string) => {
        setLoading(true);
        await getCatalogueByQuery(query).then((res) => {
            if(res && res.data) {
                setCatalog(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }

    const navigate = useNavigate();

    const selectedVehicle = async (vehicleId: number) => {
        window.scrollTo(0, 0); 
        navigate(`/vehicle-selection/${vehicleId}`)
    }

    const handletest = () => {
       getVehicleCatalogByQuery(searchQuery);
    }

    const onClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const handleKeyDown = (event:any) => {
		if (event.key === 'Enter') {
			getVehicleCatalogByQuery(searchQuery);
		}
	};

    useEffect(() => {
        console.log(catalog);
    }, [catalog])

    useEffect(() => {
        if (vehicleId !== undefined){
            selectedVehicle(vehicleId);
        }
    }, [vehicleId])
    
    useEffect(() => {
        if(localStorage.getItem('miString') !== null){
            const query = localStorage.getItem('miString');
            if(query !==null ){
                setSearchQuery(query);
                console.log(query)
                getVehicleCatalogByQuery(query);
                localStorage.setItem('miString',"");
            }
        }
    }, []);

    return (
        
        <div>
            <TitleText>Explora el cátalogo</TitleText>
            <SearchBox>
                <Search defaultValue={searchQuery} placeholder="O describe que es lo que busca (auto deportivo para 4 personas ...)" onChange={onClickHandler} onKeyDown={handleKeyDown}></Search>
                <Button onClick={handletest}>{loading ? (<CircularProgress color={"inherit"} size={24}/>) : "Buscar" }</Button>
            </SearchBox>
            <VehicleCatalog isAdmin={false} carlist={ catalog } vehicleIdSetter={setVehicleId}  loading={loading}/>
        </div>
    ) 
};

export default VehiclesCatalogRouter;