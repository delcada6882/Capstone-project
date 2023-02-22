import Header from "../components/Header";
import './login.scss'
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"

function Login() {
    return (
        <div className="login">
            {/* <Logo /> */}
            <h1>Login</h1>
            <form>
                <div className="inputSection">
                    <label>Email: </label>
                    <input required type={'email'} name="email"></input>
                </div>
                <div className="inputSection">
                    <label>Password: </label>
                    <input required type={'password'} name="password"></input>
                </div>

                <div className="inputSectionCheck">
                    <input type={'checkbox'} id='staySignedIn'></input>
                    <label htmlFor ='staySignedIn'>Remember me?</label>
                </div>
                
                <button>Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Make one</a></p>
        </div>
    );
};

export default Login