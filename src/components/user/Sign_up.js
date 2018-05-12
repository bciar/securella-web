import React from 'react';
import Auth from 'j-toker';
import { RaisedButton, Paper } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import { Redirect } from 'react-router-dom';


export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',
                repeatPassword: '',
            },
            submitted: false,
            errors: '0',
        };
    }

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.formData.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (history) => {
        this.setState({ submitted: true }, () => {
          Auth.emailSignUp({
            email: this.state.email, //document.getElementById('email').value,
            password: this.state.password, //document.getElementById('password').value,
            password_confirmation: this.state.repeatPassword//document.getElementById('password_confirmation').value
          })
          .then(function() {
            history.push('/verify');
          })
          .fail(res => {
            document.getElementById("errorLabel").className = '';
            this.setState({ submitted: false });
          })
        });
    }

    renderSpinner = () => {
      return ('Loading...')
    }

    renderApp() {
        const { formData, submitted } = this.state;
        if (this.props.user.loggedIn) { return <Redirect to='/dashboard' />; }
        else {
            return (
                <div className="container">
                    <Paper className="common-paper">
                    <ValidatorForm
                        ref="form"
                        onSubmit={ () => this.handleSubmit(this.props.history) } >
                        <h2>Create your Account</h2>
                        <h3 id="errorLabel" className="hidden"> Email vergeben oder Password zu kurz (min. 8 Zeichen)</h3>
                        <TextValidator
                            floatingLabelText="Email"
                            onChange={this.handleChange}
                            name="email"
                            id="email"
                            value={formData.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            id="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            value={formData.password}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Repeat password"
                            onChange={this.handleChange}
                            name="repeatPassword"
                            type="password"
                            id="password_confirmation"
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                            value={formData.repeatPassword}
                        />
                        <br />
                        <RaisedButton
                            type="submit"
                            label={
                                (submitted && 'Your account is being created!')
                                || (!submitted && 'Account alegen')
                            }
                            disabled={submitted}
                            style={{marginTop:'50px', marginBottom:'10px'}}
                        />
                    </ValidatorForm>
                    </Paper>
                </div>
            );
        }
    }

    render() {
        return this.props.app.loaded ? this.renderApp() : ('Loading...');
    }
}
