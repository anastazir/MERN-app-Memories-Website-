import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type:START_LOADING}) // START LOADING

    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
   
    dispatch({ type:END_LOADING}) // END LOADING 
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type:START_LOADING}) // START LOADING

    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    dispatch({ type:END_LOADING}) // END LOADING 
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    dispatch({ type:END_LOADING}) // END LOADING 
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

// GET POST BY ID
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type:START_LOADING}) // START LOADING

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
   
    dispatch({ type:END_LOADING}) // END LOADING 
  } catch (error) {
    console.log(error);
  }
};