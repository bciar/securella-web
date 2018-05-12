import React from 'react';
import Auth from 'j-toker';
import { RaisedButton, Paper } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

export class RequestPasswordReset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                password: ''
            },
            submitted: false,
            errors: false
        };
    }

    componentWillMount() {
      Auth.validateToken()
        .then(function(user) {
        this.props.history.push('/reset_password');
      });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (history) => {
        const { email } = this.state.formData;
        this.setState({ submitted: true }, () => {
          Auth.requestPasswordReset({
            email,
            redirect_url: '/reset_password'
          })
          .then(function(user) {
            history.push('/request_password_success');
          })
          .fail(res => {
            document.getElementById("errorLabel").className = '';
            this.setState({ submitted: false });
          })
        });
    }

    render() {
        const { formData, submitted } = this.state;
        if (Auth.user.signedIn) {
            return (<div><h1>You are in!</h1></div>);
        }
        else {
            return (
                <div className="container">
                    <Paper className="common-paper">
                        <ValidatorForm
                            ref="form"
                            onSubmit={ () => this.handleSubmit(this.props.history) } >
                            <h2>Reset your Password</h2>
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
                            <RaisedButton
                                type="submit"
                                label={
                                    (submitted && 'Processing...')
                                    || (!submitted && 'Get a new password')
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
}
