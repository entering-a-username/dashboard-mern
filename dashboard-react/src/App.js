import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./styles/main.scss";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from "./pages/Home";
import List from "./pages/List";
import New from "./pages/New";
import Single from "./pages/Single";
import Calendar from "./pages/Calendar";

import {userInputs, productInputs} from "./info/form"
import { useState, useEffect } from "react";
import { useStateContext } from "./ContextProvider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  // const [theme, colorMode] = useMode();
  const { theme } = useStateContext();
  
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}, [theme]); 

  return (
    <div className={theme === 'dark' ? "App dark" : "App"}>
      <Router>
        <Sidebar />

        <main>
          <div className="container">

            <Navbar />

            <Routes>
              <Route path="/">

                <Route index element={<Home />} />

                <Route path="users">
                  <Route index element={<List type="user" />} />
                  <Route path=":userId" element={<Single />} />
                  <Route path="new" element={<New inputs={userInputs} title="Add new user" />} />
                </Route>

                <Route path="products">
                  <Route index element={<List type="product" />} />
                  <Route path=":productId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add new product" />} />
                </Route>

                <Route path="orders">
                  <Route index element={<List type="order" />} />
                  <Route path=":orderId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="add new order" />} />
                </Route>

                <Route path="delivery">
                  <Route index element={<List type="delivery" />} />
                  <Route path=":deliveryId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add new delivery" />} />
                </Route>

                <Route path="calendar" element={<Calendar />}></Route>

              </Route>

            </Routes>
          </div>

        </main>

      </Router>
    </div>
  );
}

export default App;
