import { getDateString } from "../common/timer";
import UserTextPic from "./UserTextPic";

const MessageItem = (props) => {
    return (
        <div className="message_item">
            <span className="time">{getDateString(props.timestamp)}</span>
            <span className="message">
                <UserTextPic name={props.messager} />{" "}
                <span>{props.message}</span>
            </span>
        </div>
    );
};

export default MessageItem;
