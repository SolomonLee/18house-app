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

import Broadcast from "./components/Broadcast";
import LinkList from "./components/LinkList";

import { getMenus, getBroadcast } from "./apis/apiContent";
import { getMenus_LinkList } from "./adapters/atContent";

function App() {
  const [menus, setMenus] = useState([]);
  const [broadcast, setBroadcast] = useState([]);

  useEffect(() => {
    getBroadcast().then(
      (_broadcast) => {
        setBroadcast(_broadcast);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    getMenus().then(
      (_menus) => {
        setMenus(getMenus_LinkList(_menus));
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <Broadcast content={broadcast} />
          <div className="title">
            <img src="img/icon2.jpg" alt="" /> 熊村莊
          </div>
          <LinkList styleClass="menu" datas={menus} tkey="headerMenu" />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
