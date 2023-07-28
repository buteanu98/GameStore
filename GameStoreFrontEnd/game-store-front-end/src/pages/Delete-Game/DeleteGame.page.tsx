import React from "react";
import "./DeleteGame.scss";
import { TextField, Button } from "@mui/material";
import { IGame } from "../../types/global.typing";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";




const DeleteGame = () => {
  const [game, setGameName] = React.useState<Partial<IGame>>({
    name: "",
    
  });


  React.useEffect(() => {
    axios.get<IGame>(`${baseUrl}/${id}`).then((response) =>
        setGameName({
        name: response.data.name,
      })
    );
  }, []);

  const data: Partial<IGame> = {
    name: game.name,
  };


  const redirect = useNavigate();
  const { id } = useParams();
  
  const handleDeleteBtnClick = () => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((response) =>
        redirect("/games", { state: { message: data.name+" Deleted Successfully" } })
      )
      .catch((error) => alert(error));
  };

  const handleBackBtnClick = () => {
    redirect("/games");
  };


  return (
    <div className="DeleteGame">
      <h2>Delete {data.name} </h2>
      <h4>Are you sure?</h4>
      <div>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteBtnClick}
        >
          Yes
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DeleteGame;
