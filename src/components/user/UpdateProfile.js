import React from 'react';
import Auth from 'j-toker';
import { RaisedButton, Paper } from 'material-ui';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';


export class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Auth.user,
            formData: {
              firstname:   Auth.user.firstname,
              lastname:    Auth.user.lastname,
              address:     Auth.user.address,
              city:        Auth.user.city,
              postal_code: Auth.user.postal_code,
              age:         Auth.user.age,
              gender:      Auth.user.gender
            },
            submitted: false,
            errors: '0',
        };
    }

    componentDidMount() {
      const { formData } = this.state;
      setTimeout(() => {
        formData.firstname    = Auth.user.firstname;
        formData.lastname     = Auth.user.lastname;
        formData.address      = Auth.user.address;
        formData.city         = Auth.user.city;
        formData.postal_code  = Auth.user.postal_code;
        formData.age          = Auth.user.age;
        formData.gender       = Auth.user.gender;
        this.setState({ formData });
      }, 600);
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (history) => {
        const { firstname, lastname, address, city, postal_code, age, gender } = this.state.formData;
        this.setState({ submitted: true }, () => {
          Auth.updateAccount({
            firstname, lastname, address, city, postal_code, age, gender
          })
          .then(function() {
            history.push('/account');
          })
          .fail(res => {
            document.getElementById("errorLabel").className = '';
            this.setState({ submitted: false });
          })
        });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <div className="container">
                <Paper className="common-paper" style={{ marginTop:'0px' }}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={ () => this.handleSubmit(this.props.history) } 
                    >
                        <h2>Update your account</h2>
                        <h3 id="errorLabel" className="hidden">Please fix the shown errors</h3>
                        <TextValidator
                            floatingLabelText="Vorname"
                            onChange={this.handleChange}
                            name="firstname"
                            id="firstname"
                            value={formData.firstname}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Nachname"
                            onChange={this.handleChange}
                            name="lastname"
                            id="lastname"
                            value={formData.lastname}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Address"
                            onChange={this.handleChange}
                            name="address"
                            id="address"
                            value={formData.address}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Postal Code"
                            onChange={this.handleChange}
                            name="postal_code"
                            id="postal_code"
                            value={formData.postal_code}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="City"
                            onChange={this.handleChange}
                            name="city"
                            id="city"
                            value={formData.city}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Age"
                            onChange={this.handleChange}
                            name="age"
                            id="age"
                            value={formData.age}
                        />
                        <br />
                        <TextValidator
                            floatingLabelText="Gender"
                            onChange={this.handleChange}
                            name="gender"
                            id="gender"
                            value={formData.gender}
                        />
                        <br />
                        <RaisedButton
                            type="submit"
                            label={
                                (submitted && 'Your account is being updated!')
                                || (!submitted && 'Account updaten')
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
