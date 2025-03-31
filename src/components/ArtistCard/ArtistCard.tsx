import React from "react";
import "./ArtistCard.css";
import Play from "../Play/Play";

export interface IArtistCard {
  id: number;
  artist: string;
  onClick?: () => void;
}

const ArtistCard: React.FC<IArtistCard> = ({ artist, onClick }) => {
  // console.log (title);
  return (
    <div className="card cardArtist" onClick={onClick}>
      <div className="card__content">
        <div className="card__wrapper">
          <p className="cardArtist__title">{artist}</p>
        </div>
        <Play />
      </div>
    </div>
  );
};

export default ArtistCard;
