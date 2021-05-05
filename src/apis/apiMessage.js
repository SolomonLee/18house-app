import db from "./apiFireStroe";
import { storage, initSession } from "../common/sessionStorageExtend";
import { randomString as makeCheckerKey } from "../common/random";

initSession({
    messager: "aae8586f4fc5eb6f7755d918b789ad7b",
    checkerkey: "1e9890980dcd73fe40cc1232ca76b6d5",
    messageBoxs: "72b92fd85af3220dad5dabe7b445767a",
    messageList: "91234d38305dfd36490021fe88c3d8d6",
});

const collectionMessageBox = db.collection("MessageBox");
const collectionMessageList = db.collection("MessageList");
const collectionMessager = db.collection("Messager");

export const getStorage = () => storage;

export const getMessageBoxs = async function () {
    if (!(await loginMessagerChecker(this))) return false;

    const messageBoxs = [];

    await collectionMessageBox
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                messageBoxs.push(doc.data());
            });
        })
        .catch(() => {
            console.log("getMessageBox error!!!");
        });

    storage.messageBoxs.set(messageBoxs);
    return messageBoxs;
};

export const addMessageBox = async function (messageBox) {
    if (!(await loginMessagerChecker(this))) return false;
    if (!messageBox?.title || messageBox.title === "") return false;

    const timestamp = new Date().getTime();
    const _messageBox = {
        content: messageBox?.content || "",
        listid: `${timestamp}_${makeCheckerKey(10)}`,
        messager: this.messager,
        timestamp: timestamp,
        title: messageBox?.title,
    };

    await collectionMessageBox
        .doc()
        .set(_messageBox)
        .catch(() => {
            return false;
        });

    return _messageBox;
};

export const getMessageList = async function (listid) {
    if (!(await loginMessagerChecker(this))) return false;

    let messageList = [];

    await collectionMessageList
        .doc(listid)
        .collection("Messages")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                messageList.push({
                    ...doc.data(),
                });
            });
        })
        .catch(() => {
            console.log("getMessageList error!!!");
        });

    let storageMessageList = storage.messageList.get();
    if (storageMessageList === null) storageMessageList = {};
    storageMessageList[listid] = messageList;
    storage.messageList.set(storageMessageList);

    return messageList;
};

export const addMessage = async function (listid, message) {
    if (!(await loginMessagerChecker(this))) return false;
    if (typeof message != "string" || message.length == 0) return false;

    const timestamp = new Date().getTime();
    await collectionMessageList
        .doc(listid)
        .collection("Messages")
        .doc()
        .set({
            message: message,
            messager: this.messager,
            timestamp: timestamp,
        })
        .catch(() => {
            return false;
        });
    return timestamp;
};

const setLoginChecker = (
    messager,
    password,
    checkerkey = makeCheckerKey(30),
    timestamp = new Date().getTime()
) => {
    storage.messager.set(messager);
    storage.checkerkey.set(checkerkey);

    setTimeout(() => {
        collectionMessager
            .doc(messager)
            .set({
                checkerkey: checkerkey,
                password: password,
                timestamp: timestamp + 90000 /*15 min*/,
            })
            .catch(() => {
                console.log("loginMessager set error!!!");
            });
    });
    return checkerkey;
};

export const logout = async () => {
    console.log("logout");
    storage.messager.set(null);
    storage.checkerkey.set(null);
    storage.messageList.set(null);

    return true;
};

// first login
export const loginMessager = async (messager, password) => {
    if (!(messager && password)) return false;
    let checkerkey = false;
    await collectionMessager
        .doc(messager)
        .get()
        .then((doc) => {
            if (doc.exists) {
                if (password === doc.data().password) {
                    checkerkey = setLoginChecker(messager, password);
                }
            }
        })
        .catch(() => {
            console.log("loginMessager login error!!!");
        });

    return checkerkey;
};

// every action checker
export const loginMessagerChecker = async ({ messager, checkerkey }) => {
    if (
        typeof messager !== "string" ||
        typeof checkerkey !== "string" ||
        messager == "" ||
        checkerkey == ""
    )
        return !logout();

    const timestamp = new Date().getTime();
    let isLogin = false;
    await collectionMessager
        .doc(messager)
        .get()
        .then((doc) => {
            if (doc.exists) {
                isLogin =
                    checkerkey === doc.data().checkerkey &&
                    timestamp < doc.data().timestamp;

                if (isLogin) {
                    setLoginChecker(
                        messager,
                        doc.data().password,
                        doc.data().checkerkey,
                        doc.data().timestamp
                    );
                }
            }
        })
        .catch(() => {
            logout();
            console.log("loginMessagerChecker check error!!!");
        });

    if (!isLogin) logout();
    return isLogin;
};

export const addMessager = async (messager, password) => {
    if (!(messager && password)) return false;

    let checkerkey = false;
    await collectionMessager
        .doc(messager)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                checkerkey = setLoginChecker(messager, password);
            }
        })
        .catch(() => {
            console.log("loginMessager login error!!!");
        });

    return checkerkey;
};
