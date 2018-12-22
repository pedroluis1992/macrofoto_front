import React, { Component } from 'react';
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
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Downshift from 'downshift';
import deburr from 'lodash/deburr';
import axios from 'axios';
import Configuration from '../../Configuration';
import keycode from 'keycode';

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

class ProductModal extends Component {

  constructor() {
    super()
    this.state = { selectedIds:[], categories: [], measures: [], selectedItemMeasure: [], inputMeasure: '', photoSettings: [], selectedItemPhoto: [], inputPhoto: '', printingOptions: [], selectedItem: [], selectedItemPhoto: [], inputValue: '', product: {}, activeStep: 0, completed: {}, }
    this.headers = { 'Authorization': `JWT ${localStorage.getItem('macrofoto:token')}` };
    this.onChangeName = this.onChangeName.bind(this);
    this.setProp = this.setProp.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
    this.setProp = this.setProp.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSuggestionsCategory = this.getSuggestionsCategory.bind(this);
  }

  componentDidMount() {
    this.getprintingOptions();
    this.getSettingsPhoto();
    this.getMeasures();
    this.getCategories();
  }

  getprintingOptions() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/printing-options`, { headers: this.headers })
      .then(response => {
        if ('printingOptions' in response.data) {
          this.setState({ printingOptions: response.data.printingOptions })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  getCategories() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/product-categories`, { headers: this.headers })
      .then(response => {
        if ('productCategories' in response.data) {
          this.setState({ categories: response.data.productCategories })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  getSettingsPhoto() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/photo-settings`, { headers: this.headers })
      .then(response => {
        if ('settings' in response.data) {
          this.setState({ photoSettings: response.data.settings })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  getMeasures() {
    axios.get(`${Configuration.apiServer}/api/v1/admin/measures`, { headers: this.headers })
      .then(response => {
        if ('measures' in response.data) {
          this.setState({ measures: response.data.measures })
        }
      }).catch(error => {
        console.log(error)
      })
  }


  onChangeSave() {
    this.props.save(this.state.product)
  }

  onChangeName(event) {
    this.setProp('name', event.target.value)
  }

  getSteps() {
    return ['Informacion general', 'Descripcion'];
  }

  setProp(prop, value) {
    let req = this.state.product;
    req[prop] = value;
    this.setState({ product: req });
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {

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

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    if (this.state.activeStep > 0) {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    } else {
      this.props.handleClose();
    }
  };

  onChangeName(event) {
    this.setProp('name', event.target.value)
  }

  onChangeDescription(event) {
    this.setProp('description', event.target.value)
  }

  setProp(prop, value) {
    let req = this.state.product;
    req[prop] = value;
    this.setState({ product: req });
  }

  renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderInputMeasure(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderInputPhoto(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderInputCategory(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,


          ...InputProps,
        }}
        {...other}
      />
    );
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleInputChangePhoto = event => {
    this.setState({ inputPhoto: event.target.value });
  };

  handleInputChangeMeasure = event => {
    this.setState({ inputMeasure: event.target.value });
  };

  renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  

  renderSuggestionCategory({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  renderSuggestionMeasures({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.width) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.width}
      </MenuItem>
    );
  }

  renderSuggestionPhoto({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.printingOptions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  getSuggestionsCategory(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.categories.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  getSuggestionsMeasures(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.measures.filter(suggestion => {
        const keep =
          count < 5 && suggestion.width.toString().slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  getSuggestionsPhoto(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.photoSettings.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleKeyDownMeasure = event => {
    const { inputMeasure, selectedItemMeasure } = this.state;
    if (selectedItemMeasure.length && !inputMeasure.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItemMeasure: selectedItemMeasure.slice(0, selectedItemMeasure.length - 1),
      });
    }
  };

  handleKeyDownPhoto = event => {
    const { inputPhoto, selectedItemPhoto } = this.state;
    if (selectedItemPhoto.length && !inputPhoto.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItemPhoto: selectedItemPhoto.slice(0, selectedItemPhoto.length - 1),
      });
    }
  };

  handleChange(item){
    console.log(item)
    let { selectedItem, selectedIds } = this.state;
    if (selectedItem.indexOf(item.name) === -1) {
      selectedItem = [...selectedItem, item.name];
      selectedIds = [...selectedIds, item.id];
    }
    this.setState({
      inputValue: '',
      selectedItem,
      selectedIds
    });
  };

  handleChangePhoto = item => {
    let { selectedItemPhoto } = this.state;

    if (selectedItemPhoto.indexOf(item) === -1) {
      selectedItemPhoto = [...selectedItemPhoto, item];
    }

    this.setState({
      inputValue: '',
      selectedItemPhoto,
    });
  };

  handleChangeMeasure = item => {
    let { selectedItemMeasure } = this.state;

    if (selectedItemMeasure.indexOf(item) === -1) {
      selectedItemMeasure = [...selectedItemMeasure, item];
    }

    this.setState({
      inputValue: '',
      selectedItemMeasure,
    });
  };


  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  handleDeletePhoto = item => () => {
    this.setState(state => {
      const selectedItemPhoto = [...state.selectedItemPhoto];
      selectedItemPhoto.splice(selectedItemPhoto.indexOf(item), 1);
      return { selectedItemPhoto };
    });
  };

  handleDeleteMeasure = item => () => {
    this.setState(state => {
      const selectedItemMeasure = [...state.selectedItemMeasure];
      selectedItemMeasure.splice(selectedItemMeasure.indexOf(item), 1);
      return { selectedItemMeasure };
    });
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="d-flex justify-content-between">
            <div style={{ width: '50%', marginLeft: '5%' }}>
              <img style={{ width: '75', height: '80%', borderRadius: '50%' }} src={require('../../images/descarga.jpeg')} alt={"Imagen usuario"} />
            </div>
            <div style={{ width: '50%' }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                onChange={this.onChangeName}
                type="text"
                fullWidth
              />
              <br />
              <TextField
                id="outlined-name"
                label="Descripcion"
                onChange={this.onChangeDescription}
                margin="normal"
                fullWidth
              />
            </div>

          </div>
        );
      case 1:
        return (
          <div >
            <Downshift
              id="downshift-multiple"
              inputValue={this.state.inputValue}
              onChange={this.handleChange}
              selectedItem={this.state.selectedItem}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
              }) => (
                  <div >
                    {this.renderInput({
                      fullWidth: true,

                      InputProps: getInputProps({
                        startAdornment: this.state.selectedItem.map(item => (
                          <Chip
                            key={item.id}
                            tabIndex={-1}
                            label={item}

                            onDelete={this.handleDelete(item)}
                          />
                        )),
                        onChange: this.handleInputChange,
                        onKeyDown: this.handleKeyDown,
                        placeholder: 'selecciona opciones de impresion',
                      }),
                      label: 'Opciones de impresion',
                    })}
                    {isOpen ? (
                      <Paper square>
                        {this.getSuggestions(inputValue2).map((suggestion, index) =>
                          this.renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion }),
                            highlightedIndex,
                            selectedItem: selectedItem2,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                )}
            </Downshift>
            <br />
            <Downshift
              id="downshift-multiple"
              inputValue={this.state.inputPhoto}
              onChange={this.handleChangePhoto}
              selectedItem={this.state.selectedItemPhoto}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
              }) => (
                  <div >
                    {this.renderInputPhoto({
                      fullWidth: true,

                      InputProps: getInputProps({
                        startAdornment: this.state.selectedItemPhoto.map(item => (
                          <Chip
                            key={item.id}
                            tabIndex={-1}
                            label={item}

                            onDelete={this.handleDeletePhoto(item)}
                          />
                        )),
                        onChange: this.handleInputChangePhoto,
                        onKeyDown: this.handleKeyDownPhoto,
                        placeholder: 'selecciona opciones de fotografia',
                      }),
                      label: 'Opciones de fotografia',
                    })}
                    {isOpen ? (
                      <Paper square>
                        {this.getSuggestionsPhoto(inputValue2).map((suggestion, index) =>
                          this.renderSuggestionPhoto({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.name }),
                            highlightedIndex,
                            selectedItem: selectedItem2,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                )}
            </Downshift>
            <br />
            <Downshift
              id="downshift-multiple"
              inputValue={this.state.inputMeasure}
              onChange={this.handleChangeMeasure}
              selectedItem={this.state.selectedItemMeasure}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
              }) => (
                  <div >
                    {this.renderInputMeasure({
                      fullWidth: true,

                      InputProps: getInputProps({
                        startAdornment: this.state.selectedItemMeasure.map(item => (
                          <Chip
                            key={item.id}
                            tabIndex={-1}
                            label={item}

                            onDelete={this.handleDeleteMeasure(item)}
                          />
                        )),
                        onChange: this.handleInputChangeMeasure,
                        onKeyDown: this.handleKeyDownMeasure,
                        placeholder: 'selecciona opciones de medida',
                      }),
                      label: 'Opciones de medida',
                    })}
                    {isOpen ? (
                      <Paper square>
                        {this.getSuggestionsMeasures(inputValue2).map((suggestion, index) =>
                          this.renderSuggestionMeasures({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.width }),
                            highlightedIndex,
                            selectedItem: selectedItem2,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                )}
            </Downshift>
            <br />
            <Downshift id="downshift-simple">
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => (
                  <div >
                    {this.renderInputCategory({
                      fullWidth: true,
                      InputProps: getInputProps({
                        placeholder: 'Buscar una categoria',
                      }),
                    })}
                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <Paper  square>
                          {this.getSuggestionsCategory(inputValue).map((suggestion, index) =>
                            this.renderSuggestionCategory({
                              suggestion,
                              index,
                              itemProps: getItemProps({ item: suggestion.name }),
                              highlightedIndex,
                              selectedItem,
                            }),
                          )}
                        </Paper>
                      ) : null}
                    </div>
                  </div>
                )}
            </Downshift>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  render() {
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
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
                  <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                    Crear Producto
                  </DialogTitle>
                  <DialogContent >{this.getStepContent(activeStep)}</DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleBack}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </DialogActions>
                </div>
              )}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ProductModal;