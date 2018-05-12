import React, { Component } from 'react';
import { darkBaseTheme, MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Home } from './components/Home.js';
import { Head } from './components/Header.js';
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Auth from 'j-toker';
import { setLoginState } from './actions/userActions.js';
import { setLoadState } from './actions/appActions.js';

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {status: REQUEST}
  }

  componentWillMount() {
    Auth.validateToken()
      .then(function(user) {
        this.props.setLoginState(true);
        this.props.setLoadState(true);
      }.bind(this))
      .fail(function(user) {
        this.props.setLoadState(true);
      }.bind(this))
    this.setState({status: SUCCESS});
  }

  renderSpinner() {
    return ('Loading...')
  }

  renderApp() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <Head user={this.props.user} app={this.props.app}/>
        <Home user={this.props.user} app={this.props.app}/>
      </div>
      </MuiThemeProvider>
    );
  }

  render() {
    return this.state.status === REQUEST ? this.renderSpinner() : this.renderApp()
  }
};

const mapStateToProps = (state) => {
  return {
      user: state.user,
      app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginState: (loggedInState) => {
            dispatch(setLoginState(loggedInState));
        },
        setLoadState: (loadState) => {
          dispatch(setLoadState(loadState));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
