import Login from './views/Login/Login';
import View2 from './views/View2/View2';
import Register from './views/Register/Register';
import { Route, Routes } from 'react-router-dom';
import SpecificClass from './views/SpecificClass/SpecificClass';
import EditClass from './views/EditClass/EditClass';
import UserView from './views/UserView/UserView';
import ClassList from './views/ClassList/ClassList';

function RouterPath() {
    return (
        <Routes>
            <Route path="/" element={<View2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/class-list" element={<ClassList />} />
            <Route
                path="/class-list/:specificClass"
                element={<SpecificClass />}
            />
            <Route
                path="/class-list/edit/:specificClass/"
                element={<EditClass />}
            />
            <Route path="/users/:userName/" element={<UserView />} />
        </Routes>
    );
}

export default RouterPath;
