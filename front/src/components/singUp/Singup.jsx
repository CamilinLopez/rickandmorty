import { useState } from "react";
import { Link } from "react-router-dom";
import validate from "../validate/validate";

function Singup({ singUp }) {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault();

        if (Object.keys(validate(user)).length === 0) singUp(user);

    }

    return (
        <div className="principal">
            <form onSubmit={submit}>
                <label>E-mail: </label>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleOnChange}
                    className="danger" />


                <label>password: </label>
                <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleOnChange}
                    className="dangert" />
                <hr />
                <input type="submit" value="enviar" />
            </form>

            <Link to="/login" >Login</Link>
        </div>
    )
}

export default Singup;