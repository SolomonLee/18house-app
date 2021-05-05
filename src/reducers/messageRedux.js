import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apis/apiMessage";

export const messagerStateOpts = {
    DONE: "messagerStateOpts_DONE",
    LOADING: "messagerStateOpts_LOADING",
    LOADERROR: "messagerStateOpts_LOADERROR",
    ADDERROR: "messagerStateOpts_ADDERROR",
};

export const checkerkeyStateOpts = {
    UNCONFIRMD: "checkerkeyStateOpts_UNCONFIRMD",
    CONFIRMD: "checkerkeyStateOpts_CONFIRMDD",
    INCONFIRMD: "checkerkeyStateOpts_INCONFIRMDD",
};

export const messageBoxsStateOpts = {
    DONE: "messageBoxsStateOpts_DONE",
    LOADING: "messageBoxsStateOpts_LOADING",
    ERROR: "messageBoxsStateOpts_ERROR",
};

const initialState = {
    messagerState: messagerStateOpts.DONE, // "" | "Loading" | "LoadError" | "AddError"
    messager: "",

    checkerkey: "",
    checkerkeyState: checkerkeyStateOpts.UNCONFIRMD,

    messageBoxsState: messageBoxsStateOpts.LOADING, // "" | "Loading" | "LoadError"
    messageBoxs: [],

    messageList: {},

    init: function () {
        const _messager = api.getStorage().messager.get();
        const _checkerkey = api.getStorage().checkerkey.get();
        const _messageBoxs = api.getStorage().messageBoxs.get();
        const _messageList = api.getStorage().messageList.get();

        this.messager = _messager ? _messager : "";
        this.checkerkey = _checkerkey ? _checkerkey : "";
        this.checkerkeyState =
            this.messager !== "" && this.checkerkey !== ""
                ? checkerkeyStateOpts.INCONFIRMD
                : checkerkeyStateOpts.UNCONFIRMD;

        this.messageBoxsState = _messageBoxs
            ? messageBoxsStateOpts.DONE
            : messageBoxsStateOpts.messageBoxsStateOpts;
        this.messageBoxs = _messageBoxs ? _messageBoxs : [];
        this.messageList = _messageList ? _messageList : {};

        delete this.init;
        return this;
    },
}.init();

export const getMessageBoxsAsync = createAsyncThunk(
    "messageRedux/getMessageBoxsAsync",
    async (_, { getState }) => {
        const messageBoxs = await api.getMessageBoxs.call({
            messager: getState().message.messager,
            checkerkey: getState().message.checkerkey,
        });

        return messageBoxs;
    }
);

export const addMessageBoxAsync = createAsyncThunk(
    "messageRedux/addMessageBoxAsync",
    async (messageBox, { getState }) => {
        const newMessageBox = await api.addMessageBox.call(
            {
                messager: getState().message.messager,
                checkerkey: getState().message.checkerkey,
            },
            messageBox
        );

        return newMessageBox;
    }
);

export const getMessageListAsync = createAsyncThunk(
    "messageRedux/getMessageListAsync",
    async (listid, { getState }) => {
        const messageList = await api.getMessageList.call(
            {
                messager: getState().message.messager,
                checkerkey: getState().message.checkerkey,
            },
            listid
        );

        return { listid, messageList };
    }
);

export const addMessageAsync = createAsyncThunk(
    "messageRedux/addMessageAsync",
    async ({ listid, message }, { getState }) => {
        const result = await api.addMessage.call(
            {
                messager: getState().message.messager,
                checkerkey: getState().message.checkerkey,
            },
            listid,
            message
        );

        return {
            timestamp: result,
            message,
            listid,
            result: result ? true : false,
        };
    }
);

export const loginMessagerAsync = createAsyncThunk(
    "messageRedux/loginMessagerAsync",
    async ({ messager, password }) => {
        const checkerkey = await api.loginMessager(messager, password);
        return { messager, checkerkey };
    }
);

export const loginMessagerCheckerAsync = createAsyncThunk(
    "messageRedux/loginMessagerCheckerAsync",
    async ({ messager, checkerkey }) => {
        const result = await api.loginMessagerChecker({ messager, checkerkey });
        return result;
    }
);

export const addMessagerAsync = createAsyncThunk(
    "messageRedux/addMessagerAsync",
    async ({ messager, password }) => {
        const checkerkey = await api.addMessager(messager, password);
        return { messager, checkerkey };
    }
);

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        logout: (state) => {
            api.logout();
            state.messager = "";
            state.checkerkey = "";
            state.checkerkeyState = checkerkeyStateOpts.UNCONFIRMD;
            state.messageBoxsState = messageBoxsStateOpts.LOADING;
            state.messageBoxs = [];
            state.messageList = {};
        },
    },
    extraReducers: {
        [getMessageBoxsAsync.fulfilled]: (state, action) => {
            if (action.payload === false) {
                messageSlice.caseReducers.logout(state);
                return;
            }

            state.messageBoxsState = messageBoxsStateOpts.DONE;
            state.messageBoxs = action.payload;
        },
        [getMessageBoxsAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [addMessageBoxAsync.fulfilled]: (state, action) => {
            if (action.payload === false)
                messageSlice.caseReducers.logout(state);
            state.messageBoxs.unshift(action.payload);
        },
        [addMessageBoxAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [getMessageListAsync.pending]: (state) => {},
        [getMessageListAsync.fulfilled]: (state, action) => {
            console.log("getMessageListAsync p1");
            if (action.payload === false) {
                messageSlice.caseReducers.logout(state);
                return;
            }
            console.log("getMessageListAsync p2", action.payload.listid);
            console.log(
                "getMessageListAsync p3",
                action.payload.messageList,
                action.payload.messageList.length
            );
            console.log("getMessageListAsync p4", state.messageList);
            state.messageList[action.payload.listid] =
                action.payload.messageList;
            console.log(
                "getMessageListAsync p5",
                state.messageList[action.payload.listid]
            );
        },
        [getMessageListAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [addMessageAsync.fulfilled]: (state, action) => {
            if (action.payload.messageList === false) {
                messageSlice.caseReducers.logout(state);
                return;
            }

            if (!Array.isArray(state.messageList[action.payload.listid]))
                state.messageList[action.payload.listid] = [];

            state.messageList[action.payload.listid].unshift({
                messager: state.messager,
                message: action.payload.message,
                timestamp: action.payload.timestamp,
            });
        },
        [addMessageAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [loginMessagerAsync.pending]: (state) => {
            state.messagerState = messagerStateOpts.LOADING;
        },
        [loginMessagerAsync.fulfilled]: (state, action) => {
            if (action.payload.checkerkey === false) {
                messageSlice.caseReducers.logout(state);
                state.messagerState = messagerStateOpts.LOADERROR;
                return;
            }

            state.messagerState = messagerStateOpts.DONE;
            state.messager = action.payload.messager;
            state.checkerkey = action.payload.checkerkey;
            state.checkerkeyState = checkerkeyStateOpts.CONFIRMD;
        },
        [loginMessagerAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [loginMessagerCheckerAsync.fulfilled]: (state, action) => {
            if (action.payload !== true) {
                messageSlice.caseReducers.logout(state);
                return;
            }

            state.checkerkeyState = checkerkeyStateOpts.CONFIRMD;
        },
        [loginMessagerCheckerAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },

        [addMessagerAsync.pending]: (state) => {
            state.messagerState = messagerStateOpts.LOADING;
        },
        [addMessagerAsync.fulfilled]: (state, action) => {
            if (action.payload.checkerkey === false) {
                messageSlice.caseReducers.logout(state);
                state.messagerState = messagerStateOpts.ADDERROR;
                return;
            }
            state.messagerState = messagerStateOpts.DONE;
            state.messager = action.payload.messager;
            state.checkerkey = action.payload.checkerkey;
            state.checkerkeyState = checkerkeyStateOpts.CONFIRMD;
        },
        [addMessagerAsync.rejected]: (state) => {
            messageSlice.caseReducers.logout(state);
        },
    },
});

export const { logout } = messageSlice.actions;

export const selectMessagerState = (state) => state.message.messagerState;
export const selectMessager = (state) => state.message.messager;

export const selectCheckerkey = (state) => state.message.checkerkey;
export const selectCheckerkeyState = (state) => state.message.checkerkeyState;

export const selectMessageBoxs = (state) => state.message.messageBoxs;
export const selectMessageBoxsState = (state) => state.message.messageBoxsState;

export const selectMessageList = (state) => state.message.messageList;

export default messageSlice.reducer;
