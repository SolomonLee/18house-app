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

export const getAlbumTypes_FliterBox = (datas, selector = {}) => {
  return datas.map((collapse) => {
    if (!selector?.[collapse.gtid]) selector[collapse.gtid] = { val: 0 };

    collapse.contents.unshift({ id: 0, title: "All" });
    return {
      title: collapse.title,
      gid: collapse.gtid,
      select: selector[collapse.gtid],
      content: collapse.contents.map((radio) => {
        return {
          id: radio.id,
          title: radio.title,
          content: selector[collapse.gtid],
        };
      }),
    };
  });
};
