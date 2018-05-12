import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

export const ResetPasswordSuccess = () => (
  <div className="container">
    <Paper className="common-paper" zDepth={1}>
      <h1>You are updated your password</h1>
      <p>
        <Link to='/login'>Login</Link>&nbsp;&nbsp;here now.
      </p>
    </Paper>
  </div>
);