const _menus = [
  { tag: "Home", title: "首頁", url: "/" },
  { tag: "Album", title: "作品集", url: "/Album" },
  { tag: "About", title: "關於熊村莊", url: "/About" },
  { tag: "Schedule", title: "課程表", url: "/Schedule" },
  { tag: "Charge", title: "收費方式", url: "/Charge" },
  { tag: "Contact", title: "聯絡我們", url: "/Contact" },
];

const _subMenus = [{ tag: "FAQ", title: "FAQ", url: "/" }];

const _getBroadcast = [
  "網站製作中",
  "終於看到頁面",
  "面面俱到",
  "到哪了啦",
  "啦拉拉",
];

const _getHomeBanner = [
  {
    id: 1,
    imgUrl: "/img/test_down.jpg",
    imgAlt: "test1",
  },
  {
    id: 2,
    imgUrl: "/img/test_down.jpg",
    imgAlt: "test2",
  },
  {
    id: 3,
    imgUrl: "/img/test_down.jpg",
    imgAlt: "test3",
  },
];

const _getHomeShowCase = [
  {
    pid: 1,
    img: "/img/test_down.jpg",
    imgAlt: "test1",
    title: "PRODUCT1",
    subTitle: "I'm PRODUCT1",
    url: "/",
  },
  {
    pid: 2,
    img: "/img/test_down.jpg",
    imgAlt: "test2",
    title: "PRODUCT2",
    subTitle: "I'm PRODUCT2",
    url: "/",
  },
  {
    pid: 3,
    img: "/img/test_down.jpg",
    imgAlt: "test3",
    title: "PRODUCT3",
    subTitle: "I'm PRODUCT3",
    url: "/",
  },
  {
    pid: 4,
    img: "/img/test_down.jpg",
    imgAlt: "test4",
    title: "PRODUCT4",
    subTitle: "I'm PRODUCT4",
    url: "/",
  },
  {
    pid: 5,
    img: "/img/test_down.jpg",
    imgAlt: "test5",
    title: "PRODUCT5",
    subTitle: "I'm PRODUCT5",
    url: "/",
  },
];

let _contactDatas = [
  { title: "到店參觀", contents: ["新北市XXXX", "中山路段段18號"] },
  {
    title: "營業時間",
    contents: [
      "平日: 7:00 ~ 開到開心",
      "假日: 睡到開心 ~ 開到開心",
      "過年: 睡到開心",
    ],
  },
  {
    title: "聯絡方式",
    contents: ["電話: 02-xxxxxxxx", "email: ABC@gmail.com"],
  },
];

const _testPost = (_data, _returnTime = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(_data);
    }, _returnTime);
  });
};

export const getMenus = () => {
  return _testPost(_menus);
};

export const getSubMenus = () => {
  return _testPost(_subMenus);
};

export const getBroadcast = () => {
  return _testPost(_getBroadcast);
};

export const getHomeBanner = () => {
  return _testPost(_getHomeBanner);
};

export const getHomeShowCase = () => {
  return _testPost(_getHomeShowCase);
};

export const getContactDatas = () => {
  return _testPost(_contactDatas);
};
