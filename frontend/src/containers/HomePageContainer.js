import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { addNewPost, getAllPosts } from '../actions';

class HomePageContainer extends Component {
  render() {
    return <HomePage getAllPosts={getAllPosts} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(HomePageContainer);
