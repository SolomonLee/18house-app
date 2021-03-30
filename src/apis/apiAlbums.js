import * as testData from "./testData";

const _testPost = (_data, _returnTime = 500) => {
  const _dataClone = JSON.parse(JSON.stringify(_data));

  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(_dataClone);
    }, _returnTime);
  });
};

export const getAlbumTypes = () => {
  return _testPost(testData.albumTypes);
};

export const getAlbums = (_fliter) => {
  return _testPost(
    testData.albums.filter((album) => {
      for (var name in _fliter) {
        if (!_fliter[name].val) continue;
        if (_fliter[name].val != album[name]) return false;
      }
      return true;
    })
  );
};
