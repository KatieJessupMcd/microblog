import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlogDetails from '../components/BlogDetails';
import {
  removePost,
  editPost,
  addComment,
  deleteComment,
  getOnePost
} from '../actions';

class BlogDetailsContainer extends Component {
  render() {
    return (
      <BlogDetails
        {...this.props}
        post={this.props.post}
        postId={this.props.postId}
        editPost={this.props.editPost}
        getOnePost={this.props.getOnePost}
        removePost={this.props.removePost}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts[ownProps.postId]
  };
}

export default connect(
  mapStateToProps,
  { removePost, editPost, deleteComment, addComment, getOnePost }
)(BlogDetailsContainer);
