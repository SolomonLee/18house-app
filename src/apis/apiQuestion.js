import db from "./apiFireStroe";

var docContentQuestionCollection = db.collection("ContentQuestion");

export const setQuestion = async (data) => {
    await docContentQuestionCollection
        .add({
            name: data.name,
            email: data.email,
            title: data.title,
            content: data.content,
            ans: "尚未回答",
        })
        .then((docRef) => {
            // console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    return;
};

export const getQuestion = async () => {
    const questions = [];

    await docContentQuestionCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //   console.log(`${doc.id} => ${doc.data()}`);
            if (
                questions.find((question) => {
                    return (
                        question.title == doc.data().title &&
                        question.email == doc.data().email
                    );
                }) === undefined
            )
                questions.push({ ...doc.data(), id: doc.id });
        });
    });

    // console.log(questions);

    return questions;
};

export const getQuestionId = async () => {
    const questions = [];

    await docContentQuestionCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //   console.log(`${doc.id} => ${doc.data()}`);
            if (
                questions.find((question) => {
                    return (
                        question.title == doc.data().title &&
                        question.email == doc.data().email
                    );
                }) === undefined
            )
                questions.push({
                    title: doc.data().title,
                    id: doc.id,
                    isAns: doc.data().ans !== "尚未回答",
                });
        });
    });

    return questions;
};

export const getQuestionById = async (id) => {
    let questions = {};

    await docContentQuestionCollection
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                questions = doc.data();
            }
        });

    return questions;
};

export const updateQuestionById = async (id, question) => {
    const result = { result: false };

    await docContentQuestionCollection
        .doc(id)
        .update(question)
        .then(() => {
            result.result = true;
            //   console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            //   console.error("Error updating document: ", error);
        });

    return result;
};
