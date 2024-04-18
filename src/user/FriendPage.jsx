import './FriendPage.css';
import { useState, useEffect, useContext } from 'react';
import userContext from './userContext';
import FriendList from './FriendList';
import Chatbox from './Chatbox';
import FrienderApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

/**FriendPage component that conditionally renders either the FriendList or
 * chatbox with a specific friend depending on state
 *
 * Props: none
 *
 * State:
 * - friends
 * - isLoading
 * - currentFriend
 *
 * RoutesList -> FriendPage -> { FriendList, Chatbox }
 */

function FriendPage() {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFriend, setCurrentFriend] = useState(null);

    const { user } = useContext(userContext);

    useEffect(function fetchFriendsOnLoad() {
        async function fetchFriends() {
            try {
                const friends = await FrienderApi.getFriends(user.username);
                setFriends(friends);
            }
            catch (err) {
                console.error("Error occured getting user's friends", err);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchFriends();
    }, []);

    /** handle opening of chatbox */
    function openChat(friend) {
        setCurrentFriend(friend);
    }

    /** handle closing of chatbox */
    function closeChat() {
        setCurrentFriend(null);
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="FriendPage">
            {currentFriend
                ? <Chatbox friend={currentFriend} closeChat={closeChat} />
                : <FriendList friends={friends} openChat={openChat} />}
        </div>
    );
}

export default FriendPage;