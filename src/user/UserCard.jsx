import "./UserCard.css";

/**Component for User Card for Friender
 *
 * props:
 * - user: Object of user data
 * - handleSwipe()
 *
 * state: none
 *
 * FindFriends -> UserCard
 */

function UserCard({ user, handleSwipe }) {

  /** Handles user being liked, calls parent function */
  async function handleLike() {
    await handleSwipe(user.username, true);
  }

  /** Handles user being disliked, calls parent function */
  async function handleDislike() {
    await handleSwipe(user.username, false);
  }

  return (
    <div className="UserCard">
      <button className="UserCard-Dislike-Button" onClick={handleDislike}>
        <span className="bi bi-x-circle"></span>
      </button>
      <div className="UserCard-Info">
        <div className="UserCard-Header">
          <img src={user.imageUrl} className="UserCard-Image" />
          <h1>{user.firstName + " " + user.lastName} </h1>
        </div>
        <h3>
          {Math.floor(user.area.distance) + " miles away in " +
            user.area.city + ", " + user.area.state}
        </h3>
        <h3>Hobbies:</h3>
        <h5>{user.hobbies}</h5>
        <h3>Interests:</h3>
        <h5>{user.interests}</h5>
      </div>
      <button className="UserCard-Like-Button" onClick={handleLike}>
        <span className="bi bi-check-circle"></span>
      </button>
    </div>
  );
}

export default UserCard;