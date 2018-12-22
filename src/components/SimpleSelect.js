import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginTop: theme.spacing.unit,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

const SimpleSelect = ({ classes, title, selectedValue, values, onChange= () => null }) => {
    const handleChange = ({ target }) => onChange(target.value)

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    {title}
                </InputLabel>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    input={<Input name="age" id="age-label-placeholder" />}
                    displayEmpty
                    name="picker"
                    className={classes.selectEmpty}
                >
                    {
                        values && values.map(value => (
                            <MenuItem value={value}>{value.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </form>
    )

}


SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
