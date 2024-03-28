import React, { useState } from "react";
import axios from "axios";
import { MessageList, Input, Button, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/ask", { question });
      const response = res.data.response;
      setMessages([
        ...messages,
        { position: "right", type: "text", text: question, date: new Date() },
        { position: "left", type: "text", text: response, date: new Date() },
      ]);
      setQuestion("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <MessageList
        lockable={true}
        toBottomHeight="100%"
        className="message-list"
        dataSource={messages}
      />
      <form onSubmit={handleSubmit} className="input-container">
        <Input
          placeholder="Type here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          multiline={false}
          leftButtons={
            <Button
              color="#007bff"
              text="Send"
              onClick={handleSubmit}
            />
          }
        />
      </form>
    </div>
  );
};

export default AskQuestion;
