import "./ChatForm.css";
import { useState } from 'react';

/** Component for Chat Form - holds data to send as message to friend
 *
 * props:
 * - sendMessage()
 * - friend {username, firstName, lastName, imageUrl}
 *
 * state:
 * - inputValue
 *
 * Chatbox -> ChatForm
 */

function ChatForm({ sendMessage, friend }) {
    const [inputValue, setInputValue] = useState("");

    /** updates inputValue */
    function handleChange(evt) {
        setInputValue(evt.target.value);
    }

    /** Calls fn in parent */
    async function handleSubmit(evt) {
        evt.preventDefault();
        const data = { toUsername: friend.username, body: inputValue };
        await sendMessage(data);
        setInputValue("");
    }

    return (
        <div className="ChatForm">
            <form onSubmit={handleSubmit}>
                <div className="ChatForm-Input input-group">
                    <input
                        type="text"
                        name="ChatForm-Message"
                        value={inputValue}
                        placeholder={`Send a message to ${friend.firstName}...`}
                        className="ChatForm-Message form-control"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="ChatForm-Button btn btn-success"
                        disabled={!inputValue}>Send</button>
                </div>
            </form>
        </div>
    );
}

export default ChatForm;