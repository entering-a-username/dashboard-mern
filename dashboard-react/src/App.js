import "./styles/main.scss";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import List from "./pages/List";
import New from "./pages/New";
import Single from "./pages/Single";
import Geography from "./pages/Geography";

import { userInputs, productInputs } from "./info/form"
import { useState, useEffect } from "react";
import { useStateContext } from "./ContextProvider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Breakdown from "./pages/Breakdown";
import NotFound from "./pages/NotFound";

function App() {
  const { theme } = useStateContext();
  
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
                  <Route path="new" element={<New inputs={userInputs} title="Add new user" type="user" />} />
                </Route>

                <Route path="products">
                  <Route index element={<List type="product" />} />
                  <Route path=":productId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add new product" type="product" />} />
                </Route>

                <Route path="admins">
                  <Route index element={<List type="admin" />} />
                  <Route path=":adminId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add new product" type="admin" />} />
                </Route>

                <Route path="transactions">
                  <Route index element={<List type="transaction" />} />
                  <Route path=":adminId" element={<Single />} />
                  <Route path="new" element={<New inputs={productInputs} title="Add new transaction" type="transaction" />} />
                </Route>
                
                <Route path="geography" element={<Geography />} />

                <Route path="overview" element={<Overview />} />

                <Route path="breakdown" element={<Breakdown />} />

                <Route path="*" element={<NotFound />} />
              
              </Route>

            </Routes>
          </div>

        </main>

      </Router>
    </div>
  );
}

export default App;
