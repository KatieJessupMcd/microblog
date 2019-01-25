import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  LOAD_ALL_POSTS,
  SHOW_ERR,
  GOT_ONE_POST
} from './actionTypes';
import uuid from 'uuid/v4';
import _ from 'lodash';

const DEFAULT_STATE = {
  posts: {
    [uuid()]: {
      title: 'the best title',
      body: 'textHURR',
      description: 'thebest',
      comments: { [uuid()]: { text: 'commentText' } }
    }
  },
  error: false
};

function rootReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_POST: {
      let newPost = action.payload;
      newPost.comments = {};
      // let copiedPosts = JSON.parse(JSON.stringify(state.posts));
      let copiedPosts = _.cloneDeep(state.posts);
      copiedPosts[newPost.id] = newPost;
      return { posts: copiedPosts };
    }
    case LOAD_ALL_POSTS: {
      let allPosts = action.payload;
      return { posts: allPosts };
    }
    case REMOVE_POST: {
      let removedPostId = action.payload;
      let copiedPosts = _.cloneDeep(state.posts);
      delete copiedPosts[removedPostId];
      return { posts: copiedPosts };
    }
    case EDIT_POST: {
      let { postObj } = action.payload;
      let copiedPosts = _.cloneDeep(state.posts);
      let { id, ...rest } = postObj;
      copiedPosts[postObj.id] = rest;
      return { posts: copiedPosts };
    }
    case ADD_COMMENT: {
      let { commentObj, postId } = action.payload;
      let copiedPosts = _.cloneDeep(state.posts);
      copiedPosts[postId].comments[uuid()] = { text: commentObj.comment };
      return { posts: copiedPosts };
    }
    case DELETE_COMMENT: {
      let { commentId, postId } = action.payload;
      let copiedPosts = _.cloneDeep(state.posts);
      delete copiedPosts[postId].comments[commentId];
      return { posts: copiedPosts };
    }
    case GOT_ONE_POST: {
      let post = action.payload;
      let copiedPosts = _.cloneDeep(state.posts);
      copiedPosts[post.id] = post;
      return { posts: copiedPosts };
    }
    case SHOW_ERR: {
      return { ...state, error: true };
    }
    default:
      return state;
  }
}

export default rootReducer;
