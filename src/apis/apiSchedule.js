import * as testData from "./testData";

const _testPost = (_data, _returnTime = 500) => {
  const _dataClone = JSON.parse(JSON.stringify(_data));
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(_dataClone);
    }, _returnTime);
  });
};

// Schedule
export const getScheduleDatas = () => {
  return _testPost(testData.contentSchedule);
};
// Schedule : END
