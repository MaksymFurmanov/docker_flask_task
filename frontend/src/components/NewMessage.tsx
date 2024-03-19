import React, {ChangeEvent, useState} from "react";
import {MessageData} from "../interfaces";

interface Props {
    setMessages: React.Dispatch<React.SetStateAction<MessageData[]>>;
}

const NewMessage: React.FC<Props> = ({setMessages}) => {
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    const sendHandler = () => {
        const newMessage = {
            author: "You",
            time: getCurrentDateTime(),
            content: message
        }
        fetch("http://localhost:5000/new-message", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            })
            .then(() => {
                setMessages(prevState =>
                    [newMessage, ...prevState]);
                setMessage("");
            })
            .catch(e => console.log(e));
    }

    return <div className={"NewMessage"}>
        <textarea value={message}
                  onChange={handleChange}
                  placeholder={"Your message"}
                  rows={1}
                  maxLength={300}
        />
        <button onClick={sendHandler}>
            Send
        </button>
    </div>
}

export default NewMessage;