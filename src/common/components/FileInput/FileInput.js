import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './FileInput.scss';

@observer
class FileInput extends Component {
  static propTypes = {
    buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isFileLoading: PropTypes.bool.isRequired,
    isFileParsed: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    buttonContent: 'Import CSV file',
  }

  render() {
    const textColor = {
      color: this.props.isFileParsed ? '#4cff4c' : '#cadaed' 
    }

    return (
      <React.Fragment>
        <div className="upload-btn">
          <button className="btn" style={textColor}>{this.props.buttonContent}</button>
          <input type="file" name="myfile" accept=".csv" onChange={this.props.onChange}/>
        </div>
      </React.Fragment>
    );
  }
}

export default FileInput;