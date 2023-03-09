import Login from "./views/Login";
import View2 from "./views/View2";
import Register from "./views/Register";
import Class from "./views/Class"
import { Route, Routes } from "react-router-dom";
import SpecificClass from "./views/SpecificClass";
import { useState } from "react";
import EditClass from "./views/EditClass";
import UserView from "./views/UserView";


function RouterPath() {
    return (
      <Routes>
        <Route path="/" element={<View2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/class" element={<Class /> } />
        <Route path="/class/:specificClass" element={<SpecificClass />} />
        <Route path="/class/edit/:specificClass/" element={<EditClass />} />
        <Route path="/users/:userName/" element={<UserView />} />


      </Routes>
    );
};

export default RouterPath
