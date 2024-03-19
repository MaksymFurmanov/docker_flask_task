import React, {useEffect, useState} from 'react';
import './App.css';
import Message from "./components/Message";
import NewMessage from "./components/NewMessage";
import {MessageData} from "./interfaces";

function App() {
    const [messages, setMessages] = useState<Array<MessageData>>([]);

    const getMessages = () => {
        return fetch("http://localhost:5000/get-messages")
            .then(response => response.json());
    }
    useEffect(() => {
        getMessages()
            .then(response => setMessages(response))
            .catch(e => console.log(e));
    }, []);

    const messagesItems: JSX.Element[] =
        messages.map((message, index) => {
            return <Message key={index} messageData={message}/>
        });

    return (
        <div className="App">
            <h1>Messages:</h1>
            <div className={"messages-container"}>
                <NewMessage setMessages={setMessages}/>
                {messagesItems}
            </div>
        </div>
    );
}

export default App;
