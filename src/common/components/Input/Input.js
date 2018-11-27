import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, isString } from 'lodash';

import './Input.scss';

class Input extends Component {
  static propTypes = {
    /**
     * Styling classes
     */
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    /**
     * Disabled property, properly styling input
     */
    disabled: PropTypes.bool,
    /**
     * Error message or boolean (if true, only border will be shown)
     */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * onChange callback, should be properly bound to current view.
     * Noop by default
     */
    onChange: PropTypes.func,
    /**
     * Required property
     */
    required: PropTypes.bool,
    /**
     * Type of input field
     */
    type: PropTypes.oneOf(['text', 'password', 'number', 'email']),
    /**
     * Initial value
     */
    value: PropTypes.string,
    /**
     * Input placeholder
     */
    placeholder: PropTypes.string,
    /**
     * Determines if input should be read-only
     */
    readonly: PropTypes.bool,
    /**
     * Determines if input should have border rendered
     */
    displayBorder: PropTypes.bool,
    /**
     * Textarea component
     */
    textarea: PropTypes.bool,
    /**
     * Textarea rows number
     */
    rows: PropTypes.number,
    /**
     * Textarea cols number
     */
    cols: PropTypes.number,
    /**
     * onChange callback for textarea, should be properly bound to current view.
     * Noop by default
     */
    onTextareaChange: PropTypes.func,
  };
  
  static defaultProps = {
    className: '',
    inputClassName: '',
    disabled: false,
    error: '',
    onChange: noop,
    required: false,
    readonly: false,
    type: 'text',
    value: '',
    placeholder: '',
    displayBorder: true,
    textarea: false,
    rows: 0,
    cols: 0,
    onTextareaChange: noop,
  };


  render() {
    const {
      className,
      inputClassName,
      disabled,
      error,
      onChange,
      readonly,
      required,
      type,
      value,
      placeholder,
      displayBorder,
      textarea,
      rows, 
      cols,
      onTextareaChange,
    } = this.props;

    return textarea === false ? (
      <div className={`input-container ${className}`} >
        <input
          className={`input ${inputClassName} ${displayBorder ? 'bordered' : ''}`}
          type={type}
          disabled={disabled}
          required={required}
          onChange={onChange}
          readOnly={readonly}
          value={value}
          placeholder={placeholder}
        />
        {(error && isString(error)) ? <span>{error}</span> : null }
      </div>
    ) : (
      <textarea 
        rows={rows}
        cols={cols}
        value={value}
        onChange={onTextareaChange}
      />
    )
  }
};

export default Input;