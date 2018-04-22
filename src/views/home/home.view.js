import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

// import firebase from './firebase';

import './home.view.scss';
// import translations from './login.view.intl';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
      <div className="container">
      Home
          {/* <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder={this.props.intl.formatMessage(translations.placeholder)} onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section> */}
      </div>
    );
  }
}

export default injectIntl(Home);