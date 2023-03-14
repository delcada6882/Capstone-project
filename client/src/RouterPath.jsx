import Login from './views/Login';
import View2 from './views/View2';
import Register from './views/Register';
import Class from './views/Class';
import { Route, Routes } from 'react-router-dom';
import SpecificClass from './views/SpecificClass';
import { createContext, useEffect, useState } from 'react';
import EditClass from './views/EditClass';
import UserView from './views/UserView';
import ProtectedRoutes from './ProtectedRoutes';

function RouterPath() {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState("smelly");

    useEffect(() => {
        // console.log(auth)
        window.localStorage.setItem('auth', auth);
    }, [auth])

    useEffect(() => {
        // console.log(user)
        window.localStorage.setItem('user', user);
    }, [user])

    return (
        <Routes>
            <Route path="/" element={<View2 />} />
            <Route path="/login" element={<Login authSetTest={setAuth} userTest={user} userSetTest={setUser}/>} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes authTest={JSON.parse(window.localStorage.getItem('auth'))} authSetTest={setAuth} userTest={user} userSetTest={setUser}/>}>
                <Route path="/class" element={<Class userTest={(window.localStorage.getItem('user'))} authSetTes={setAuth}/>} />
                <Route
                    path="/class/:specificClass"
                    element={<SpecificClass />}
                />
                <Route
                    path="/class/edit/:specificClass/"
                    element={<EditClass />}
                />
                <Route path="/users/:userName/" element={<UserView />} />
            </Route>
        </Routes>
    );
}

export default RouterPath;
