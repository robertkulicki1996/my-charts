import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import { observer } from 'mobx-react';
import { noop } from 'lodash';

import './CustomModal.scss';

@observer
class CustomModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    effect: PropTypes.oneOf(['fadeInDown', 'fadeInUp','fadeInLeft', 'fadeInRight']),
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node,
    isFooter: PropTypes.bool,
    buttonRight: PropTypes.node,
    buttonLeft: PropTypes.node
  }

  static defaultProps = {
    visible: false,
    width: 400,
    height: 400,
    effect: 'fadeInDown',
    onClose: noop,
    children: '',
    isFooter: false,
    buttonRight: '',
    buttonLeft: ''
  };

  render() {
    const { visible, width, height, effect, onClose, title, children, isFooter, buttonRight, buttonLeft } = this.props;
     return (
      <Modal
        visible={visible} 
        width={width}
        height={height}
        effect={effect}
        onClickAway={onClose}
      >
        <div className="custom-modal">
          <div className="custom-modal__header">
            <div className="title">{title}</div>
            <div role="button" onClick={onClose} className="close-button">&#x2716;</div>
          </div>
          <div className="custom-modal__body">{children}</div>
          {isFooter && (
            <div className="custom-modal__footer">
              {buttonLeft}
              {buttonRight}
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

export default CustomModal;