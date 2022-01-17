import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../application/Home";
import User from "../application/system/user/user";
import Role from "../application/system/role/role";
import Log from "../application/system/log/log";
import History from "../application/history/history";
import Host from "../application/route/host/host";
import Channel from "../application/route/channel/channel";
import Login from "../application/login/Login";
import Main from "../application/main/index";
import Strain from "../application/strain/index";

let routes = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/",
    component: Home,
    // exact: true,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/main"} />,
      },
      {
        path: "/user",
        exact: true,
        component: User,
      },
      {
        path: "/role",
        exact: true,
        component: Role,
      },
      {
        path: "/log",
        exact: true,
        component: Log,
      },
      {
        path: "/host",
        exact: true,
        component: Host,
      },
      {
        path: "/channel",
        exact: true,
        component: Channel,
      },
      {
        path: "/history",
        exact: true,
        component: History,
      },
      {
        path: "/main",
        exact: true,
        component: Main,
      },
      {
        path: "/strain",
        exact: true,
        component: Strain,
      },
    ],
  },
];

export default routes;
