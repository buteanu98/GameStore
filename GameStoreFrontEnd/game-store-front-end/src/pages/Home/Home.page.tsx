import React from "react";
import "./home.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gamestore from "../../assets/images/gamestore.png"
const Home = () => {
  const redirect = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to Game Store</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => redirect("/games")}
      >
        Games List
      </Button>
      <img src={gamestore} alt="gamestore"></img>
    </div>
  );
};

export default Home;
