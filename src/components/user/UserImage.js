import React from 'react';
import Auth from 'j-toker';
import $ from 'jquery';
import ApiURL from '../../apiClient';
import { Paper, RaisedButton, Dialog } from 'material-ui';

export class UserImage extends React.Component {
      state = {
          selecteduserCoverFiles: [],
          submitFormProgress: 0,
          isSubmittingForm: false,
          didFormSubmissionComplete: false,
          user: {
            id: Auth.user.email,
            errors: {}
          },
          errorMsg: ''
      };

      getNumberOfSelectedFiles() {
        return this.state.selecteduserCoverFiles.filter(el => {
          return el._destroy !== true;
        }).length;
      }

      handleDlgClose = () => {
        this.setState({ error: '' });
      }

      handleuserCoversChange = () => {
          let selectedFiles = this.userCoversField.files;
          let { selecteduserCoverFiles } = this.state;
          for (let i = 0; i < selectedFiles.length; i++) {
              selecteduserCoverFiles.push(selectedFiles.item(i));
          }
          this.setState( { selecteduserCoverFiles: selecteduserCoverFiles },
            () => { this.userCoversField.value = null; } );
      }

      handleCancel = () => {
          this.props.history.push('/account');
      }

      render() { 
        const dlg_actions = [
            <RaisedButton
              label="Ok"
              onClick={this.handleDlgClose}
              className="btn btn-default"
            />
          ];
        return (
          <div className="container">
              <Paper className="common-paper" zDepth={4}>
                <div className="userForm">
                  <form>
                      <div className="form-group">
                        {this.renderUploadCoversButton()}
                        {this.renderSelecteduserCoverFiles()}
                      </div>
                      {this.renderUploadFormProgress()}
                      <RaisedButton
                        disabled={this.state.isSubmittingForm}
                        onClick={e => this.handleFormSubmit()}
                        className="btn btn-primary">
                        {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
                      </RaisedButton>
                      &nbsp;
                      <RaisedButton
                        disabled={this.state.isSubmittingForm}
                        onClick={e => this.handleCancel()}
                        className="btn btn-default">
                        Cancel
                      </RaisedButton>
                  </form>
                  <br />
                </div>
              </Paper>
              <Dialog
                modal={false}
                open={!!this.state.error}
                onRequestClose={this.handleDlgClose}
                title="Warning"
                contentStyle={{ width: '400px', 'maxWidth': 'none' }}
                actions={dlg_actions}>{this.state.error}</Dialog>
          </div>
        );
      }

      renderUploadCoversButton = () => {
        let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
        return (
          <div>
            <input
              name="covers[]"
              ref={field => (this.userCoversField = field)}
              type="file"
              disabled={this.state.isSubmittingForm}
              multiple={false}
              accept="image/*"
              required={true}
              style={{
                width: 0.1,
                height: 0.1,
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute',
                zIndex: -1
              }}
              id="images"
              onChange={e => this.handleuserCoversChange(e)}
              className="form-control"
            />
            <label
              disabled={this.state.isSubmittingForm}
              className="btn btn-success"
              htmlFor="images">
              <span className="glyphicon glyphicon-cloud-upload" />
              &nbsp; &nbsp;
              { 
                numberOfSelectedCovers === 0
                ? 'click here to uplaod Files'
                : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                  ? 's'
                  : ''} selected`
              }
            </label>
          </div>
        );
      }

      renderSelecteduserCoverFiles = () => {
        let fileDOMs = this.state.selecteduserCoverFiles.map((el, index) => {
          if (el._destroy) {
            return null;
          }

          return (
            <li key={index}>
              <div className="photo">
                <img
                  width={150}
                  src={el.id ? el.url : URL.createObjectURL(el)}
                  style={{ alignSelf: 'center' }}
                  alt = "pic user"
                />
                <div
                  className="remove"
                  onClick={() => this.removeSelecteduserCoverFile(el, index)}>
                  <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
                </div>
              </div>
              <div className="file-name">
                {el.name}
              </div>
            </li>
          );
        });

        return (
          <ul className="selected-covers">
            {fileDOMs}
          </ul>
        );
      }

      renderUploadFormProgress = () => {
        if (this.state.isSubmittingForm === false) {
          return null;
        }

        return (
          <div className="progress">
            <div
              className={
                'progress-bar progress-bar-info progress-bar-striped' +
                (this.state.submitFormProgress < 100 ? 'active' : '')
              }
              role="progressbar"
              aria-valuenow={this.state.submitFormProgress}
              areavaluemin="0"
              areavaluemax="100"
              style={{ width: this.state.submitFormProgress + '%' }}>
              {this.state.submitFormProgress}% Complete
            </div>
          </div>
        );
      }

      removeSelecteduserCoverFile = (cover, index) => {
        let { selecteduserCoverFiles } = this.state;
        if (cover.id) {
          selecteduserCoverFiles[index]._destroy = true;
        } else {
          selecteduserCoverFiles.splice(index, 1);
        }

        this.setState({
          selecteduserCoverFiles: selecteduserCoverFiles
        });
      }

      buildFormData = () => {
        let formData = new FormData();
        let { selecteduserCoverFiles } = this.state;
        let file = selecteduserCoverFiles[0];
        formData.append(
          `user[image]`,
          file,
          file.name
        );
        return formData;
      }

      submitForm = () => {
        $.ajax ({
          url: ApiURL("user/image"),
          type: "POST",
          data: this.buildFormData(),
          processData: false,
          contentType: false,
          success: function(data) {
            this.setState({ didFormSubmissionComplete: true });
            this.props.history.push('/account', {updatedImageURL: data.image});
          }.bind(this)
        });
      }

      handleFormSubmit = () => {
          const { selecteduserCoverFiles } = this.state;
          if (selecteduserCoverFiles.length > 0) {
                let { user } = this.state;
                user.errors = {};
                this.setState(
                  {
                    isSubmittingForm: true,
                    user: user
                  },
                  () => {
                    this.submitForm();
                  }
              );
          }
          else {
            this.setState({ error: 'Please choose a photo.'});
          }
      }
  }
