import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepperTheme from "theme/theme";
import styled from 'styled-components';
import { StepIconProps } from '@mui/material';
import { CircleIconRootProps } from './types';



export const QontoConnector = withStyles({
  alternativeLabel: {
    marginTop: 0,
    top: "40% !important",
    left: 'calc(-50% + 16px) !important',
    right: 'calc(50% + 16px) !important',
  },
  active: {
    '& $line': {
      borderColor: StepperTheme.status.correct,
    },
  },
  completed: {
    '& $line': {
      borderColor: StepperTheme.status.correct,
    },
  },
  line: {
    borderColor: StepperTheme.palette.tertiary.main,
    borderTopWidth: 5,
    borderRadius: 1,
  },
})(StepConnector);

export const useStyles = makeStyles({
  label: {
    fontSize: 15,
    background: "red",
    marginTop: 0,
  },
  root: {
    padding: '0px',
    background: 'transparent',
    width: '100%',
  },
  circleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  completedCircle: {
    border: `4px solid ${StepperTheme.status.correct}`,
    background: StepperTheme.palette.primary.main,
  },
  connector: {
    background: StepperTheme.palette.tertiary.main,
  },
  activeConnector: {
    background: StepperTheme.status.correct,
  },
});

const getCircleIconStyle = (active: boolean | undefined, completed: boolean | undefined) => {
  if (active || completed) {
    return `
      border: 4px solid ${StepperTheme.status.correct};
      background-color: ${StepperTheme.palette.primary.main};
    `;
  }
  return `
    border: 4px solid ${StepperTheme.palette.tertiary.main};
    background-color: ${StepperTheme.palette.tertiary.main};
  `;
};

export const CircleIconRoot = styled.div<CircleIconRootProps>`
  width: 55px;
  height: 55px;
  margin: 15px;
  font-size: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 1;
  ${({ ownerState }) => getCircleIconStyle(ownerState.active, ownerState.completed)}
`;