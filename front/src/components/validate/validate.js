export default function validate(user) {
    let errors = {};
    if (!user.email) errors.email = "E-mail is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = "E-mail is invalid";

    if (!user.password) errors.password = "Password is required";
    else if (!/(?=.*[0-9])/.test(user.password)) errors.password = "Password is invalid";

    return errors;

}