import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT, FECTH_BY_USER_ID } from '../constants/actionTypes';

export default (state = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts:action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    // FOR SEARCH
    case FETCH_BY_SEARCH:
      // console.log(action.payload);
      return {
        ...state,
        posts:action.payload
      }
      // GET POSTS BY USER ID
    case FECTH_BY_USER_ID:
      return { 
      ...state,
      posts:action.payload
      }
    case FETCH_POST:
      return {
        ...state,
        post:action.payload
      }  
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    // TOGGLE LOADING 
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    // ADDING A COMMENT TO  A POST
    case COMMENT:
      return{...state,
      posts:state.posts.map((post)=>{
        // CHANGE THE POST THAT JUST RECEIVED A COMMENT
        if(post._id=== action.payload._id) return action.payload
        // RETURN ALL THE POSTS NORMALLY
        return post
      })
    }
    default:
      return state;
  }
};

