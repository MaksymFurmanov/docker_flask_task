import React from 'react';
import {MessageData} from "../interfaces";
import {IoPersonCircle} from "react-icons/io5";

interface Props {
    messageData: MessageData;
}

const Message: React.FC<Props> = ({messageData}) => {
    return (
        <div className={"Message"}>
            <div className={"message-heading"}>
                <div>
                    <IoPersonCircle/>
                    <h4>{messageData.author}</h4>
                </div>
                <p>{messageData.time}</p>
            </div>
            <p className={"message-content"}>
                {messageData.content}
            </p>
        </div>
    );
};

export default Message;