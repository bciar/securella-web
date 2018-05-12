import React from 'react';
import Paper from 'material-ui/Paper';

export const VerifyEmail = () => (
  <div className="container">
    <Paper className="common-paper" zDepth={1}>
      We just sent you an email with a verification code.
      <br/>
      <b>Please check your inbox.</b>
    </Paper>
  </div>
);