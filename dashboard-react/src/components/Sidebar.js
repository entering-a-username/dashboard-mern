import React from 'react';

import { useStateContext } from '../ContextProvider';
import { useLocation } from 'react-router-dom';
import {RiGroup2Fill, RiAdminFill, RiPieChart2Fill, RiEarthFill, RiBarChart2Fill, RiDashboardFill, RiProductHuntFill, RiOrderPlayFill} from "@remixicon/react";

export default function Sidebar({className}) {
  const { changeTheme, palette } = useStateContext();

  function handleThemeChange(theme) {
    changeTheme(theme);

    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

  const location = useLocation();

  return (
    <div className={`sidebar ${className}`}>
      <a style={{color: palette.blue_accent[200]}} className="logo-href" href="/"><span className="logo">dashboard</span></a>

      <hr />

      <div className="center">
        {/* hrefs and not Links because i need to restart to close sidebar */}
        
        <ul>
          <p className="title">MAIN</p>
          <li className={`${location.pathname === '/' ? 'active' : ''}`}>
            <RiDashboardFill color={palette.blue_accent[400]} className="icon" />
            <a href="/"><span>Dashboard</span></a>
          </li>

          <p className="title">LISTS</p>
          <li className={`${location.pathname === '/users' ? 'active' : ''}`}>
            <RiGroup2Fill color={palette.blue_accent[400]} className="icon" />
            <a href="/users"><span>Users</span></a>
          </li>

          <li className={`${location.pathname === '/products' ? 'active' : ''}`}>
            <RiProductHuntFill color={palette.blue_accent[400]} className="icon" />
            <a href="/products"><span>Products</span></a>
          </li>

          <li className={`${location.pathname === '/admins' ? 'active' : ''}`}>
            <RiAdminFill color={palette.blue_accent[400]} className="icon" />
            <a href="/admins"><span>Admins</span></a>
          </li>

          <li className={`${location.pathname === '/transactions' ? 'active' : ''}`}>
            <RiOrderPlayFill color={palette.blue_accent[400]} className="icon" />
            <a href="/transactions"><span>Transactions</span></a>
          </li>

          <p className="title">STATS</p>
          <li className={`${location.pathname === '/overview' ? 'active' : ''}`}>
            <RiBarChart2Fill color={palette.blue_accent[400]} className="icon" />
            <a href="/overview"><span>Overview</span></a>
          </li>

          <li className={`${location.pathname === '/geography' ? 'active' : ''}`}>
            <RiEarthFill color={palette.blue_accent[400]} className="icon" />
            <a href="/geography"><span>Geography</span></a>
          </li>

          <li className={`${location.pathname === '/breakdown' ? 'active' : ''}`}>
            <RiPieChart2Fill color={palette.blue_accent[400]} className="icon" />
            <a href="/breakdown"><span>Breakdown</span></a>
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
