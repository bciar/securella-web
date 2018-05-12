import React, { Component } from 'react';
import $ from 'jquery';
import ApiURL from '../apiClient';
import { RaisedButton, Paper } from 'material-ui';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

export class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {
          alarmData: {
            status: "closed",
            latitude: -33.931498,
            longitude: 18.434765
          },
          formData: {
              latitude: '-33.931498',
              longitude: '18.434765'
          },
          submitted: false,
          errors: false
      };
  }

  componentWillMount() {
    if (!this.props.user.loggedIn) {
      this.props.history.push('/login');
    }

    return $.ajax ({
      url: ApiURL("user/alarm_status"),
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({alarmData: data}); console.log(data); }.bind(this)
    });
  }

  handleChange = (event) => {
      const { alarmData } = this.state;
      alarmData[event.target.name] = event.target.value;
      this.setState({ alarmData });
  }

  newAlarm = (history) => {
    return $.ajax ({
      url: ApiURL("user/new_alarm"),
      type: "POST",
      data: JSON.stringify({
        "alarm": {
        "latitude": document.getElementById('latitude').value,
        "longitude": document.getElementById('longitude').value}
      }),
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({alarmData: data}); console.log(data); }.bind(this)
    });
  }

  updateAlarm = (history) => {
    return $.ajax ({
      url: ApiURL("user/new_alarm"),
      type: "PUT",
      data: JSON.stringify({
        "alarm": {
        "latitude": document.getElementById('latitude').value,
        "longitude": document.getElementById('longitude').value}
      }),
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({alarmData: data}); console.log(data); }.bind(this)
    });
  }

  closeAlarm = () => {
    return $.ajax ({
      url: ApiURL("user/close_alarm"),
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({alarmData: data}); console.log(data); }.bind(this)
    });
  }

  updateStatus = () => {
    return $.ajax ({
      url: ApiURL("user/alarm_status"),
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({alarmData: data}); console.log(data); }.bind(this)
    });
  }

  render() {
    const { alarmData, submitted } = this.state;
    if (alarmData.status === "open") {
      return (
        <div className="container">
        <Paper className="common-paper" zDepth={2}>
          <div>
            <h3>Alarm: {this.state.alarmData.status}</h3>
            <ValidatorForm
                ref="form"
                name="alarmform"
                onSubmit={ () => this.newAlarm(this.props.history) } >
                <TextValidator
                    floatingLabelText="Latiutude"
                    onChange={this.handleChange}
                    name="latitude"
                    id="latitude"
                    value={alarmData.latitude}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Longitude"
                    onChange={this.handleChange}
                    name="longitude"
                    id="longitude"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={alarmData.longitude}
                />
                <br />
                <RaisedButton
                    type="submit"
                    name="submitbutton"
                    label={
                        (submitted && 'Processing...')
                        || (!submitted && 'Update Alarm')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
          </div>
          <div className="common-paper-button-wrapper">
            <RaisedButton label="Update View" onClick={ () => this.updateStatus() }/>
            <RaisedButton label="Close Alarm" onClick={ () => this.closeAlarm() }/>
          </div>
        </Paper>
        </div>
      );
    }
    else {
      return (
        <div className="container">
        <Paper className="common-paper" zDepth={2}>
          <div>
            <h3>Alarm: {this.state.alarmData.status}</h3>
            <ValidatorForm
                ref="form"
                name="alarmform"
                onSubmit={ () => this.newAlarm(this.props.history) } >
                <TextValidator
                    floatingLabelText="Latiutude"
                    onChange={this.handleChange}
                    name="latitude"
                    id="latitude"
                    value={alarmData.latitude}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Longitude"
                    onChange={this.handleChange}
                    name="longitude"
                    id="longitude"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={alarmData.longitude}
                />
                <br />
                <RaisedButton
                    type="submit"
                    name="submitbutton"
                    label={
                        (submitted && 'Processing...')
                        || (!submitted && 'New Alarm')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
          </div>
          <div className="common-paper-button-wrapper">
            <RaisedButton label="Update View" onClick={ () => this.updateStatus() }/>
          </div>
        </Paper>
        </div>
      );
    }
  }
}
