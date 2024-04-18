/**Message component that shows a message between current user and friend
 *
 * Props:
 * - message {id, fromUser, body, sentAt, readAt}
 *
 * State: none
 *
 * Chatbox -> Message
 */

function Message({ message }) {
    const myMessageStyles = {
        alignSelf: 'flex-end',
        backgroundColor: 'blue'
    };

    const friendMessageStyles = {
        alignSelf: 'flex-start',
        backgroundColor: 'gray'
    };

    return (
        <div className="Message">

        </div>
    );
}

export default Message;