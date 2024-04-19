import { Link } from "react-router-dom";
import './FriendCard.css';

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
    <Link className="FriendCard card col-lg-4 col-md-6 col-sm-8" to={`/friends/${friend.username}`}>
      <div className="card-body FriendCard-Body">
        <img src={friend.imageUrl} alt={`Image of ${friend.username}`} className="FriendCard-Image" />
          <h1 className="FriendCard-Name">{`${friend.firstName} ${friend.lastName}`}</h1>
      </div>
    </Link>
  );
}

export default FriendCard;