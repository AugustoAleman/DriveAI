import React, { useEffect, ChangeEvent, useState, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, TimeView } from '@mui/x-date-pickers';
import { Header, ContentContainer, DatePickerContainer, CarInfoRoot, CarImageContainer, CarInfoContainer, CarImage, CarInfoRow, CarInfoLabel, CarInfoValue, UploadDocumentButtonContainer, ScrolContainer } from './styles'
import { Button } from 'components/Button';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import theme from "theme/theme";
import { BookTestDriveProps, ConfirmTestDriveProps, DocumentUploadProps, NextPurchaseProps } from './types';
import { TimePickerProps } from 'material-ui';
import { LoadingText } from 'components/LoadingText';
import { getOccupiedDates } from 'services';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const NextPurchase: React.FC<NextPurchaseProps> = ({
    date,
    setDate,
}) => {
    let dateString = "";
    return (
        <ContentContainer>
            <Header>¿Cuándo piensas comprar tu próximo auto?</Header>
            <DatePickerContainer>
                <DatePicker
                    value={date ? (date as unknown) as string : null}
                    onChange={(date: string | null) => {
                        // == to detect undefined and null
                        if (date == null) return;
                        setDate(date)
                        dateString = date
                        console.log('date', date)
                    }}
                    />
            </DatePickerContainer>
        </ContentContainer>
    )
}

export const BookTestDrive: React.FC<BookTestDriveProps> = ({
    date,
    setDate,
    dealershipvehicleId,
}) => {
    let dateString = "";
    const disabledDateTimes: Dayjs[] = [
        dayjs('2023-05-28 10:30'),
        dayjs('2023-05-28 09:00'),
        // Add more disabled date-times here...
    ];
    const [disabledDTs, setDisabledDTs] = useState<Dayjs[]>();
    

    // Function to check if a date-time should be disabled
    const shouldDisableDateTime = (dateTime: string): boolean => {
        const formattedDateTime = dayjs(dateTime, 'YYYY-MM-DD HH:mm');
        if (disabledDTs) {
          return disabledDTs.some((disabledDateTime) =>
            formattedDateTime.isSame(disabledDateTime, 'minute')
          );
        }
        return disabledDateTimes.some((disabledDateTime) =>
          formattedDateTime.isSame(disabledDateTime, 'minute')
        );
      };
    const handleGetDisabledDates = async (dvId: number) => {
        if(dvId){
            await getOccupiedDates(dvId).then((res) => {
                if(res && res.data){
                    console.log(res.data);
                    const scheduleDates = res.data.drivingTestList.map((item: any) => dayjs(item.schedule));
                    setDisabledDTs(scheduleDates);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    useEffect(() => {
        handleGetDisabledDates(dealershipvehicleId);
    }, [dealershipvehicleId]);

    return (
        <ContentContainer>
            <Header>¿Cuándo te gustaría tu prueba?</Header>
                {
                    disabledDTs ? (
                        
                        <DatePickerContainer>
                            <DateTimePicker
                                value={date ? (date as unknown) as string : null}
                                onChange={(selectedDate: string | null) => {
                                    // == to detect undefined and null
                                    if (selectedDate == null) return;
                                    setDate(selectedDate)
                                    console.log("This is the selected date: " + selectedDate);
                                    dateString = selectedDate;
                                }}
                                minutesStep={60}
                                disablePast={true}
                                shouldDisableTime={shouldDisableDateTime}
                            />
                        </DatePickerContainer>
                    ) : (
                        <LoadingText height='20%'/>
                    )
                }
        </ContentContainer>
    )
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documentList,
  requiredDocumentsList,
  selectedFilesUseState,
  setSelectedFilesUseState
}) => {
  // const [selectedFilesUseState, setSelectedFilesUseState] = useState<Array<File | null>>(Array(documentList.length).fill(null));
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>(Array(documentList.length).fill(null));

  const handleFileChange = (index: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setSelectedFilesUseState((prevSelectedFiles: any) => {
          const updatedSelectedFiles = [...prevSelectedFiles];
          updatedSelectedFiles[index] = files[0];
          return updatedSelectedFiles;
        });
      }
    };
  };

  const handleUpload = () => {
    // Upload logic
  };

  return (
    <ContentContainer>
      <Header>Sube tus documentos solicitados</Header>
      <ScrolContainer>
        {documentList.map((document: string, index: number) => (
          <UploadDocumentButtonContainer key={document}>
            <input
              type="file"
              id={`file-input-${index}`}
              style={{ display: 'none' }}
              ref={(ref) => (fileInputRefs.current[index] = ref)}
              onChange={handleFileChange(index)}
            />
            <Button
              startIcon={<FilePresentRoundedIcon htmlColor='black' />}
              variant="text"
              color={selectedFilesUseState[index] ? 'default' : 'primary'}
              onClick={() => {
                if (fileInputRefs.current[index]) {
                  fileInputRefs.current[index]!.click();
                }
              }}
              height="7vh"
              width="80%"
              fontSize="1.2rem"
              hoverShadow
            >
              {selectedFilesUseState[index] ? `${document} - ${selectedFilesUseState[index]?.name}` : document}
            </Button>
          </UploadDocumentButtonContainer>
        ))}
      </ScrolContainer>
    </ContentContainer>
  );
};

export const ConfirmTestDrive: React.FC<ConfirmTestDriveProps> = ({
    bookedDate,
    carInfo,
}) => {
    // TODO: Delete this function and change return to {bookedDate.toString()} when validation is done
    const checkForNull = () => {
        if(bookedDate == null) return "NaN";
        return bookedDate.format('DD/MM/YYYY HH:mm').toString();
    };
    return (
        <ContentContainer>
            <CarInfoRoot>
                <CarImageContainer>
                    <CarImage src={carInfo?.imageUrl ? carInfo?.imageUrl : "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png"}/>
                </CarImageContainer>
                <CarInfoContainer>
                    <CarInfoRow>
                        <CarInfoLabel>Marca: </CarInfoLabel>
                        <CarInfoValue>{carInfo?.brand}</CarInfoValue>
                    </CarInfoRow>
                    <CarInfoRow>
                        <CarInfoLabel>Submarca: </CarInfoLabel>
                        <CarInfoValue>{carInfo?.subBrand}</CarInfoValue>
                    </CarInfoRow>
                    <CarInfoRow>
                        <CarInfoLabel>Modelo: </CarInfoLabel>
                        <CarInfoValue>{carInfo?.model}</CarInfoValue>
                    </CarInfoRow>
                    <CarInfoRow>
                        <CarInfoLabel>Fecha: </CarInfoLabel>
                        <CarInfoValue>{checkForNull()}</CarInfoValue>
                    </CarInfoRow>
                </CarInfoContainer>
            </CarInfoRoot>
        </ContentContainer>
    )
}