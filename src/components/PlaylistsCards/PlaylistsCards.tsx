import React, { useContext } from "react";
import Card from "../Card/Card";
import Skeleton from "../Skeleton/Skeleton";
import { ICard } from "../../constants";
import { ApiContext } from "../../utils/ApiContext";

interface PlaylistCardsProps {
  cards: ICard[];
}

const PlaylistCards: React.FC<PlaylistCardsProps> = ({ cards }) => {
  const { statusPlaylist } = useContext(ApiContext);

  return (
    <div className="rplayed__grid">
      {statusPlaylist === "loading"
        ? cards.map((_, index) => <Skeleton height="220px" key={index} />)
        : cards?.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              artist={card.artist}
              thumbnail={card.thumbnail}
              playlists={card.playlists}
              title={card.title}
              isFavorite={card.isFavorite}
            />
          ))}
      {}
    </div>
  );
};

export default PlaylistCards;
