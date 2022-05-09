import React, { useEffect } from "react";
import { Registration } from "./modules/authorization/pages/Registration";
import { Login } from "./modules/authorization/pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { WrapperComponents } from "common/components";
import { Posts } from "./modules/posts/pages/Posts";
import { PostView } from "./modules/posts/pages/Post";
import { AddPost } from "modules/posts/pages/AddPost";
import { Profile } from "modules/authorization/pages/Profile";
import { RequireAuth } from "common/hooks/RequireAuth";
import { useAppSelector } from "core/redux/hooks";


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/" element={<WrapperComponents />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="posts/addPost" element={<AddPost />} />
            <Route path="posts/addPost/:id" element={<AddPost />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
