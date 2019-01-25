import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../App';
import { getAllPosts, addNewPost, editPost } from '../actions';

class AppContainer extends Component {
  render() {
    return <App {...this.props} />;
  }
}

export default connect(
  null,
  { getAllPosts, addNewPost, editPost }
)(AppContainer);
