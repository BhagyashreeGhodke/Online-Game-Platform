import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch chat history for the selected user
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/api/v1/chats/${userId}/history`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  const sendMessage = async () => {
    try {
      await axios.post(`/api/v1/chats/${userId}/send`, { message: newMessage });
      setNewMessage('');
      // Optionally, update the messages state to display the sent message immediately
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat with User {userId}</h2>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <strong>{message.sender}</strong>: {message.text}
          </div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
