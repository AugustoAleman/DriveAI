import React from "react";
import theme from "theme/theme";
import { AnyNotificationProps } from "./types";
import Card from "components/Card/Card";
import { Button } from "components/Button";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    Notification,
    NotificationContent,
    NotificationIcon,
    NotificationText,
    NotificationButton,
    NotificationParagraph,
    NotificationTitle,

} from "./styles";

const AnyNotification: React.FC<AnyNotificationProps> = ({
    title = "Success",
    text = "You have successfully completed the task",
    icon = <CheckCircleOutlineIcon />,
    buttonTitle = "Close",
    colorIcon = theme.status.correct
}) => {
    return (
        <Notification>
            <Card
                border="none"
                borderRadius="Small"
                color="#FFFFFF"
                cursor="default"
                height="22rem"
                hoverColor="#CBD0D0"
                margin="0px"
                padding="0px"
                shadow=" 2px 2px 7px rgba(0, 0, 0, 0.3)"
                width="22rem"
            >
                <NotificationContent>
                    <NotificationIcon colorIcon={colorIcon}>
                        {icon}
                    </NotificationIcon>
                    <NotificationText>
                        <NotificationTitle>{title}</NotificationTitle>
                        <NotificationParagraph>{text}</NotificationParagraph>
                    </NotificationText>
                </NotificationContent>
                <NotificationButton>
                    <Button onClick={() => { }} width="12vw">
                        {buttonTitle}
                    </Button>
                </NotificationButton>
            </Card>
        </Notification>
    );
};

export default AnyNotification;