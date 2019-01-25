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
import axios from 'axios';

const POSTS_URL = 'http://localhost:5000/api/posts';

export function showErr(msg) {
  return { type: 'SHOW_ERR', msg };
}

export function getAllPosts() {
  return async function(dispatch) {
    try {
      const res = await axios.get(POSTS_URL);
      const posts = res.data;

      const postsObj = posts.reduce((accumulator, post) => {
        const { id, ...rest } = post;
        accumulator[post.id] = rest;
        accumulator[post.id].comments = {};
        return accumulator;
      }, {});
      dispatch(gotAllPosts(postsObj));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

function gotAllPosts(posts) {
  return { type: LOAD_ALL_POSTS, payload: posts };
}

export function addNewPost(postObj) {
  return async function(dispatch) {
    try {
      let { body, description, title } = postObj;
      const res = await axios.post(POSTS_URL, { title, body, description });
      dispatch(addPost(res.data));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

export function addPost(postObj) {
  return {
    type: ADD_POST,
    payload: postObj
  };
}

export function removePost(postId) {
  return async function(dispatch) {
    console.log('THIS IS THE POSTID ', postId);
    try {
      await axios.delete(`${POSTS_URL}/${postId}`);
      dispatch(removeOnePost(postId));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

export function removeOnePost(postId) {
  return {
    type: REMOVE_POST,
    payload: postId
  };
}

export function editPost(postObj, postId) {
  return async function(dispatch) {
    // console.log
    try {
      let { body, description, title } = postObj;
      const res = await axios.put(`${POSTS_URL}/${postId}`, {
        title,
        body,
        description
      });
      console.log('putres', res);
      dispatch(editedPost(res.data));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

export function editedPost(postObj, postId) {
  return {
    type: EDIT_POST,
    payload: { postObj, postId }
  };
}

export function addNewComment(commentObj, postId) {
  return async function(dispatch) {
    try {
      console.log('commentObj ', commentObj);
      const res = await axios.post(
        `${POSTS_URL}/${postId}/comments`,
        commentObj
      );
      dispatch(addComment(res.data, postId));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

export function addComment(commentObj, postId) {
  return {
    type: ADD_COMMENT,
    payload: { commentObj, postId }
  };
}

export function deleteComment(commentId, postId) {
  return async function(dispatch) {
    try {
      await axios.delete(`${POSTS_URL}/${postId}/comments/${commentId}`);
      dispatch(deleteOneComment(commentId, postId));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

export function deleteOneComment(commentId, postId) {
  return {
    type: DELETE_COMMENT,
    payload: { commentId, postId }
  };
}

export function getOnePost(postId) {
  return async function(dispatch) {
    try {
      console.log('get one post rerendered');
      const res = await axios.get(`${POSTS_URL}/${postId}`);
      dispatch(gotOnePost(res.data));
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch(showErr(errorMessage));
    }
  };
}

function gotOnePost(posts) {
  return {
    type: GOT_ONE_POST,
    payload: posts
  };
}
