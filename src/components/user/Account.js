import React from 'react';
import Auth from 'j-toker';
import { RaisedButton, Paper, GridList, GridTile, Avatar } from 'material-ui';

export class Account extends React.Component {
  constructor(props) {
    super(props);
    
    let image_url = Auth.user.image;
    if (!!this.props.location.state) 
        image_url = this.props.location.state.updatedImageURL;
    Auth.user.image = image_url;
  }

  componentWillMount() {
    if (!this.props.user.loggedIn) {
      this.props.history.push('/login');
    }
  }
  
  render() {
    return (
        <div className="container">
            <Paper className="account-paper" zDepth={4}>
                <div id='root'>
                    <div id="first_list">
                      <GridList cols={1} cellHeight={80}>
                          <GridTile rows={1} size={70} className="grid-title">
                            <Avatar size={70} src={ Auth.user.image}  />
                          </GridTile>
                          <GridTile size={30} className="grid-value">
                            <RaisedButton href="/update_image" label="change" />
                          </GridTile>
                      </GridList>
                    </div>
                    <GridList cellHeight={40}>
                        <GridTile className="grid-title"> Name: </GridTile>
                        <GridTile className="grid-value"> {Auth.user.name} </GridTile>
                        <GridTile className="grid-title"> Adresse: </GridTile>
                        <GridTile className="grid-value"> {Auth.user.address} </GridTile>
                        <GridTile className="grid-title"> </GridTile>
                        <GridTile className="grid-value"> {Auth.user.postal_code} {Auth.user.city} </GridTile>
                        <GridTile className="grid-title"> Gender: </GridTile>
                        <GridTile className="grid-value"> {Auth.user.gender} </GridTile>
                        <GridTile className="grid-title"> Age: </GridTile>
                        <GridTile className="grid-value"> {Auth.user.age} </GridTile>
                        <RaisedButton href="/update_profile" label="Update profile" />
                        <RaisedButton href="/reset_password" label="Change password" />
                    </GridList>
                </div>
            </Paper>
        </div>
      );
    }
}
