import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

export class ConfirmEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmed: true,
        };
    }

    render() {
      if (this.state.confirmed) {
        return (
          <div className="container">
            <Paper className="common-paper" zDepth={1}>
              Thank you for confirming your email. You may now proceed to the
              <br/>
              <b><Link to='/login'>Login</Link></b>
            </Paper>
          </div>
        );
      }
      else {
        return (
          <div className="container">
            <Paper className="common-paper" zDepth={1}>
              Sorry, we could not confirm your account.
              <br/>
              <b>Please call 911 for help.</b>
            </Paper>
          </div>
        );
      }
    }
}
