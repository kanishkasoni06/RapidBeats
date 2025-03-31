import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { ApiProvider } from "./utils/ApiContext";
import Favourites from "./pages/Favourites";
import PlayListsPage from "./pages/PlayListsPage";
import NavModal from "./components/NavModal/NavModal";
import { AuthContext } from "./security/AuthProvider";
import { useContext } from "react";
import Auth from "./pages/Auth";
// import Auth from "./pages/Auth";
// import { useState } from "react";
// import MyContext, { dataProp } from "./context";

const App = () => {
  // const [data, setData] = useState<dataProp>({} as dataProp);
  const { currentUser } = useContext(AuthContext);
  // Check if the user is logged in
  const isLoggedIn = !!currentUser;

  // const updateData = (newData: dataProp) => {
  //   setData(newData);
  // };
  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <Sidebar />
          <main className="main">
            <NavModal />
            <ApiProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/playlists" element={<PlayListsPage />} />
              </Routes>
            </ApiProvider>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/*" element={<Auth />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
