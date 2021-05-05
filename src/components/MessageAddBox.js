import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessageBoxAsync, selectMessager } from "../reducers/messageRedux";
import Textarea from "react-textarea-autosize";

import UserTextPic from "./UserTextPic";
import { useWhenWindowResize } from "../hook/elementHook";

const itemStateOpts = {
    DONE: "itemStateOpts_DONE",
    SEND: "itemStateOpts_SEND",
};

const MessageAddBox = (props) => {
    const dispatch = useDispatch();
    const messager = useSelector(selectMessager);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [itemState, setItemState] = useState(itemStateOpts.DONE);
    const refIsMounted = useRef(false);

    const refInputContent = useRef();
    const refDivBoxTitle = useRef();
    const refDivInputMessage = useRef();
    const refDivBoxBottom = useRef();

    const handleShowContentBox = () => {
        if (title === "") {
            requestAnimationFrame(() => {
                refDivInputMessage.current.style.top = "10px";
                refDivInputMessage.current.style.height = 0;
                refDivBoxBottom.current.style.top = "10px";
                refDivBoxBottom.current.style.height = 0;
            });
        } else {
            requestAnimationFrame(() => {
                if (!refIsMounted.current) return;

                const divInputMessageHeight =
                    refInputContent.current.offsetHeight + 20;
                const divBoxBottomHeight = (() => {
                    let maxHeight = 0;
                    for (
                        let i = 0;
                        i < refDivBoxBottom.current.children.length;
                        i++
                    ) {
                        const h =
                            refDivBoxBottom.current.children[i].offsetHeight;
                        if (maxHeight < h) maxHeight = h;
                    }
                    return maxHeight + 31;
                })();

                const moveTop = refDivBoxTitle.current.offsetHeight - 8;
                refDivInputMessage.current.style.height = `${divInputMessageHeight}px`;
                refDivInputMessage.current.style.top = `${moveTop}px`;
                refDivBoxBottom.current.style.height = `${divBoxBottomHeight}px`;
                refDivBoxBottom.current.style.top = `${
                    divInputMessageHeight + moveTop
                }px`;
            });
        }
    };

    const handleInputTitle = (e) => {
        if (itemState !== itemStateOpts.DONE) return;
        setTitle(e.target.value);
    };

    const handleInputContent = (e) => {
        if (itemState !== itemStateOpts.DONE) return;
        setContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            refInputContent.current.focus();
        }
    };

    const handleSubmit = () => {
        // console.log({ title, content });
        if (title === "") {
            setError("要有標題喔!!!!!");
            setTimeout(() => {
                if (refIsMounted.current) setError("");
            }, 3000);
            return;
        }

        setItemState(itemStateOpts.SEND);
        dispatch(addMessageBoxAsync({ title, content })).finally(() => {
            if (refIsMounted.current) {
                setItemState(itemStateOpts.DONE);
                setTitle("");
                setContent("");
            }
        });
    };

    useEffect(() => {
        refIsMounted.current = true;

        return () => {
            refIsMounted.current = false;
        };
    }, []);

    useWhenWindowResize(() => {
        handleShowContentBox();
    });

    useEffect(() => {
        handleShowContentBox();
    }, [title]);

    return (
        <div className="message_box" stylenum="edit_box">
            <div className="box_title" ref={refDivBoxTitle}>
                <UserTextPic name={messager} />
                <input
                    type="text"
                    placeholder="需要一些標題..."
                    value={title}
                    onChange={handleInputTitle}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="input_message" ref={refDivInputMessage}>
                <Textarea
                    placeholder="輸入你的內文..."
                    minRows={4}
                    maxRows={20}
                    value={content}
                    onChange={handleInputContent}
                    ref={refInputContent}
                />
            </div>
            <div className="box_bottom" ref={refDivBoxBottom}>
                {error != "" ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : null}
                <button className="btn btn_submit" onClick={handleSubmit}>
                    送出
                </button>
            </div>
        </div>
    );
};

export default MessageAddBox;
