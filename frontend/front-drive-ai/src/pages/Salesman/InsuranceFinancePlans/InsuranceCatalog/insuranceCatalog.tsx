import {
    PageBackground,
    Contents,
    Fields,
    Title,
    Cell,
    Add,
    Cell2,
  } from "./styles";
  import { Card } from "components/Card";
  import { IconButtonAdmin } from "components/IconButtonAdmin";
  import ControlPointIcon from "@mui/icons-material/ControlPoint";
  import { OptionInsurance } from "components/OptionInsurance";
  import Checkbox from "@mui/material/Checkbox";
  
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  
  const InsuranceCatalog = () => {
    return (
      <>
        <PageBackground>
          <Card
            width="90%"
            height="auto"
            margin="1.2rem 1.2rem 1.2rem 4rem"
            padding="1.2rem"
            borderRadius="None"
            cursor="default"
          >
            <Title>Selección de seguros</Title>
            <Fields>
              <Contents>
                <Cell>
                  <OptionInsurance
                    active
                    imageUrl="https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png"
                    index={-1}
                    onClick={() => {}}
                    text="AXA"
                    width={5}
                  />
                  <OptionInsurance
                    active
                    imageUrl="https://pagosenlinea.mx/wp-content/uploads/2020/01/Pago-en-linea-seguros-monterrey.jpg"
                    index={-1}
                    onClick={() => {}}
                    text="Seguros Monterrey"
                    width={5}
                  />
                </Cell>
                <Cell2>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                </Cell2>
              </Contents>
              <Contents>
                <Cell>
                  <OptionInsurance
                    active
                    imageUrl="https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png"
                    index={-1}
                    onClick={() => {}}
                    text="AXA"
                    width={5}
                  />
                  <OptionInsurance
                    active
                    imageUrl="https://pagosenlinea.mx/wp-content/uploads/2020/01/Pago-en-linea-seguros-monterrey.jpg"
                    index={-1}
                    onClick={() => {}}
                    text="Seguros Monterrey"
                    width={5}
                  />
                </Cell>
                <Cell2>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                </Cell2>
              </Contents>
              <Contents>
                <Cell>
                  <OptionInsurance
                    active
                    imageUrl="https://pagosenlinea.mx/wp-content/uploads/2020/01/Pago-en-linea-seguros-monterrey.jpg"
                    index={-1}
                    onClick={() => {}}
                    text="Seguros Monterrey"
                    width={5}
                  />
                  <OptionInsurance
                    active
                    imageUrl="https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png"
                    index={-1}
                    onClick={() => {}}
                    text="AXA"
                    width={5}
                  />
                </Cell>
                <Cell2>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                </Cell2>
              </Contents>
              <Contents>
                <Cell>
                  <OptionInsurance
                    active
                    imageUrl="https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png"
                    index={-1}
                    onClick={() => {}}
                    text="AXA"
                    width={5}
                  />
                  <OptionInsurance
                    active
                    imageUrl="https://www.kayum.mx/wp-content/uploads/2019/09/axa_logo_solid_rgb.png"
                    index={-1}
                    onClick={() => {}}
                    text="AXA"
                    width={5}
                  />
                </Cell>
                <Cell2>
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                  <Checkbox
                    {...label}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                  />
                </Cell2>
              </Contents>
              <Add>
                <IconButtonAdmin>
                  <ControlPointIcon style={{ fontSize: 60 }} />
                </IconButtonAdmin>
              </Add>
            </Fields>
          </Card>
        </PageBackground>
      </>
    );
  };
  
  export default InsuranceCatalog;