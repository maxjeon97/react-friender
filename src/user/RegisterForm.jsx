import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./RegisterForm.css";

const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  hobbies: "",
  interests: "",
  location: "",
  friendRadius: "",
};

/** Component for Register form
 *
 * props:
 * - RegisterUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> RegisterForm
 */
function RegisterForm({ register }) {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  /** updates inputValues. */
  function handleChange(evt) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [evt.target.name]: evt.target.value,
    }));
  }

  /** Calls fn in parent. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(inputValues);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="RegisterForm col-9">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={inputValues.username}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="hobbies">Hobbies</label>
        <input
          type="text"
          name="hobbies"
          value={inputValues.hobbies}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="interests">Interests</label>
        <input
          type="text"
          name="interests"
          value={inputValues.interests}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="location">Location (5-digit Zip Code)</label>
        <input
          type="text"
          name="location"
          value={inputValues.location}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <label htmlFor="friendRadius">Distance From You (in miles)</label>
        <input
          type="text"
          name="friendRadius"
          value={inputValues.friendRadius}
          onChange={handleChange}
          className="RegisterForm-input form-control"
        />
        <button type="submit" className="btn btn-primary RegisterForm-btn">
          Submit
        </button>
      </form>
      {errors.map((e) => <Alert key={uuid()} text={e} type="danger" />)}
    </div>
  );
}

export default RegisterForm;