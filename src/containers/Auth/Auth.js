import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/spinner/spinner';
import { updatedObject, checkValidity } from '../../shared/utility';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangeHandler =(event, controlName) => {
        const control = updatedObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true

        });

        const updatedControls = updatedObject(this.state.controls, {
            [controlName]: control
        });
        
        this.setState({controls: updatedControls});
    }

    

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }

    render() {
        const formsElementsArray = [];

        for(let key in this.state.controls) {
            formsElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formsElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                valueType={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
            ));
           
            if (this.props.loading) {
                form = <Spinner/>
            }

            let errorMsg = null;

            if (this.props.error) {
                errorMsg = (
                    <p>{this.props.error.message}</p>
                )
            }

            let authRedirect = null;

            if (this.props.isAuth) {
                authRedirect = <Redirect to={this.props.authRedirectPath}/>;
            }



        return (
            <div className={classes.Auth}>
                {authRedirect}
                 {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);