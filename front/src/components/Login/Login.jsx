import { useState } from "react";
import { Link } from "react-router-dom";
import validate from "../validate/validate";

function Login({ login }) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({

    });



    const submit = (e) => {
        e.preventDefault();

        if (Object.keys(validate(user)).length === 0) login(user);

    }

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setErrors(validate(
            {
                ...user,
                [e.target.name]: e.target.value
            }
        ));
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
                    className={errors.email && "danger"} />


                <label>password: </label>
                <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleOnChange}
                    className={errors.password && "danger"} />

                <input type="submit" value="enviar" />

            </form>
            <Link to="/singup" >singup</Link>
        </div>
    )
}



export default Login;