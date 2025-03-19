import React, { useState, useEffect, useRef } from 'react';

import Sidebar from './Sidebar';
import { useStateContext } from '../ContextProvider';

import { Menu, MenuItem } from '@mui/material';
import {RiNotificationLine, RiSearchLine, RiMessageLine} from "@remixicon/react";


function HoverCard({ type }) {
  const { palette } = useStateContext();

  const notifications = [
    {id: 1, profile: "https://picsum.photos/200/300", name: "System", descr: "Check out new dashboard update"},
    {id: 2, profile: "https://picsum.photos/200/300", name: "System", descr: "Finish setting up your account"},
    {id: 3, profile: "https://picsum.photos/200/300", name: "John Doe", descr: "@JohnDoe shared their statistics"},
    {id: 4, profile: "https://picsum.photos/200/300", name: "Laura Lee", descr: "@LauraLee invited you to a chat"},
    {id: 5, profile: "https://picsum.photos/200/300", name: "John Doe", descr: "@JohnDoe visited your page"},
    {id: 6, profile: "https://picsum.photos/200/300", name: "John Doe", descr: "@JohnDoe sent you a friend request"},
    {id: 7, profile: "https://picsum.photos/200/300", name: "System", descr: "Finish setting up your account"},
  ]; 

  const messages = [
    {id: 1, profile: "https://picsum.photos/200/300", name: "Jane Doe", descr: "Very happy to hear back from you..."},
  ];

  const data = type === "notification" ? notifications : messages;

  return (
    <div className="hover-card" style={{backgroundColor: palette.primary[900], color: palette.grey[100]}}>
      <div className="top">
        <h1>{type === "notification" ? "Notifications" : "Messages"} <span>{data.length}</span></h1>
      </div>

      <div className="bottom">
        <ul>
          {data.map(item => (
            <div id="div" key={item.id}>
              <img src={item.profile} alt="" />
              <div style={{color: palette.grey[100]}}>
                <h2>{item.name}</h2>
                <h3 style={{color: palette.grey[300]}}>{item.descr}</h3>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SearchCard({ searchTerm }) {
  const { palette } = useStateContext();

  const data = [
    {name: "dashboard", url: "/", id: 1},
    {name: "users", url: "/users", id: 2},
    {name: "products", url: "/products", id: 3},
    {name: "admins", url: "/admins", id: 4},
    {name: "transactions", url: "/transactions", id: 5},
    {name: "overview", url: "/overview", id: 6},
    {name: "geography", url: "/geography", id: 7},
    {name: "breakdown", url: "/breakdown", id: 8},
  ]

  const filteredData = searchTerm
    ? data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="search-card" style={{backgroundColor: palette.primary[900], color: palette.grey[100]}}>

      <div className="bottom">
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map(item => (
            <a style={{color: palette.grey[100]}} href={item.url} id="div" key={item.id}>
              <img src={item.profile} alt="" />
              <div>
                <h2>{item.name}</h2>
                <h3>{item.descr}</h3>
              </div>
            </a>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
      </div>
    </div>
  )
}

export default function Navbar() {
  const { palette } = useStateContext();
  
  const [isSidebar, setIsSidebar] = useState(true);
  const [navState, setNavState] = useState(false);

  function toggleNav() {
      setNavState(!navState);
  }

  function handleResize() {
    if (window.innerWidth >= 900) {
      setIsSidebar(false);
    }
  }

  useEffect(() => {
    handleResize();
  })

  window.addEventListener("resize", handleResize);

  // cards logic
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  };

  function toggleNotifications() {
    setShowNotifications(!showNotifications);
    setShowMessages(false);
  }

  function toggleMessages() {
    setShowMessages(!showMessages);
    setShowNotifications(false); 
  };

  function toggleSearch() {
    setIsSearching(!isSearching);
  }

  const notifRef = useRef(null);
  const msgRef = useRef(null);

  function handleClickOutside(e) {
    if (notifRef.current && !notifRef.current.contains(e.target)) {
      setShowNotifications(false);
    }
    if (msgRef.current && !msgRef.current.contains(e.target)) {
      setShowMessages(false);
    }
  };

  useEffect(() => {
    if (showNotifications || showMessages || isSearching) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showMessages, isSearching]);
  

  // menu logic
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <>
        <nav>
         
            <div className={`hamburger-menu ${navState ? "active" : ""}`} onClick={toggleNav}>
                <div className="bar" style={{backgroundColor: palette.primary[100]}}></div>
                <div className="bar" style={{backgroundColor: palette.primary[100]}}></div>
                <div className="bar" style={{backgroundColor: palette.primary[100]}}></div>
            </div>

            <form className="search" style={{color: palette.grey[100]}} onClick={toggleSearch}> 
              <input value={searchTerm} style={{color: "inherit"}}
              onChange={(e) => {handleInputChange(e)}}
              type="text" placeholder='Search...' />
              <RiSearchLine color={palette.grey[100]} size={20} className="icon" />

              {isSearching && <SearchCard searchTerm={searchTerm} />}
            </form>

            <div className="items">
              <div className="item notifs" ref={notifRef} onClick={toggleNotifications}>
                <RiNotificationLine color={palette.grey[100]} className="icon" />
                <div className="counter">7</div>
                {showNotifications && <HoverCard type="notification" />}
              </div>

              <div className="item messages" ref={msgRef} onClick={toggleMessages}>
                <RiMessageLine color={palette.grey[100]} className="icon" />
                <div className="counter">1</div>
                {showMessages && <HoverCard type="message" />}
              </div>

              <div onClick={handleClick} className="item user">
                <span>L</span>
              </div>
              
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledBy': 'basic-button'}}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          
        </nav>
        {
          isSidebar && (
            <Sidebar className={`${navState ? "open" : "closed"}`}  />
          )
        }
    </>
  )
}
