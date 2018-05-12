import React, { Component } from 'react';
import {Switch, Route}      from 'react-router-dom';

import {Welcome}    from './Welcome.js';
import {Dashboard}  from './Dashboard.js';

import {SignUp}       from './user/Sign_up.js';
import {VerifyEmail}  from './user/VerifyEmail.js';
import {ConfirmEmail} from './user/ConfirmEmail.js';
import {SignIn}       from './user/Sign_in.js';
import {SignOut}      from './user/Sign_out.js';

import {RequestPasswordReset}   from './user/RequestPasswordReset.js';
import {RequestPasswordSuccess} from './user/RequestPasswordSuccess.js';
import {ResetPassword}          from './user/ResetPassword.js';
import {ResetPasswordSuccess}   from './user/ResetPasswordSuccess.js';

import {Account}       from './user/Account.js';
import {UpdateProfile} from './user/UpdateProfile.js';
import {UserImage}     from './user/UserImage.js';

export class Home extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/'               render={(props) => ( <Welcome   {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/dashboard'      render={(props) => ( <Dashboard {...props} user={this.props.user} app={this.props.app} /> )} />

          <Route exact path='/signup'         render={(props) => ( <SignUp       {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/confirm'        render={(props) => ( <ConfirmEmail {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/verify'         render={(props) => ( <VerifyEmail  {...props} user={this.props.user} app={this.props.app} /> )} />

          <Route exact path='/login'          render={(props) => ( <SignIn  {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/logout'         render={(props) => ( <SignOut {...props} user={this.props.user} app={this.props.app} /> )} />

          <Route exact path='/request_password_reset'   render={(props) => ( <RequestPasswordReset   {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/request_password_success' render={(props) => ( <RequestPasswordSuccess {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/reset_password'           render={(props) => ( <ResetPassword          {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/reset_password_success'   render={(props) => ( <ResetPasswordSuccess   {...props} user={this.props.user} app={this.props.app} /> )} />

          <Route exact path='/account'        render={(props) => ( <Account        {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/update_profile' render={(props) => ( <UpdateProfile  {...props} user={this.props.user} app={this.props.app} /> )} />
          <Route exact path='/update_image'   render={(props) => ( <UserImage      {...props} user={this.props.user} app={this.props.app} /> )} />
        </Switch>
      </div>
    );
  }
}
