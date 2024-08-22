import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

// pages
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Homepage from "./pages/homepage/Homepage";
import BlogPage from "./pages/blogpage/BlogPage";
import CreateNewBlog from "./pages/createNewBlog/CreateNewBlog";
import NoPage from "./pages/noPage/NoPage";

// components
import Layout from "./components/layout/Layout";

// thunks
import { fetchAllBlogs } from './reducers/allBlogsSlice';
import { fetchUserData } from "./reducers/userDataSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);
  const [reload, setReload] = useState(false);

  const token = JSON.parse(localStorage.getItem("blogUser"));

  useEffect(() => {
    if (token) {
      // Fetch user data using thunk
      dispatch(fetchUserData(token))
        .unwrap()
        .then(() => {
          setIsUserLoggedin(true);
        })
        .catch(() => {
          setIsUserLoggedin(false);
        });
    } else {
      setIsUserLoggedin(false);
    }

    // Fetch blogs using thunk
    dispatch(fetchAllBlogs());

  }, [reload, token, dispatch, window?.location?.pathname]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="login" element={
          <Login
            isUserLoggedin={isUserLoggedin}
            setIsUserLoggedin={setIsUserLoggedin}
          />
        } />
        <Route path="signup" element={
          <Signup
            isUserLoggedin={isUserLoggedin}
            setIsUserLoggedin={setIsUserLoggedin}
          />
        } />
        <Route path="/" element={
          <Layout
            isUserLoggedin={isUserLoggedin}
            setIsUserLoggedin={setIsUserLoggedin}
          />
        }>
          <Route index element={
            <Homepage
              reload={reload}
              setReload={setReload}
              blogs={useSelector(state => state?.allBlogsReducer?.blogs)} // Use blogs from the state

            />
          } />
          <Route path="blog/:blogId" element={
            <BlogPage
              reload={reload}
              setReload={setReload}
              isUserLoggedin={isUserLoggedin}
              setIsUserLoggedin={setIsUserLoggedin}
            />
          } />
          <Route path="/create-new-blog" element={
            <CreateNewBlog
              reload={reload}
              setReload={setReload}
            />
          } />
          <Route path="/edit-blog/:blogId" element={
            <BlogPage
              reload={reload}
              setReload={setReload}
              isUserLoggedin={isUserLoggedin}
              setIsUserLoggedin={setIsUserLoggedin}
            />
          } />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
