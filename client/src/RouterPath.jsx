import Login from "./views/Login";
import View2 from "./views/View2";
import Register from "./views/Register";
import Class from "./views/Class"
import { Route, Routes } from "react-router-dom";


function RouterPath() {
    return (
      <Routes>
        <Route path="/" element={<View2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/class" element={<Class /> } />
      </Routes>
    );
};

export default RouterPath
