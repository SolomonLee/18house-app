import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    selectMessagerState,
    messagerStateOpts,
    loginMessagerAsync,
    addMessagerAsync,
} from "../../reducers/messageRedux";

import Fill2Item from "./FillItemV2";
import Split from "../Split";

import { useFormik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    messager: Yup.string()
        .min(3, "太短 3-20個單位")
        .max(20, "太長 7-20")
        .required("必填欄位喔!"),
    password: Yup.string()
        .min(7, "太短 7-50個單位")
        .max(50, "太長 7-50個單位")
        .required("必填欄位喔!"),
});

const formAction = {
    login: "Login",
    register: "Register",
};

export const MessageLogin = (props) => {
    const refOnSended = useRef(false);
    const dispatch = useDispatch();
    const mssagerState = useSelector(selectMessagerState);

    const formik = useFormik({
        initialValues: {
            messager: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        if (refOnSended.current) return;
        refOnSended.current = true;
        if (values.formAction === formAction.login) {
            console.log(`formAction.login: ${formAction.login}`);
            dispatch(loginMessagerAsync(values));
            dispatch(loginMessagerAsync(values)).finally(() => {
                refOnSended.current = false;
            });
        }

        if (values.formAction === formAction.register) {
            console.log(formAction.register);
            dispatch(addMessagerAsync(values)).finally(() => {
                refOnSended.current = false;
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="form_box">
            <div className="box_title">
                村莊守門員：<small>請問你誰?</small>
            </div>
            <div className="item_content">
                <div className="row">
                    <div className="col-12">
                        <Fill2Item
                            name="messager"
                            title="名稱"
                            type="text"
                            value={formik.values.messager}
                            onchange={formik.handleChange}
                            onblur={formik.handleBlur}
                            error={
                                formik.errors.messager &&
                                formik.touched.messager
                                    ? formik.errors.messager
                                    : ""
                            }
                            placeholder="輸入您的大名"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Fill2Item
                            name="password"
                            title="密碼"
                            type="password"
                            value={formik.values.password}
                            onchange={formik.handleChange}
                            onblur={formik.handleBlur}
                            error={
                                formik.errors.password &&
                                formik.touched.password
                                    ? formik.errors.password
                                    : ""
                            }
                            placeholder="輸入您的密碼"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <button
                                type="submit"
                                onClick={() => {
                                    formik.setFieldValue(
                                        "formAction",
                                        formAction.login
                                    );
                                }}
                                className="btn btn_style3"
                            >
                                進入
                            </button>
                            <button
                                type="submit"
                                onClick={() => {
                                    formik.setFieldValue(
                                        "formAction",
                                        formAction.register
                                    );
                                }}
                                className="btn btn_style3"
                            >
                                新人
                            </button>
                        </div>
                    </div>
                </div>
                <p></p>
                <p></p>

                {(() => {
                    switch (mssagerState) {
                        case messagerStateOpts.LOADING:
                            return (
                                <>
                                    <Split content={<small>系統訊息</small>} />
                                    <div
                                        className="alert alert-info"
                                        role="alert"
                                    >
                                        作業中~
                                    </div>
                                </>
                            );
                        case messagerStateOpts.LOADERROR:
                            return (
                                <>
                                    <Split content={<small>系統訊息</small>} />
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        登入失敗, 請確認 名稱 或 密碼
                                    </div>
                                </>
                            );
                        case messagerStateOpts.ADDERROR:
                            return (
                                <>
                                    <Split content={<small>系統訊息</small>} />
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        註冊失敗, 請嘗試其他名稱
                                    </div>
                                </>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        </form>
    );
};

export default MessageLogin;
