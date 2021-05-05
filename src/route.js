import { lazy } from "react";

import { Route } from "react-router-dom";

export const routes = [
  {
    path: "/Home",
    component: lazy(() => import("./components/page/PageHome")),
  },
  {
    path: "/Album",
    component: lazy(() => import("./components/page/PageAlbum")),
  },
  {
    path: "/About",
    component: lazy(() => import("./components/page/PageAbout")),
  },
  {
    path: "/Backend",
    component: lazy(() => import("./components/page/PageBackend")),
    routes: [
      {
        path: "/Backend/Questions",
        component: lazy(() => import("./components/page/PageBackendQuestions")),
      },
    ],
  },
  {
    path: "/Contact",
    component: lazy(() => import("./components/page/PageContact")),
  },
  {
    path: "/Charge",
    component: lazy(() => import("./components/page/PageCharge")),
  },
  {
    path: "/FAQ",
    component: lazy(() => import("./components/page/PageFAQ")),
  },
  {
    path: "/Login",
    component: lazy(() => import("./components/page/PageLogin")),
  },
  {
    path: "/Product/:pid",
    component: lazy(() => import("./components/page/PageProduct")),
  },
  {
    path: "/Message",
    component: lazy(() => import("./components/page/PageMessage")),
  },
  {
    path: "/Schedule",
    component: lazy(() => import("./components/page/PageSchedule")),
  },
  {
    path: "/",
    component: lazy(() => import("./components/page/PageHome")),
  },
];

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export default routes;
