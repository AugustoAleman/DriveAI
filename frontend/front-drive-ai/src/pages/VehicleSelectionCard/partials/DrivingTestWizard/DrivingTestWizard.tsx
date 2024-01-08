import React from 'react'
import { useState, useEffect } from 'react'
import { Stepper } from 'components/Stepper'
import { Stepper as StepperV2 } from 'components/Stepper_v2'
import { DrivingTestDto, DrivingTestWizardProps } from './types'
import { useStyles } from 'components/Stepper/styles'
import { DrivingTestWizardContainer, Header, MissingFields, MissingFieldsWrapper, NextStepFooter, StepContainer } from './styles'
import { NextPurchase, BookTestDrive, DocumentUpload, ConfirmTestDrive } from './steps/Steps'
import { Button } from 'components/Button'
import dayjs, { Dayjs } from 'dayjs'
import { DocumentRequiredDto, createDrivingTest, getRequiredDocumentsDT, saveDTDocuments } from 'services'
import theme from 'theme/theme'
import { Alert } from '@mui/material'
import { AlertSuccess } from 'components/AlertSuccess'
import { useAppContext } from 'store/app-context/app-context'
import { TicketData } from 'pages/VehicleSelectionCard/types'

const DrivingTestWizard : React.FC<DrivingTestWizardProps> = ({
  carInfo,
  onSend,
}) =>{
  const [activeStep, setActiveStep] = useState(0);
  const [nextPurchaseDate, setNextPurchaseDate] = useState<Dayjs | null>(null);
  const [testDriveDate, setTestDriveDate] = useState<Dayjs | null>(null);
  const [documentList, setDocumentList] = useState<string[]>([]);
  const [requiredDocumentsList, setRequiredDocumentsList] = useState<DocumentRequiredDto[]>([]);
  const [theMissingFields, setMissingFields] = useState<string>("");

  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [typeMessage, setTypeMessage] = useState<number>(4);

  const [disabledButton, setDisabledButton] = useState(false);

  const { user } = useAppContext();

  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>(Array(documentList.length).fill(null));
  const handleUploadDocs =  async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i]) {
        console.log(selectedFiles[i]);
        formData.append(`file_${i}`, selectedFiles[i]!, selectedFiles[i]?.name);
      }
    }

      console.log(formData);

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      if(requiredDocumentsList){
        const documentRequiredIds = requiredDocumentsList?.map(document => document.documentRequiredId?.toString()).join(',');
        await saveDTDocuments(documentRequiredIds, formData).then((res) => {
          console.log(res);
          if(res && res.data){
            console.log(res.data);
          }
        }).catch((err) => {
          console.log(err);
        });
      }

  };

  //TODO: Validate values before next step
  const nextStep = () => {
    if(activeStep === 3) onSend("empty");
    setActiveStep(activeStep+1);
  };
  const backStep = () => {
    // if(activeStep === 3) onSend();
    setActiveStep(activeStep-1);
  };
  function extractDocumentNames(documentRequiredList: DocumentRequiredDto[]): string[] {
    return documentRequiredList.map((documentRequired) => (documentRequired?.documentName) || '');
  }

  const handleGetDocumentsList = async (dvId: number) => {
    if(carInfo){
      await getRequiredDocumentsDT(dvId).then((res) => {
        if(res && res.data) {
          console.log(res.data);
          setDocumentList(extractDocumentNames(res.data));
          setRequiredDocumentsList(res.data);
        }
        else{
          setDocumentList([]);
          setRequiredDocumentsList([]);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  //TODO: Add request to driving test documents
  useEffect(() => {
    setDocumentList([]);
    handleGetDocumentsList(1);
  }, []);


  const handleNext = () => {
    switch (activeStep) {
      case 0:
        return (<NextPurchase date={nextPurchaseDate} setDate={setNextPurchaseDate}></NextPurchase>);
      case 1:
        return (<BookTestDrive date={testDriveDate} setDate={setTestDriveDate} dealershipvehicleId={carInfo?.id ? (carInfo.id) : (0)}></BookTestDrive>);
      case 2:
        return (<DocumentUpload documentList={documentList} requiredDocumentsList={requiredDocumentsList} selectedFilesUseState={selectedFiles} setSelectedFilesUseState={setSelectedFiles}></DocumentUpload>);
      case 3:
        return (<ConfirmTestDrive bookedDate={testDriveDate} carInfo={carInfo}></ConfirmTestDrive>);
      default:
        return;
    }
  };
  const handleMissingFields = () => {
    let missFields = "Olvidaste establecer los siguientes campos: ";
    if(nextPurchaseDate === null){
      missFields += "Fecha tentativa de compra";
    }
    if(testDriveDate === null){
      if(nextPurchaseDate === null){
        missFields += ", ";
      }
      missFields += "Fecha de prueba de manejo";
    }
    if(documentList.length !== selectedFiles.length){
      if(nextPurchaseDate === null || testDriveDate === null){
        missFields += ", ";
      }
      missFields += "Documentación oficial";
    }
    setMissingFields(missFields);
    setTypeMessage(3);
    setButtonClicked(!buttonClicked);
  }

  const handlePostCreateDrivingTest = async (drivingTestDto: DrivingTestDto) => {
    
    

    const ticket : TicketData = {
      marca: carInfo?.brand ,
      submarca: carInfo?.subBrand,
      modelo: carInfo?.model,
      fecha: testDriveDate,
      image: carInfo?.imageUrl,
    }

    // onSend(ticket);
    

   await createDrivingTest(drivingTestDto).then((res) => {
      console.log(res);
      if(res.data === "The driving test has been created: true" ){
        setTypeMessage(1);
        setButtonClicked(!buttonClicked);
        setActiveButton(false);
        onSend(ticket);
      }else{
        setTypeMessage(2);
        setButtonClicked(!buttonClicked);
      }

    }).catch((err) => {
      console.log(err);
      setTypeMessage(2);
      setButtonClicked(!buttonClicked);
    });
  }

  const saveNewDrivingTest = () => {
    let dt: DrivingTestDto = {
      userId: user?.id as number,
      dealershipVehicleId: carInfo?.id as number,
      schedule: testDriveDate,
      tentativeBuyingDate: nextPurchaseDate,
      status: "En proceso",
    }
    handleUploadDocs();
    handlePostCreateDrivingTest(dt);
  }

  useEffect(() => {
    if(activeStep === 0 && nextPurchaseDate === null){
      setDisabledButton(true);
    }else if(activeStep === 1 && testDriveDate === null){
      setDisabledButton(true);
    }else if(activeStep === 2 && selectedFiles.length !== requiredDocumentsList?.length){
      setDisabledButton(true);
    }else{
      setDisabledButton(false);
    }
  }, [activeStep, nextPurchaseDate, testDriveDate, selectedFiles]);

  return (
    <DrivingTestWizardContainer>
      <Header>
        Agenda tu prueba de manejo
      </Header>
      <StepperV2
        steps={[
          'Agenda tu próxima compra',
          'Agenda tu cita',
          'Sube tus documentos',
          'Confirma tu cita'
        ]}
        activeStep = {activeStep}
        setActiveStep={setActiveStep}
        enableCLickStep={false}
      />
      <StepContainer>
        {handleNext()}
      </StepContainer>
      <MissingFieldsWrapper>
        {
          typeMessage !== 4 && (
            <AlertSuccess message={theMissingFields} type_message={typeMessage} button_clicked={buttonClicked} ></AlertSuccess>
          )
        }
      </MissingFieldsWrapper>
      <NextStepFooter>
        {
          activeStep > 0 ? (
            <Button 
              onClick={backStep}
              height='100%'
              width='35%'
              fontSize='1rem'
              fontWeight='600'
            >{"Back"}</Button>
          ) : (
            <div></div>
          )
        }
        {
          activeStep < 3 ? (
            <Button 
              onClick={ disabledButton === false ? nextStep :() => {}}
              disabled={disabledButton}
              height='100%'
              width='35%'
              fontSize='1rem'
              fontWeight='600'
              backgroundColor={disabledButton === false ? theme.palette.secondary.main : theme.palette.tertiary.main }
            >{"Siguiente" }</Button>
          ) : (
            <Button 
              onClick={nextPurchaseDate !== null && testDriveDate !== null && selectedFiles.length === requiredDocumentsList?.length ? saveNewDrivingTest : handleMissingFields}
              disabled={!activeButton}
              height='100%'
              width='35%'
              fontSize='1rem'
              fontWeight='600'
              backgroundColor={nextPurchaseDate !== null && testDriveDate !== null && selectedFiles.length === requiredDocumentsList?.length ? theme.palette.secondary.main : theme.palette.tertiary.main }
            >{"Enviar solicitud"}</Button>
          )
        }
      </NextStepFooter>
    </DrivingTestWizardContainer>
  )
}

export default DrivingTestWizard