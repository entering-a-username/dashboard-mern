import React, { useState, useEffect, useContext } from 'react';

// import { ColorModeContext, tokens } from "../theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";

import { useLocation } from 'react-router-dom';
import {RiGroup2Fill, RiCalendarFill, RiUserFill, RiLogoutBoxFill, RiNewsFill, RiSettings2Fill, RiBarChart2Fill, RiUbuntuFill, RiDashboardFill, RiProductHuntFill, RiOrderPlayFill, RiTruckFill, RiNotification2Fill} from "@remixicon/react";
// import { useTheme } from '@emotion/react';

import { useStateContext } from '../ContextProvider';

export default function Sidebar({className}) {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);

  const { theme, changeTheme } = useStateContext();

  function handleThemeChange(theme) {
    changeTheme(theme);

    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

  const location = useLocation();
  // give it right shadow

  return (
    <div className={`sidebar ${className}`}>
      <a className="logo-href" href="/"><span className="logo">dashboard</span></a>

      <hr />

      <div className="center">
        {/* hrefs and not Links because i need to restart to close sidebar */}
        
        <ul>
          <p className="title">MAIN</p>
          <li className={`${location.pathname === '/' ? 'active' : ''}`}>
            <RiDashboardFill className="icon" />
            <a href="/"><span>Dashboard</span></a>
          </li>

          <p className="title">LISTS</p>
          <li className={`${location.pathname === '/users' ? 'active' : ''}`}>
            <RiGroup2Fill className="icon" />
            <a href="/users"><span>Users</span></a>
          </li>

          <li className={`${location.pathname === '/products' ? 'active' : ''}`}>
            <RiProductHuntFill className="icon" />
            <a href="/products"><span>Products</span></a>
          </li>

          <li className={`${location.pathname === '/orders' ? 'active' : ''}`}>
            <RiOrderPlayFill className="icon" />
            <a href="/orders"><span>Orders</span></a>
          </li>

          <li className={`${location.pathname === '/delivery' ? 'active' : ''}`}>
            <RiTruckFill className="icon" />
            <a href="/delivery"><span>Delivery</span></a>
          </li>

          <p className="title">USEFUL</p>
          <li className={`${location.pathname === '/stats' ? 'active' : ''}`}>
            <RiBarChart2Fill className="icon" />
            <a href="/stats"><span>Stats</span></a>
          </li>

          <li className={`${location.pathname === '/notifications' ? 'active' : ''}`}>
            <RiNotification2Fill className="icon" />
            <a href="/notifications"><span>Notifications</span></a>
          </li>

          <li className={`${location.pathname === '/calendar' ? 'active' : ''}`}>
            <RiCalendarFill className="icon" />
            <a href="/calendar"><span>Calendar</span></a>
          </li>

          <p className="title">SERVICE</p>
          <li>
            <RiUbuntuFill className="icon" />
            <span>System Health </span>
          </li>

          <li>
            <RiNewsFill className="icon" />
            <span>Logs</span>
          </li>

          <li>
            <RiSettings2Fill className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER</p>
          <li className={`${location.pathname === '/profile' ? 'active' : ''}`}>
            <RiUserFill className="icon" />
            <a href="/profile"><span>Profile</span></a>
          </li>

          <li>
            <RiLogoutBoxFill className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="color-option light" onClick={() => handleThemeChange("light")}></div>
        <div className="color-option dark" onClick={() => handleThemeChange("dark")}></div>
      </div>
    </div>
  )
}
