import { useState, useContext, useEffect } from 'react';
import FrienderApi from "../api/api";
import userContext from '../user/userContext';
import LoadingSpinner from '../common/LoadingSpinner';
import UserCard from '../user/UserCard';
import NoViewableUsers from '../user/NoViewableUsers';
import { sample } from 'lodash';
import Alert from '../common/Alert';
import './FindFriends.css';


/**FindFriends component for Friender
 *
 * Props:
 * - updateUser()
 *
 * State:
 * - viewableUsers: array of user objects that currUser can swipe on
 * - isLoading
 * - matched
 *
 * RoutesList -> FindFriends -> { UserCard, NoViewableUsers }
*/

// TODO: could be cool to implement a timer for the alert when a match is successful
function FindFriends({ updateUser }) {
    const [viewableUsers, setViewableUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [matched, setMatched] = useState(false);

    const { user } = useContext(userContext);

    useEffect(function fetchViewableUsersOnLoad() {
        fetchViewableUsers();
    }, []);

    /** fetches viewableUsers from the API and sets state */
    async function fetchViewableUsers() {
        try {
            const users =
                await FrienderApi
                    .getViewableUsers(user.username, user.location, user.friendRadius);
            setViewableUsers(users);
        }
        catch (err) {
            console.error("Error occured getting viewable users", err);
        }
        finally {
            setIsLoading(false);
        }
    }

    /** handles swiping on user */
    async function handleSwipe(viewedUsername, liked) {
        const data = { viewedUsername, liked };
        setMatched(await FrienderApi.checkMatch(user.username, data));
        setViewableUsers(viewableUsers.filter(u => u.username !== viewedUsername));
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="FindFriends">
            {matched && <Alert text='You just got a new match!' type='success' />}
            {viewableUsers.length === 0
                ? <NoViewableUsers
                    fetchViewableUsers={fetchViewableUsers}
                    updateUser={updateUser} />
                : <UserCard
                    user={sample(viewableUsers)}
                    handleSwipe={handleSwipe} />}
        </div>
    );
}

export default FindFriends;