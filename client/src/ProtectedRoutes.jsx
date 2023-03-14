import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoutes(props) {
    const newThing = props.authTest
    console.log(newThing)
    return(
        props.authTest ?  <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes