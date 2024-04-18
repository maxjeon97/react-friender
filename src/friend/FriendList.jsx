import './FriendList.css';
import { useContext } from 'react';
import userContext from '../user/userContext';
import FriendList from './FriendList';
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
            <h3>You have {user.friends.length} friends!</h3>
            {user.friends.map(f => <FriendCard key={f.username} friend={f}/>)}
        </div>
    );
}

export default FriendList;