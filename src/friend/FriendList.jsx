import './FriendList.css';
import { useContext, useEffect, useState } from 'react';
import userContext from '../user/userContext';
import FriendCard from './FriendCard';
import FrienderApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

/**FriendList component that contains Friend Cards
 *
 * Props: none
 *
 * State:
 * - friends: array of user's friends
 * - isLoading
 *
 * RoutesList -> FriendList -> FriendCard
 */

function FriendList() {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(userContext);

    useEffect(function fetchFriendsOnMount() {
        async function fetchFriends() {
            try {
                const friends =
                    await FrienderApi.getFriends(user.username);
                setFriends(friends);
                // set user as well to make sure our user in context has the updated friends array
                setUser(user => ({
                    ...user,
                    friends
                }));
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

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="FriendList">
            <h1 className="FriendList-Title">
                You have {friends.length} friend{friends.length !== 1 && "s"}!
            </h1>
            {friends.map(f => <FriendCard key={f.username} friend={f} />)}
        </div>
    );
}

export default FriendList;