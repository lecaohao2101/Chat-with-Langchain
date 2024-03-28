import React, { useState } from 'react';
import axios from 'axios';
import { MessageList, Input, Button, MessageBox } from 'react-chat-elements';
import './ChatWindow.css';

const ChatWindow = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/ask', { question });
      const response = res.data.response;
      setMessages([
        ...messages,
        { position: 'right', type: 'text', text: question, date: new Date() },
        { position: 'left', type: 'text', text: response, date: new Date() },
      ]);
      setQuestion('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-body">
        <MessageList
          lockable={true}
          toBottomHeight="100%"
          className="message-list"
          dataSource={messages}
        />
      </div>
      <div className="chat-input">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Type your message..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            multiline={false}
            rightButtons={
              <Button color="white" backgroundColor="#0084ff" text="Send" onClick={handleSubmit} />
            }
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;