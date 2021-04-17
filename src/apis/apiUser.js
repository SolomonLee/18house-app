import db from "./apiFireStroe";

var userCollection = db.collection("User");

export const login = async (user) => {
  const result = {
    state: false,
    user: {
      type: "遊客",
      name: "",
      birthday: "",
    },
  };
  await userCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (
        doc.data().email === user.email &&
        doc.data().password === user.password
      ) {
        result.state = true;
        result.user.type = doc.data().type;
        result.user.birthday = doc.data().birthday;
        result.user.name = doc.data().name;
        return;
      }
    });
  });

  return result;
};
