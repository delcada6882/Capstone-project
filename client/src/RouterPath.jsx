import Login from "./views/Login";
import View2 from "./views/View2";
import Register from "./views/Register";
import { Route, Routes } from "react-router-dom";


function RouterPath() {
    return (
      <Routes>
        <Route path="/" element={<View2 />} />
        <Route default path="/login" element={<Login />} />
        <Route default path="/register" element={<Register />} />

      </Routes>
    );
};

export default RouterPath
