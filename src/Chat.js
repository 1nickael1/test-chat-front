import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket] = useState(() => io(process.env.ORIGIN));

  useEffect(() => {
    socket.on('message', (message) => {
        updateMessages(message)
    });

    return () => {
        socket.off("message", 'desconectado');
     }
  }, [socket]);

  function updateMessages(message) {
    if(message.length >= messages.length) {
        setMessages((messages) => [...messages, message]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
