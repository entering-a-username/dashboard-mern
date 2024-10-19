import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Cart from "./Cart";
import Chat from './Chat';
import Notification from "./Notification";

import {RiNotificationLine, RiSearchLine, RiEarthLine, RiMessageLine} from "@remixicon/react";

// import {Cart, Chat, Notification, UserProfile} from ".";
import { useStateContext } from '../ContextProvider';


// on sms jus red dot if new
const NavBtn = ({title, customFunc, icon, color, dotColor}) => {
  <button type='button' onClick={customFunc} style={{color}}
  className='relative text-xl rounded-full p-3 hover:'
  >

    <span style={{background: dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'>
        {icon}
        <h1>gglglglg</h1>
    </span>

  </button>
}


export default function Navbar() {
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

  
  const {isClicked, setIsClicked, handleClick} = useStateContext();

  
  
  return (
    <>
        <nav>
         
            <div className={`hamburger-menu ${navState ? "active" : ""}`} onClick={toggleNav}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <div className="search"> 
              <input type="text" placeholder='Search...' />
              <RiSearchLine size={20} className="icon" />
            </div>

            <div className="items">

              <div>
                <NavBtn title="Cart" customFunc={() => handleClick("cart")}
                color="blue" icon="" ></NavBtn>


                <NavBtn title="Chat" dotColor="03c9d7" customFunc={() => handleClick("chat")}
                color="blue" icon="" ></NavBtn>

                <NavBtn title="Notifications" customFunc={() => handleClick("notification")}
                color="blue" icon="" ></NavBtn>


                {isClicked.cart && <Cart />}
                {isClicked.chat && <Chat />}
                {isClicked.Notification && <Notification />}
                {isClicked.userProfile && <userProfile />}
              </div>

              <div className="language-item item">
                <RiEarthLine className="icon" />
                English
              </div>
            
              <div className="item">
                <RiNotificationLine className="icon" />
                <div className="counter">1</div>
              </div>
            
              <div className="item">
                <RiMessageLine className="icon" />
                <div className="counter">2</div>
              </div>

            
              <div className="item">
                <img src="https://picsum.photos/200/300" alt="" className="user" />
              </div>
              
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
