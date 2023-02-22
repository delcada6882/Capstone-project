import { useState } from "react";

function Header() {
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState("Admin")
    return(
        <header>
            <div className="left">
                ADHD-DW :&#40;
            </div>
            <div className="left">
                <a href="/about">About</a>
                <a href="/about">Contact</a>
                <a href="/about"></a>
                <a href="/about">about</a>
                {isAuth ? <p className="userName">{user}</p> : <a href="/login">not signed in</a>}
            </div>
        </header>
    );
}

export default Header