import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./LoginForm.css";

const INITIAL_STATE = {
    username: '',
    password: ''
};

/** Component for Login form
 *
 * props:
 * - loginUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> LoginForm
 */
function LoginForm({ login }) {
    const [inputValues, setInputValues] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    /** updates inputValues. */
    function handleChange(evt) {
        setInputValues(inputValues => ({
            ...inputValues,
            [evt.target.name]: evt.target.value
        }));
    }

    /** Calls fn in parent. */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(inputValues);
            navigate('/');
        } catch (err) {
            setErrors(err);
        }
    }

    return (
        <div className="LoginForm col-2">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name='username'
                    value={inputValues.username}
                    onChange={handleChange}
                    className="LoginForm-input form-control"
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name='password'
                    value={inputValues.password}
                    onChange={handleChange}
                    className="LoginForm-input form-control"
                />
                <button type='submit' className="btn btn-primary LoginForm-btn">
                    Submit
                </button>
            </form>
            {errors.map(e =>
                <Alert key={uuid()} text={e} type='danger' />
            )}
        </div>

    );

}

export default LoginForm;