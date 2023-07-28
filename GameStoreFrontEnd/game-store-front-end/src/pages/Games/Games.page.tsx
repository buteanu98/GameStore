import "./games.scss";
import React, { useState, useEffect } from "react";
import { IGame } from "../../types/global.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";
import { Button } from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Games: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  const fetchGameList = async () => {
    try {
      const response = await axios.get<IGame[]>(baseUrl);
      setGames(response.data);
      if (location?.state) {
        Swal.fire({ icon: "success", title: location?.state?.message });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An error Happened");
    }
  };
  useEffect(() => {
    fetchGameList();
  }, []);

  const redirectToEditPage = (id: string) => {
    redirect(`/games/edit/${id}`);
  };
  const redirectToDeletePage = (id: string) => {
    redirect(`/games/delete/${id}`);
  };
  const redirectToDetailPage = (id: string) => {
    redirect(`/games/detail/${id}`);
  };
  // console.log(games);
  return (
    <div className="games">
      <h1> Games List</h1>
      {games.length === 0 ? (
        <h1>No Games</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Age Rating</th>
                <th>Description</th>
                <th>Developer</th>
                <th>Publisher</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.genre}</td>
                  <td>{game.ageRating}</td>
                  <td>{game.description}</td>
                  <td>{game.developer}</td>
                  <td>{game.publisher}</td>
                  <td>{moment(game.createdAt).fromNow()}</td>
                  <td>{moment(game.updatedAt).fromNow()}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => redirectToDetailPage(game.id)}
                    >
                      <Info />
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{ mx: 3 }}
                      onClick={() => redirectToEditPage(game.id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => redirectToDeletePage(game.id)}
                    >
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Games;
