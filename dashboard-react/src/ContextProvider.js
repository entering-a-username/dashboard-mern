import { create } from "@mui/material/styles/createTransitions";
import React, {createContext, useContext, useState} from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

const initialTheme = localStorage.getItem("theme") || "light";


export const ContextProvider = ({ children }) => {
    const [isClicked, setIsClicked] = useState(initialState);
    const [theme, setTheme] = useState(initialTheme);

    function changeTheme(newTheme) {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    function handleClick(clicked) {
        setIsClicked({...initialState, [clicked]: true});
    }
    return (
        <StateContext.Provider value={{ isClicked, setIsClicked, handleClick, theme, changeTheme }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);