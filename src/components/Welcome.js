import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Paper} from 'material-ui';

export class Welcome extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
          username: ''
        };
    }

    renderApp() {
        if (this.props.user.loggedIn) { 
          return <Redirect to='/dashboard' />; 
        }
        else {
            return (
                <div className="container">
                    <Paper className="common-paper">
                        <h1>Welcome to Securella</h1>
                        <p>
                          <Link to='/signup'>Register</Link> if you are new here.
                          <Link to='/login'>Login</Link> if you already have an account.
                        </p>
                    </Paper>
                </div>
            );
        }
    }

    render() {
        return this.props.app.loaded ? this.renderApp() : ('Loading...')
    }
}
