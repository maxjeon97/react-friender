import { Link } from "react-router-dom";
import "./HomePage.css";

/** Component for homepage.
 *
 * State: none
 *
 * Props: none
 *
 * App -> Home
 */

import { useContext } from "react";
import userContext from "../user/userContext";

function HomePage() {
  console.log("in rendering HomePage");
  const { user } = useContext(userContext);

  return (
    <div className="HomePage col-10">
      <div className='HomePage-title-logo'>
        <h1 className='HomePage-title'>Friender</h1>
        <img className="HomePage-logo"
          src="/logos/FrienderLogo.png"
          alt="Friender-logo" />
      </div>
      <h3 className="mb-3">Make new friends!</h3>
      {user ? (
        <h4>Welcome back, {user.firstName}.</h4>
      ) : (
        <div className="HomePage-links">
          <Link className="btn btn-primary" to='/login'>Login</Link>
          <Link className="btn btn-primary" to='/register'>Register</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;