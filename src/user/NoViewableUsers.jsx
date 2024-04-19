import { useContext } from "react";
import userContext from "./userContext";
import { getTimeDifferenceInHours } from "../utils/utils";
import "./NoViewableUsers.css";


/**Component for No Viewable Users page for friender
 *
 * Props:
 * - setIsLoading()
 * - updateUser()
 *
 * State: none
 *
 * RoutesList -> NoViewableUsers
 */

function NoViewableUsers({ setIsLoading, updateUser }) {
  const { user } = useContext(userContext);

  const timeOfRender = new Date();
  const userLastSearchedTime = new Date(user.lastSearched);
  const differenceInHours = getTimeDifferenceInHours(timeOfRender, userLastSearchedTime);
  const canSearch = differenceInHours >= 1;

  /** Handles Search button click, updates user and calls parent function */
  async function handleClick() {
    await updateUser({
      lastSearched: timeOfRender.toISOString(),
      username: user.username
    });
    setIsLoading(true);
  }

  return (
    <div className="NoViewableUsers">
      <h1>{canSearch
        ? "Press the button to find users in your area!"
        : "You've seen all the users in your area!"}</h1>
      {!canSearch && <div>
        <h3> You must wait an hour between searches!</h3>
        <h5>You have {Math.floor((1 - differenceInHours) * 60)} minutes left!</h5>
      </div>}
      <button
        onClick={handleClick}
        disabled={!canSearch}
        className="NoViewableUsers-Button btn btn-success">
        Search
      </button>
    </div>
  );
}

export default NoViewableUsers;