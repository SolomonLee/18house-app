import { getDateString } from "../../common/timer";
import UserTextPic from "../UserTextPic";
import MessageList from "./MessageList";

const MessageBox = (props) => {
    return (
        <div className="message_box">
            <div className="box_title">{props.title}</div>
            <div className="box_content">
                <pre>{props.content}</pre>
            </div>
            <div className="messager">
                <span className="name">
                    from <UserTextPic name={props.messager} />
                </span>
                <span className="time">{getDateString(props.timestamp)}</span>
            </div>

            <MessageList listid={props.listid} />
        </div>
    );
};

export default MessageBox;
