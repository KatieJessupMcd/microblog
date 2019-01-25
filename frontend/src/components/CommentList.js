import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentList extends Component {
  render() {
    if (this.props.comments) {
      return (
        <div className="CommentList">
          <hr />
          <h4>Comments</h4>
          <ul>
            {Object.keys(this.props.comments).map(comment => {
              return (
                <li>
                  <Comment
                    text={this.props.comments[comment].text}
                    commentId={comment}
                    postId={this.props.postId}
                    deleteComment={this.props.deleteComment}
                  />
                </li>
              );
            })}
          </ul>
          <CommentForm
            addNewComment={this.props.addNewComment}
            deleteComment={this.props.deleteComment}
            postId={this.props.postId}
          />
        </div>
      );
    } else {
      return (
        <div>
          <hr />
          <h4>Comments</h4>
          <CommentForm
            addNewComment={this.props.addNewComment}
            deleteComment={this.props.deleteComment}
            postId={this.props.postId}
          />
        </div>
      );
    }
  }
}

export default CommentList;
