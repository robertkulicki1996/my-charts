import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import './FileInput.scss';

@observer
class FileInput extends Component {
  @observable buttonName = 'Import CSV file';
  @observable fileNameColor = '#cadaed';

  @action.bound
  handleChange(event) {
    // User cancelled
    if (!event.target.files[0]) {
      return
    }
    console.log(event.target.files[0]);
    this.buttonName = event.target.files[0].name;
    this.fileNameColor = '#4cff4c';
  }

  render() {
    const textColor = {
      color: this.fileNameColor
    }
    return (
      <React.Fragment>
        <div class="upload-btn">
          <button class="btn" style={textColor}>{this.buttonName}</button>
          <input type="file" name="myfile" onChange={this.handleChange}/>
        </div>
      </React.Fragment>
    );
  }
}

export default FileInput;