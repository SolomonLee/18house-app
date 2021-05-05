import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectMessager,
    selectCheckerkey,
    selectCheckerkeyState,
    checkerkeyStateOpts,
    loginMessagerCheckerAsync,
    logout,
} from "../../reducers/messageRedux";

import FormMessageLogin from "../combo/FormMessageLogin";
import PageMessageBox from "./PageMessageBox";

const PageMessage = (props) => {
    const messager = useSelector(selectMessager);
    const checkerkey = useSelector(selectCheckerkey);
    const checkerkeyState = useSelector(selectCheckerkeyState);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (checkerkeyState === checkerkeyStateOpts.INCONFIRMD) {
            dispatch(loginMessagerCheckerAsync({ messager, checkerkey }));
        }
    }, []);

    return (
        <div className="PageMessage">
            <div className="container">
                <div className="row justify-content-center">
                    {(() => {
                        switch (checkerkeyState) {
                            case checkerkeyStateOpts.UNCONFIRMD:
                                return (
                                    <div className="col-lg-4 col-md-6  col-sm-9  col-xs-12">
                                        <FormMessageLogin />
                                    </div>
                                );
                            case checkerkeyStateOpts.CONFIRMD:
                                return (
                                    <div className="col-md-8  col-sm-10 col-xs-12">
                                        <p className="text-right">
                                            <button
                                                className="btn btn_style_none"
                                                onClick={handleLogout}
                                            >
                                                離開大廳
                                            </button>
                                        </p>
                                        <PageMessageBox />
                                    </div>
                                );
                            case checkerkeyStateOpts.INCONFIRMD:
                                return (
                                    <div className="col-lg-4 col-md-6  col-sm-9  col-xs-12">
                                        <div className="_box">
                                            <div className="box_title"></div>
                                            <div className="box_content">
                                                <div
                                                    className="alert alert-info"
                                                    role="alert"
                                                >
                                                    確認先前登入資料中...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default PageMessage;
