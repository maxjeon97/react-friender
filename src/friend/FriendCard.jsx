import { Link } from "react-router-dom";

/**FriendCard component that is a link to friend chatbox while
 * also displaying that friends' information
 *
 * Props:
 * - friend
 *
 * State: none
 *
 * FriendList -> FriendCard
 */

function FriendCard({ friend }) {
  return (
    <Link className="card FriendCard" to={`/friends/${friend.username}`}>
      <div className="card-body FriendCard-Body">
        <img src={friend.imageUrl} alt={`Image of ${friend.username}`} className="FriendCard-Image" />
          <h4 className="FriendCard-Name">{`${friend.firstName} ${friend.lastName}`}</h4>
      </div>
    </Link>
  );
}

export default FriendCard;