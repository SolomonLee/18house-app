import { useSelector, useDispatch } from "react-redux";
import {
    selectMessageList,
    getMessageListAsync,
} from "../../reducers/messageRedux";
import { useEffect, useState, useRef } from "react";

import MessageItem from "../MessageItem";
import MessageInputItem from "../MessageAddItem";

const messageListStateOpts = {
    START: "messageListStateOpts_START",
    LOADING: "messageListStateOpts_LOADING",
    DONE: "messageListStateOpts_DONE",
    NOMESSAGE: "messageListStateOpts_NOMESSAGE",
};

const MessageList = (props) => {
    const messageList = useSelector(selectMessageList);
    const [messageListState, setMessageListState] = useState(
        typeof messageList[props.listid] === "object" &&
            messageList[props.listid].length >= 0
            ? messageListStateOpts.DONE
            : messageListStateOpts.START
    );
    const refUpdateButton = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (
            messageListState !== messageListStateOpts.DONE &&
            typeof messageList[props.listid] === "object" &&
            refUpdateButton.current !== null
        ) {
            if (messageList[props.listid].length > 0) {
                setMessageListState(messageListStateOpts.DONE);
            } else {
                setMessageListState(messageListStateOpts.NOMESSAGE);
            }
        }
    }, [messageList]);

    const handlerLoadMessageList = () => {
        refUpdateButton.current.disabled = true;
        if (
            messageListState !== messageListStateOpts.LOADING &&
            messageListState !== messageListStateOpts.DONE
        )
            setMessageListState(messageListStateOpts.LOADING);

        dispatch(getMessageListAsync(props.listid)).finally(() => {
            if (refUpdateButton.current !== null)
                refUpdateButton.current.disabled = false;
        });
    };

    return (
        <div className="message_list_box">
            <div className="box_content">
                <MessageInputItem listid={props.listid} />
                {(() => {
                    switch (messageListState) {
                        case messageListStateOpts.DONE:
                            return messageList[props.listid].map((_message) => (
                                <MessageItem
                                    key={`${props.listid}${_message.messager}${_message.timestamp}`}
                                    timestamp={_message.timestamp}
                                    message={_message.message}
                                    messager={_message.messager}
                                />
                            ));
                        case messageListStateOpts.NOMESSAGE:
                            return (
                                <p className="text-left">
                                    <small>尚無留言, 或許你可以當第一個</small>
                                </p>
                            );
                        case messageListStateOpts.LOADING:
                            return (
                                <p className="text-left">
                                    <small>載入中</small>
                                </p>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
            <div className="box_bottom">
                <button
                    className="btn btn_style_none"
                    onClick={handlerLoadMessageList}
                    ref={refUpdateButton}
                >
                    {messageListState === messageListStateOpts.START
                        ? "載入留言..."
                        : "更新留言..."}
                </button>
            </div>
        </div>
    );
};

export default MessageList;
