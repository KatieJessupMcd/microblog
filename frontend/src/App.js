import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar';
import HomePageContainer from './containers/HomePageContainer';
import { Route, Switch, withRouter } from 'react-router-dom';
import uuid from 'uuid';
import BlogDetailsContainer from './containers/BlogDetailsContainer';
import BlogFormContainer from './containers/BlogFormContainer';
import { getOnePost } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    // this.addPost = this.addPost.bind(this);
    // this.removePost = this.removePost.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
    // this.addComment = this.addComment.bind(this);
    // this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this.props.getAllPosts();
  }

  // addPost(postObj) {
  //   postObj.id = uuid();
  //   let posts = [...this.state.posts, postObj];
  //   this.setState({ posts });
  // }

  // removePost(id) {
  //   this.setState({ posts: this.state.posts.filter(post => post.id !== id) });
  // }

  // handleEdit(obj, id) {
  //   let newPosts = this.state.posts.filter(post => post.id !== id);
  //   let editedPost = {
  //     title: obj.title,
  //     description: obj.description,
  //     body: obj.body,
  //     id: id
  //   };
  //   newPosts = [...newPosts, editedPost];
  //   this.setState({ posts: newPosts });
  // }

  // addComment(comment, postId) {
  //   let allPosts = [...this.state.posts];
  //   let postIdx = allPosts.findIndex(post => post.id === postId);

  //   if (allPosts[postIdx].comments) {
  //     let newComments = [...allPosts[postIdx].comments];
  //     newComments.push({ text: comment.comment, id: uuid() });
  //     allPosts[postIdx].comments = newComments;
  //   } else {
  //     allPosts[postIdx].comments = [];
  //     allPosts[postIdx].comments.push({ text: comment.comment, id: uuid() });
  //   }
  //   this.setState({ posts: allPosts });
  // }

  // deleteComment(postId, commentId) {
  //   let allPosts = [...this.state.posts];
  //   let postIdx = allPosts.findIndex(post => post.id === postId);
  //   let allComments = [...allPosts[postIdx].comments];

  //   let newComments = allComments.filter(comment => comment.id !== commentId);
  //   allPosts[postIdx].comments = newComments;
  //   this.setState({ posts: allPosts });
  // }

  render() {
    console.log(' APP RERENDER');

    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <HomePageContainer {...routeProps} />}
          />
          <Route
            exact
            path="/new/"
            render={routeProps => (
              <BlogFormContainer
                {...routeProps}
                addNewPost={this.props.addNewPost}
              />
            )}
          />

          <Route
            exact
            path="/:id"
            render={routeProps => {
              // let post = this.state.posts.find(
              //   post => post.id === routeProps.match.params.id
              // );
              return (
                <BlogDetailsContainer
                  // id={routeProps.match.params.id}
                  key={uuid()}
                  postId={routeProps.match.params.id}
                  editPost={this.props.editPost}
                  {...routeProps}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
