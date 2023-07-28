import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./DetailGame.scss";
import { IGame } from "../../types/global.typing";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/url.constants";
import { Carousel } from "@sefailyasoz/react-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarouselData = [
  {
    headerText: null,
    subText: "Sub Text One",
    image: "https://picsum.photos/300/300",
  },
  {
    headerText: "Header Text Two",
    subText: null,
    image: "https://picsum.photos/1200/800",
  },
  {
    headerText: null,
    subText: null,
    image: "https://picsum.photos/720/720",
  },
  {
    headerText: "Header Text Four",
    subText: "Sub Text Four",
    image: "https://picsum.photos/1920/1080",
  },
  {
    headerText: "Header Text Five",
    subText: "Sub Text Five",
    image: "https://picsum.photos/480/360",
  },
];

const DetailGame: React.FC = () => {
  const [game, setGameName] = React.useState<Partial<IGame>>({
    name: "",
    coverLink: "",
  });

  const { id } = useParams();
  React.useEffect(() => {
    axios.get<IGame>(`${baseUrl}/${id}`).then((response) =>
      setGameName({
        name: response.data.name,
        coverLink: response.data.coverLink,
      })
    );
  }, []);

  const data: Partial<IGame> = {
    name: game.name,
    coverLink: game.coverLink,
  };

  return (
    <div className="DetailGame">
      <div className="title">{data.name}</div>
      <Card className="paperCover">
        <CardMedia className="image" component="img" image={data.coverLink} />
      </Card>
    
    </div>
    
  );
};

export default DetailGame;
