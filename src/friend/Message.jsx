import { useContext } from "react";
import userContext from "../user/userContext";
import "./Message.css";

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
  const { user } = useContext(userContext);
  const myMessageStyles = {
    alignSelf: 'flex-end',
    backgroundColor: 'blue'
  };

  const friendMessageStyles = {
    alignSelf: 'flex-start',
    backgroundColor: 'gray'
  };

  const messageStyle = message.fromUser.username === user.username
    ? myMessageStyles
    : friendMessageStyles;

  return (
    <div className="Message" style={messageStyle}>
      <p className="Message-Body">
        {message.body}
      </p>
    </div>
  );
}

export default Message;