// import * as testData from "./testData";
import db from "./apiFireStroe";

var docAlbumTypesRef = db.collection("AlbumTypes").doc("Cve4MU3eQouqwz6WB1km");
var docAlbumsHomeRef = db.collection("AlbumTypes").doc("37msG5yxCDFCn52iWDU2");
var docAlbumsRef = db.collection("Albums").doc("Z0yI4HH8kn38Hvysu7nZ");

export const getAlbumTypes = async () => {
  let albumTypes;

  await docAlbumTypesRef.get().then((doc) => {
    if (doc.exists) {
      albumTypes = doc.data().datas;
    }
  });

  return albumTypes;
};

// export const _getAlbums = (_fliter) => {
//   return _testPost(
//     testData.albums.filter((album) => {
//       for (var name in _fliter) {
//         if (!_fliter[name].val) continue;
//         if (_fliter[name].val != album[name]) return false;
//       }
//       return true;
//     })
//   );
// };

export const getAlbums = async () => {
  let albums = [];

  await docAlbumsRef.get().then((doc) => {
    if (doc.exists) albums = doc.data().datas;
  });

  return albums;
};

export const getHomeAlbumIds = async () => {
  let homeAlbumIds = [];

  await docAlbumsHomeRef.get().then((doc) => {
    if (doc.exists) homeAlbumIds = doc.data().datas.home;
  });

  return homeAlbumIds;
};

export const getHomeAlbums = async () => {
  // const albums = await _getAlbums();
  // console.log("albums : ", albums);
  // return albums;
};
