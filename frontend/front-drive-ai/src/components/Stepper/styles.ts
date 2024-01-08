import { makeStyles, withStyles } from '@material-ui/core/styles';
import { StepConnector } from '@material-ui/core';
import StepperTheme from "theme/theme";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  circleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: '50%',
    background: StepperTheme.palette.tertiary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    border: `4px solid ${StepperTheme.palette.tertiary.main}`,
    fontSize: 24,
  },
  activeCircle: {
    border: `4px solid ${StepperTheme.status.correct}`,
    background: StepperTheme.palette.primary.main,
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
  label: {
    maxWidth: 53,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
  },
}));

export const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
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
    borderTopWidth: 4,
    borderRadius: 1,
    transform: 'translateY(-250%)',
  },
}))(StepConnector);
