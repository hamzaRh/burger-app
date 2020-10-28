import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = 
            <p style={{textAlign: 'left', color:'red', margin: '10px 0 0'}}>
                Please enter a valid {props.valueType}!
            </p>;
    }

    switch(props.elementType) {
        case 'input': inputElement = <input 
                        {...props.elementConfig} 
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}/>;
            break;
        case 'textarea': inputElement = <textarea 
                        {...props.elementConfig} 
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}/>;
            break;
        case 'select': inputElement = (
                        <select
                            className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed}>
                            {
                                props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                            {option.displayValue}
                                    </option>
                                ))
                            }
                            
                        </select>)
            break;
        default: inputElement = <input 
                                {...props.elementConfig} 
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}


export default input;