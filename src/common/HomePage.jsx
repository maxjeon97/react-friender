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
      <h1>Friender</h1>
      <h3>Make new friends!</h3>
      {user ? (
        <h3>Welcome back, {user.firstName}.</h3>
      ) : (
        <div className="HomePage-links">
          <Link className="btn btn-primary" to='/login'>Log in</Link>
          <Link className="btn btn-primary" to='/signup'>Sign up</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;