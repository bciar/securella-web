import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  appbar: {
    background: '#393'
  }
}

const PublicNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
    <FlatButton label="Home" containerElement={<Link to='/'>Home</Link>}/>
    <FlatButton label="Login" containerElement={<Link to='/login'>login</Link>}/>
    <FlatButton label="Register" containerElement={<Link to='/signup'>signup</Link>}/>
  </ToolbarGroup>
);

const MyNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
    <FlatButton label="Dashboard" containerElement={<Link to='/dashboard'>Dashboard</Link>}/>
    <FlatButton label="My Account" containerElement={<Link to='/account'>account</Link>}/>
    <FlatButton label="Logout" containerElement={<Link to='/logout'>logout</Link>}/>
  </ToolbarGroup>
);

const EmptyNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
  </ToolbarGroup>
);

export const Head = ({ app, user }) => {
    if (app.loaded) {
        if (user.loggedIn) {
            return ( 
              <AppBar title="SEON" 
                      style={styles.appbar} 
                      showMenuIconButton={false} 
                      iconElementRight={<MyNavLinks />} 
              /> 
            );
        }
        else {
            return ( 
              <AppBar title="SEON" 
                      style={styles.appbar} 
                      showMenuIconButton={false} 
                      iconElementRight={<PublicNavLinks />} 
              /> 
            );
        }
    }
    else {
        return ( 
            <AppBar title="SEON" 
                    style={styles.appbar} 
                    showMenuIconButton={false} 
                    iconElementRight={<EmptyNavLinks />} 
            /> 
        );
    }
}