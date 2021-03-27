import * as testData from "./testData";

const _testPost = (_data, _returnTime = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(_data);
    }, _returnTime);
  });
};

export const getAlbumTypes = () => {
  return _testPost(testData.albumTypes);
};

export const getAlbums = (type) => {
  return _testPost(
    testData.albums.filter((album) => {
      if (album.type === type) return true;
      return false;
    })
  );
};
