import * as testData from "./testData";

const _testPost = (_data, _returnTime = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(_data);
    }, _returnTime);
  });
};

export const getMenus = () => {
  return _testPost(testData.contentMenu);
};

export const getSubMenus = () => {
  return _testPost(testData.contentSubMenu);
};

export const getBroadcast = () => {
  let datas = [];
  for (const data of testData.broadcast) datas.push(data.content);

  return _testPost(datas);
};

export const getBanner = (location) => {
  return _testPost(
    testData.banners.filter((banner) => {
      return banner.location == location;
    })
  );
};

// HOME
export const getHomeShowCase = () => {
  let datas = [];
  for (const data of testData.albums) {
    if (data.showAtHome) {
      datas.push(data);
      if (datas.length > 10) break;
    }
  }
  return _testPost(datas);
};
// HOME : END

// ABOUT
export const getAboutInfo = () => {
  return _testPost(testData.aboutInfo);
};

// ABOUT : END

// Contact
export const getContactDatas = () => {
  //_contactDatas
  return _testPost(testData.contactInfo);
};
// Contact : END
