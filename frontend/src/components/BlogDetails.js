import React, { Component } from 'react';
import { CardBody, Card, CardText, CardTitle } from 'reactstrap';
import BlogFormContainer from '../containers/BlogFormContainer';
import CommentList from './CommentList';

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.props.getOnePost(this.props.postId);
  }

  handleRemove() {
    this.props.removePost(this.props.postId);
    console.log('we are going to push to history now');
    console.log('this.props.history.push ', this.props.history);
    this.props.history.replace('/');
  }

  toggleEdit() {
    // this.props.handleEdit(this.state);
    this.setState({
      isEdited: true
    });
  }

  render() {
    // debugger;
    if (!this.props.post) {
      return <h3>Loading</h3>;
    }
    if (this.state.isEdited) {
      return (
        <BlogFormContainer
          postId={this.props.postId}
          title={this.props.post.title}
          description={this.props.post.description}
          body={this.props.post.body}
          editPost={this.props.editPost}
        />
      );
    } else {
      console.log(this.props);
      return (
        <section>
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                {this.props.post.title}
                <span>
                  <button onClick={this.handleRemove}>
                    <i className="fas fa-trash-alt" />
                  </button>
                  <button onClick={this.toggleEdit}>
                    <i className="far fa-edit" />
                  </button>
                </span>
              </CardTitle>
              <CardText className="font-italic">
                {this.props.post.description}
              </CardText>
              <CardText>{this.props.post.body}</CardText>
            </CardBody>
          </Card>
          <CommentList
            postId={this.props.postId}
            addComment={this.props.addComment}
            deleteComment={this.props.deleteComment}
            comments={this.props.post.comments}
          />
        </section>
      );
    }
  }
}

export default BlogDetails;
