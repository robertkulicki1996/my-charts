import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import onClickOutside from 'react-onclickoutside';
import { noop } from 'lodash-decorators';

const modalRoot = document.getElementById('modal-root');

@observer
class ContextMenu extends Component {
  static propTypes = {
    onClose: PropTypes.func
  }

  static defaultProps = {
    onClose: noop
  }

  constructor(props) {
    super(props);
    this.element = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.element);
  }

  handleClickOutside = () => {
    this.props.onClose();
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.element,
    );
  }
}

export default onClickOutside(ContextMenu);