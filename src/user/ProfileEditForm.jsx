import { useContext, useState } from "react";
import userContext from "./userContext";
import Alert from "../common/Alert";
import { v4 as uuid } from 'uuid';
import "./ProfileEditForm.css";

/** Component for Profile edit form
 *
 * props:
 * - updateUser(): fn to call in parent
 *
 * State: inputValues
 *
 * App -> ProfileEditForm
 */
function ProfileEditForm({ updateUser }) {
  const { user } = useContext(userContext);
  const [inputValues, setInputValues] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    hobbies: user.hobbies,
    interests: user.interests,
    location: user.location,
    friendRadius: user.friendRadius,
  });
  const [alerts, setAlerts] = useState([]);

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
      await updateUser(inputValues);
      setAlerts([{ text: 'Updated succesfully.', type: 'success' }]);
    } catch (err) {
      setAlerts(err.map(e => ({ text: e, type: 'danger' })));
    }
  }

  return (
    <div className="ProfileEditForm col-12">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name='username'
          value={inputValues.username}
          disabled
          className="ProfileEditForm-input form-control"
        />
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name='firstName'
          value={inputValues.firstName}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
          />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name='lastName'
          value={inputValues.lastName}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
        />
        <label htmlFor="hobbies">Hobbies</label>
        <input
          id="hobbies"
          type="hobbies"
          name='hobbies'
          value={inputValues.hobbies}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
        />
        <label htmlFor="interests">Interests</label>
        <input
          id="interests"
          type="interests"
          name='interests'
          value={inputValues.interests}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
        />
        <label htmlFor="location">Location (5-digit Zip Code)</label>
        <input
          id="location"
          type="location"
          name='location'
          value={inputValues.location}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
        />
        <label htmlFor="friendRadius">Distance From You (in miles)</label>
        <input
          id="friendRadius"
          type="friendRadius"
          name='friendRadius'
          value={inputValues.friendRadius}
          onChange={handleChange}
          className="ProfileEditForm-input form-control"
        />
        <button type="submit" className="btn btn-primary ProfileEditForm-btn">
          Save Changes
        </button>
      </form>
      {alerts.map(a =>
        <Alert key={uuid()} text={a.text} type={a.type} />
      )}
    </div>
  );
}

export default ProfileEditForm;