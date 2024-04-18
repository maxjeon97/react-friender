import './FriendList.css';
import { useContext } from 'react';
import userContext from '../user/userContext';
import FriendCard from './FriendCard';

/**FriendList component that contains Friend Cards
 *
 * Props: none
 *
 * State: none
 *
 * RoutesList -> FriendList -> { Chatbox }
 */

function FriendList() {
    const { user } = useContext(userContext);

    return (
        <div className="FriendList">
            <h3>You have {user.friends.length} friend{user.friends.length !== 1 && "s"}!</h3>
            {user.friends.map(f => <FriendCard key={f.username} friend={f} />)}
        </div>
    );
}

export default FriendList;