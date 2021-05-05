import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageAsync, selectMessager } from "../reducers/messageRedux";

import UserTextPic from "./UserTextPic";

const itemStateOpts = {
    DONE: "itemStateOpts_DONE",
    SEND: "itemStateOpts_SEND",
};

const MessageAddItem = (props) => {
    const dispatch = useDispatch();
    const messager = useSelector(selectMessager);
    const [message, setMessage] = useState("");
    const [itemState, setItemState] = useState(itemStateOpts.DONE);
    const refIsMounted = useRef(false);

    useEffect(() => {
        refIsMounted.current = true;
        return () => {
            refIsMounted.current = false;
        };
    }, []);

    const handleInputMessage = (e) => {
        if (itemState !== itemStateOpts.DONE) return;
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (message.length === 0) return;
        setItemState(itemStateOpts.SEND);
        dispatch(addMessageAsync({ listid: props.listid, message })).finally(
            () => {
                if (refIsMounted.current) setItemState(itemStateOpts.DONE);
                setMessage("");
            }
        );
    };

    return (
        <div className="message_item">
            <div
                className="input_message"
                disable={itemState === itemStateOpts.DONE ? null : ""}
            >
                <UserTextPic name={messager} />
                <input
                    type="text"
                    placeholder="留言.........."
                    value={message}
                    onChange={handleInputMessage}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default MessageAddItem;
