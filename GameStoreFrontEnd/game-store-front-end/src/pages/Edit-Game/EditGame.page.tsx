import React from "react";
import "./EditGame.scss";
import { TextField, Button } from "@mui/material";
import { IGame } from "../../types/global.typing";
import Games from "../Games/Games.page";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";

const EditGame: React.FC = () => {
  const [game, setGame] = React.useState<Partial<IGame>>({
    name: "",
    genre: "",
    ageRating: "",
    description: "",
    developer: "",
    publisher: "",
  });

  const redirect = useNavigate();
  const { id } = useParams();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };
  React.useEffect(() => {
    axios.get<IGame>(`${baseUrl}/${id}`).then((response) =>
      setGame({
        name: response.data.name,
        genre: response.data.genre,
        ageRating: response.data.ageRating,
        description: response.data.description,
        developer: response.data.developer,
        publisher: response.data.publisher,
        coverLink: "tba",
      })
    );
  }, []);

  const handleSaveBtnClick = () => {
    if (
      game.name === "" ||
      game.genre === "" ||
      game.ageRating === "" ||
      game.description === "" ||
      game.developer === "" ||
      game.publisher === ""
    ) {
      alert("Enter Values");
      return;
    }
    const data: Partial<IGame> = {
      name: game.name,
      genre: game.genre,
      ageRating: game.ageRating,
      description: game.description,
      developer: game.developer,
      publisher: game.publisher,
      coverLink: "tba",
    };
    axios
      .put(`${baseUrl}/${id}`, data)
      .then((response) =>
        redirect("/games", { state: { message: "Game Updated Successfully" } })
      )
      .catch((error) => alert(error));
    
  };

  const handleBackBtnClick = () => {
    redirect("/games");
  };

  return (
    <div className="edit-game">
      <h2>Edit Game </h2>
      <TextField
        autoComplete="off"
        label="Name"
        variant="outlined"
        name="name"
        value={game.name}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Genre"
        variant="outlined"
        name="genre"
        value={game.genre}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Age Rating"
        variant="outlined"
        name="ageRating"
        value={game.ageRating}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Description"
        variant="outlined"
        name="description"
        value={game.description}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Developer"
        variant="outlined"
        name="developer"
        value={game.developer}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Publisher"
        variant="outlined"
        name="publisher"
        value={game.publisher}
        onChange={changeHandler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
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

export default EditGame;
