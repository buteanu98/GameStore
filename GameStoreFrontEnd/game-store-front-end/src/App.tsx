import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.page";
import Games from "./pages/Games/Games.page";
import AddGame from "./pages/Add-Game/AddGame.page";
import EditGame from "./pages/Edit-Game/EditGame.page";
import DeleteGame from "./pages/Delete-Game/DeleteGame.page";
import DetailGame from "./pages/Detail-Game/DetailGame.page";
const App: React.FC = () => {
  return (
    <div>
      {/*Navbar*/}
      <Navbar />

      {/*Wrapper*/}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games">
            <Route index element={<Games />} />
            <Route path="add" element={<AddGame />} />
            <Route path="edit/:id" element={<EditGame />} />
            <Route path="delete/:id" element={<DeleteGame />} />
            <Route path="detail/:id" element={<DetailGame />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default App;
