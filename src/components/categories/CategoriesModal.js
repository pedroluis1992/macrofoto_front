import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';



const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class CategoriesModal extends Component {

  constructor() {
    super()
    this.state = { branches: {}, activeStep: 0, completed: {},}
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.setProp = this.setProp.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
  }

  onChangeSave() {
    this.props.save(this.state.branches)
  }

  onChangeName(event) {
    this.setProp('name', event.target.value)
  }

  onChangeAddress(event) {
    this.setProp('address', event.target.value)
  }

  getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  setProp(prop, value) {
    let req = this.state.branches;
    req[prop] = value;
    this.setState({ branches: req });
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return( 
          <div>
            <TextField/>
          </div>);
      case 1:
        return 'Step 2: What is an ad group anyways?';
      case 2:
        return 'Step 3: This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }  

  render(){
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return(
      <div>
      <Dialog
        onClose={this.props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.props.open}
        fullWidth
      >
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography >All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography >{this.getStepContent(activeStep)}</Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
           
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
    );
  }
}

export default CategoriesModal;