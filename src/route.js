import PageHome from "./components/page/PageHome";
import PageAlbum from "./components/page/PageAlbum";
import PageAbout from "./components/page/PageAbout";
import PageSchedule from "./components/page/PageSchedule";
import PageCharge from "./components/page/PageCharge";
import PageContact from "./components/page/PageContact";
import PageFAQ from "./components/page/PageFAQ";
import PageProduct from "./components/page/PageProduct";
import PageLogin from "./components/page/PageLogin";
import PageBackend from "./components/page/PageBackend";
import PageBackendQuestions from "./components/page/PageBackendQuestions";

import { Route } from "react-router-dom";

export const routes = [
  {
    path: "/Home",
    component: PageHome,
  },
  {
    path: "/Album",
    component: PageAlbum,
  },
  {
    path: "/About",
    component: PageAbout,
  },
  {
    path: "/Schedule",
    component: PageSchedule,
  },
  {
    path: "/Contact",
    component: PageContact,
  },
  {
    path: "/Charge",
    component: PageCharge,
  },
  {
    path: "/FAQ",
    component: PageFAQ,
  },
  {
    path: "/Product/:pid",
    component: PageProduct,
  },
  {
    path: "/Login",
    component: PageLogin,
  },
  {
    path: "/Backend",
    component: PageBackend,
    routes: [
      {
        path: "/Backend/Questions",
        component: PageBackendQuestions,
      },
    ],
  },

  {
    path: "/",
    component: PageHome,
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
