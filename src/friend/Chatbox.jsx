import { useContext, useEffect, useState } from "react";
import userContext from "../user/userContext";
import LoadingSpinner from "../common/LoadingSpinner";
import FrienderApi from "../api/api";
import { Navigate, useParams } from "react-router-dom";
import Message from "./Message";
import ChatForm from "./ChatForm";
import './Chatbox.css';

/**Chatbox component that shows messages between two users and allows the
 * current user to send messages
 *
 * Props: none
 *
 * State:
 * - messages [{id, fromUser, body, sentAt, readAt}, ...]
 * - isLoading
 *
 * RoutesList -> Chatbox -> {Message, ChatForm}
 */

function Chatbox() {
  const { user } = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { friendUsername } = useParams();


  useEffect(function fetchMessagesOnMount() {
    fetchMessages();
  }, []);

  /** handles API call to fetch all messages between current user and friend */
  async function fetchMessages() {
    try {
      const messages = await FrienderApi.getMessagesBetween(
        user.username, friendUsername
      );
      setMessages(messages);
    } catch (err) {
      console.error("Error occured getting messages", err);
    } finally {
      setIsLoading(false);
    }
  }

  /** Sends API call to add new message to database and sets the state
   * with new message */
  async function sendMessage(data) {
    try {
      await FrienderApi.sendMessage(data);
      await fetchMessages();
    }
    catch (err) {
      console.error("Error occured sending message", err);
    }
  }

  const friend = user.friends.find(f => f.username = friendUsername);

  if (!friend) return <Navigate to="/friends" />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="Chatbox">
      <div className="Chatbox-Header">
        {`${friend.firstName} ${friend.lastName}`}
      </div>
      <div className="Chatbox-Messages">
        {messages.map(m => <Message key={m.id} message={m} />)}
      </div>
      <ChatForm sendMessage={sendMessage} friend={friend} />
    </div>
  );
}

export default Chatbox;