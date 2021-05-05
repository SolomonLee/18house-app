import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getMessageBoxsAsync,
    selectMessageBoxs,
    selectMessageBoxsState,
    messageBoxsStateOpts,
} from "../../reducers/messageRedux";

import MessageAddBox from "../MessageAddBox";
import MessageBox from "../combo/MessageBox";
import Loading from "../Loading";

const PageMessageBox = (props) => {
    const messageBoxs = useSelector(selectMessageBoxs);
    const messageBoxsState = useSelector(selectMessageBoxsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessageBoxsAsync());
    }, []);

    return (
        <>
            {(() => {
                switch (messageBoxsState) {
                    case messageBoxsStateOpts.LOADING:
                        return <Loading loading={true} />;
                    case messageBoxsStateOpts.DONE:
                        return (
                            <>
                                <div
                                    className="sticky_box"
                                    id="test"
                                    style={{ ["border-radius"]: "8px" }}
                                >
                                    <MessageAddBox />
                                </div>
                                {typeof messageBoxs === "object" &&
                                messageBoxs?.length > 0 ? (
                                    messageBoxs.map((messageBox) => (
                                        <MessageBox
                                            key={messageBox.listid}
                                            title={messageBox.title}
                                            content={messageBox.content}
                                            listid={messageBox.listid}
                                            messager={messageBox.messager}
                                            timestamp={messageBox.timestamp}
                                        />
                                    ))
                                ) : (
                                    <span>尚無訊息 趕快來個訊息吧 QQ</span>
                                )}
                            </>
                        );
                    case messageBoxsStateOpts.ERROR:
                        return (
                            <div className="alert alert-danger" role="alert">
                                載入失敗!!
                            </div>
                        );
                }
            })()}
        </>
    );
};

export default PageMessageBox;
