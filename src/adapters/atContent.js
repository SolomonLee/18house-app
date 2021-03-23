export const getMenus_LinkList = (datas) => {
  return datas.map((data) => {
    return { url: data.url, content: data.title };
  });
};

export const getHomeShowCase_SlideList = (datas) => {
  return datas.map((data) => {
    return {
      type: "Showcase",
      title: data.title,
      subTitle: data.subTitle,
      imgUrl: data.img,
      imgAlt: data.imgAlt,
      url: data.url,
    };
  });
};

export const getContactDatas_ListItem = (datas) => {
  return datas.map((data) => {
    return {
      title: data.title,
      datas: data.contents,
    };
  });
};
