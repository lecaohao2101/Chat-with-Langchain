import React, { useState } from 'react';

function ChatUI() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gửi yêu cầu POST đến API /ask
    const response = await fetch('http://127.0.0.1:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message }),
    });

    const data = await response.json();
    const responseMessage = data.response;

    // Thêm tin nhắn yêu cầu và phản hồi vào danh sách tin nhắn
    setMessages([...messages, { question: message, response: responseMessage }]);

    // Xóa trường nhập liệu
    setMessage('');
  };

  return (
    <div>
      <h1>Chat UI</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((item, index) => (
          <li key={index}>
            <strong>Question:</strong> {item.question}
            <br />
            <strong>Response:</strong> {item.response}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatUI;