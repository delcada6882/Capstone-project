import Header from "../components/Header";
import './register.scss'
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"

function Register() {
    return (
        <div className="login">
            {/* <Logo /> */}
            <h1>Register</h1>
            <form>
                <div className="inputSection">
                    <label>Email: </label>
                    <input required type={'email'} name="email"></input>
                </div>
                <div className="inputSection">
                    <label>Password: </label>
                    <input required type={'password'} name="password"></input>
                </div>
                
                <button>Register</button>
            </form>
            <p>Have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register