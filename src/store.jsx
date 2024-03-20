// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  video: {
    currentTime: 0
  },
  comments: []
};

// Create a slice for managing video state
const videoSlice = createSlice({
  name: 'video',
  initialState: initialState.video,
  reducers: {
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    }
  }
});

// Create a slice for managing comments
const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState.comments,
  reducers: {
    addComment(state, action) {
      state.push(action.payload);
    }
  }
});

// Combine reducers
const reducer = {
  video: videoSlice.reducer,
  comments: commentsSlice.reducer
};

// Export actions
export const { setCurrentTime } = videoSlice.actions;
export const { addComment } = commentsSlice.actions;


// Create store
const store = configureStore({
  reducer
});

export default store;
