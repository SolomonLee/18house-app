import db from "./apiFireStroe";

var docBroadcastRef = db.collection("Broadcast").doc("JBPWxliwvu0dLvkx909d");
var docBannerRef = db.collection("Banners").doc("56suDEeM9uJbUc23QbaX");
var docAboutInfoRef = db.collection("AboutInfo").doc("kgcThMIcWO7J5YqXCqRK");
var docContentFAQRef = db.collection("ContentFAQ").doc("CW0tEaUSsNODGc01UdSA");
var docContactInfoRef = db
  .collection("ContactInfo")
  .doc("A0LQm3FB3YZ3g3ITypcC");
var docContentChargeRef = db
  .collection("ContentCharge")
  .doc("bZgIm9m5XigCGUqHCCRN");

var docContentQuestionCollection = db.collection("ContentQuestion");

export const getBroadcast = async () => {
  const broadcast = [];

  await docBroadcastRef.get().then((doc) => {
    if (doc.exists) {
      doc.data().datas.forEach((element) => {
        broadcast.push(element);
      });
    }
  });

  return broadcast;
};

export const getBanner = async (location) => {
  const banners = [];

  await docBannerRef.get().then((doc) => {
    if (doc.exists) {
      doc.data().datas.forEach((element) => {
        element[location].forEach((banner) => banners.push(banner));
      });
    }
  });

  return banners;
};

// HOME
// HOME : END

// ABOUT
export const getAboutInfo = async () => {
  const aboutInfo = {};

  await docAboutInfoRef.get().then((doc) => {
    if (doc.exists) {
      const dataCol = doc.data();
      console.log("doc.data()", doc.data());
      aboutInfo.title = dataCol.title;
      aboutInfo.contents = dataCol.contents;
    }
  });

  return aboutInfo;
};

// ABOUT : END

// Contact
export const getContactDatas = async () => {
  let contactInfo = {};

  await docContactInfoRef.get().then((doc) => {
    if (doc.exists) {
      contactInfo = doc.data();
    }
  });

  return contactInfo;
};
// Contact : END

// Charge
export const getChargeDatas = async () => {
  let chargeDatas = {};

  await docContentChargeRef.get().then((doc) => {
    if (doc.exists) {
      chargeDatas = doc.data().datas;
    }
  });

  return chargeDatas;
};
// Charge : END

// FAQ
export const getFAQ = async () => {
  let contentFAQ = {};

  await docContentFAQRef.get().then((doc) => {
    if (doc.exists) {
      contentFAQ = doc.data().datas;
    }
  });

  //_contactDatas
  return contentFAQ;
};

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
      console.log("Document written with ID: ", docRef.id);
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
      console.log(`${doc.id} => ${doc.data()}`);
      if (
        questions.find((question) => {
          return (
            question.title == doc.data().title &&
            question.email == doc.data().email
          );
        }) === undefined
      )
        questions.push(doc.data());
    });
  });

  return questions;
};
// FAQ : END
