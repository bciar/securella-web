import React from 'react';
import Auth from 'j-toker';
import { Toggle, RaisedButton } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import { Link, Redirect } from 'react-router-dom';
import store from '../../store.js';
import { setLoginState } from '../../actions/userActions.js'

const submitButtonStyle = {
    background: '#49ca89',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    minWidth: '50px',
};

export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        const email = localStorage.getItem('email') || '';
        const password = localStorage.getItem('password') || '';
        this.state = {
            formData: {
                email,
                password
            },
            submitted: false,
            errors: false, 
            isSaveLogin: true,
        };
    }

    componentWillMount() {
      if (this.props.user.loggedIn) {
        this.props.history.push('/dashboard');
      }
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (history) => {
        const state = this.state;
        const {email, password} = state.formData;
        this.setState({ submitted: true }, () => {
            Auth.emailSignIn({
                email: email,
                password: password,
            })
            .then(function(user) {
                if (state.isSaveLogin) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                }
                else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }
                store.dispatch(setLoginState(true));
            })
            .fail(res => {
                document.getElementById("errorLabel").className ='';
                this.setState({ submitted: false });
            })
        });
    }

    render() {
        const { formData, submitted } = this.state;
        if (this.props.user.loggedIn) { return <Redirect to='/dashboard' />; }
        else {
            return (
                <ValidatorForm
                    ref="form"
                    name="signinform"
                    className="signin-form"
                    autoComplete="off"
                    onSubmit={ () => this.handleSubmit(this.props.history) } 
                >
                    <div className="login-wrapper">
                        <h2>Securella Login</h2>
                        <h3 id="errorLabel" className="hidden"> Email or password wrong</h3>
                        <TextValidator
                            floatingLabelText="Email"
                            onChange={this.handleChange}
                            name="email"
                            id="email"
                            value={formData.email}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            id="password"
                            value={formData.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <div className="buttons-container">
                            <div className="buttons">
                                <Toggle
                                    className="toggle"
                                    label="Save login"
                                    defaultToggled={true}
                                    onToggle={(e, value) => this.setState({ isSaveLogin: value })}
                                />
                                <RaisedButton
                                    type="submit"
                                    className="btn-ok"
                                    style={submitButtonStyle}
                                    label={submitted ? '...' : 'OK'}
                                    disabled={ submitted }
                                />
                            </div>
                            <p><Link to='/request_password_reset'>forget your password ?</Link></p>
                        </div>
                    </div>
                </ValidatorForm>
            );
        }
    }
}
