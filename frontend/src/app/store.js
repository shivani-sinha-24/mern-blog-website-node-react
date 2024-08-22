import { configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';  

// import reducers
import userDataReducer from "../reducers/userDataSlice";
import allBlogsReducer from "../reducers/allBlogsSlice";

const store = configureStore({
    reducer: {
        userDataReducer,
        allBlogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

export default store;
