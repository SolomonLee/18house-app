import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import PageHome from "./components/page/PageHome";
import PageAlbum from "./components/page/PageAlbum";
import PageAbout from "./components/page/PageAbout";
import PageSchedule from "./components/page/PageSchedule";
import PageCharge from "./components/page/PageCharge";
import PageContact from "./components/page/PageContact";
import PageFAQ from "./components/page/PageFAQ";

import Broadcast from "./components/Broadcast";
import LinkList from "./components/LinkList";
import Split from "./components/Split";
import Loading from "./components/Loading";
import SocialFlowBox from "./components/SocialFlowBox";

import { getMenus, getSubMenus, getBroadcast } from "./apis/apiContent";
import { getMenus_LinkList } from "./adapters/atContent";

function App() {
  const [menus, setMenus] = useState([]);
  const [subMenus, setSubMenus] = useState([]);
  const [broadcast, setBroadcast] = useState([]);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    const loadBroadcast = getBroadcast().then(
      (_broadcast) => {
        setBroadcast(_broadcast);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    const loadMenus = getMenus().then(
      (_menus) => {
        setMenus(getMenus_LinkList(_menus));
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    const loadSubMenus = getSubMenus().then(
      (_subMenus) => {
        setSubMenus(getMenus_LinkList(_subMenus));
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    Promise.all([loadBroadcast, loadMenus, loadSubMenus])
      .catch(() => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      })
      .finally(() => {
        setOnloading(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Loading loading={onloading} content="loading" type="web" />
        <header>
          <Broadcast content={broadcast} />
          <div className="title">
            <img src="img/icon2.jpg" alt="" /> 熊村莊
          </div>
          <LinkList styleClass="header_menu" datas={menus} tkey="headerMenu" />
        </header>
        <Switch>
          <Route exact path="/">
            <PageHome />
          </Route>
          <Route exact path="/Album">
            <PageAlbum />
          </Route>
          <Route exact path="/About">
            <PageAbout />
          </Route>
          <Route exact path="/Schedule">
            <PageSchedule />
          </Route>
          <Route exact path="/Charge">
            <PageCharge />
          </Route>
          <Route exact path="/Contact">
            <PageContact />
          </Route>
          <Route exact path="/FAQ">
            <PageFAQ />
          </Route>
        </Switch>
        <footer>
          <Split content="熊村莊" />
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <LinkList
                  styleClass="footer_menu"
                  datas={menus}
                  tkey="footerMainMenu"
                />
              </div>
              <div className="col-md-4">
                <SocialFlowBox />
              </div>
              <div className="col-md-4">
                <LinkList
                  styleClass="footer_menu"
                  datas={subMenus}
                  tkey="footerSubMenu"
                />
              </div>
            </div>
          </div>
          <p className="by">2021 by Solomon</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
