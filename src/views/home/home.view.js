import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';

import Header from '../../common/components/Header/Header';
import Button from '../../common/components/Button/Button';

// import firebase from './firebase';

import './home.view.scss';
import { Bind } from 'lodash-decorators';
import { SIGN_IN } from '../../common/consts/routes';
// import translations from './login.view.intl';

@injectIntl
@inject('authStore')
@observer
class Home extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @Bind()
  onTrySignOut() {
    const { authStore, history } = this.props;
    authStore.signOut().then(()=> {
      history.push(SIGN_IN);
    }).catch(() => {
      console.log('nie zostałeś wylogowny');
    });
  }

//   componentDidMount() {
//     const itemsRef = firebase.database().ref('items');
//     itemsRef.on('value', (snapshot) => {
//       let items = snapshot.val();
//       let newState = [];
//       for (let item in items) {
//         newState.push({
//           id: item,
//           title: items[item].title,
//           user: items[item].user
//         });
//       }
//       this.setState({
//         items: newState
//       });
//     });
//   }

//   handleChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const itemsRef = firebase.database().ref('items');
//     const item = {
//       title: this.state.currentItem,
//       user: this.state.username
//     }
//     itemsRef.push(item);
//     this.setState({
//       currentItem: '',
//       username: ''
//     });
//   }

  render() {
    return (
      <div className="home-wrapper">
        <Header />
        <Button buttonStyle="button-primary" onClick={this.onTrySignOut} >Sign out</Button>
      </div>
    );
  }
}

export default Home;