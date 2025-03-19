import "./styles/main.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStateContext } from "./ContextProvider";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Breakdown from "./pages/Breakdown";
import NotFound from "./pages/NotFound";
import Geography from "./pages/Geography";
import List from "./pages/ListSec";
import Edit from "./pages/Edit";
import Single from "./pages/Single";
import Create from "./pages/Create";

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

                <Route path="list/:type" element={<List />} />

                <Route path=":type">
                  <Route path=":id" element={<Single />} />
                  <Route path=":id/edit" element={<Edit />} />
                  <Route path="create" element={<Create />} />
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
