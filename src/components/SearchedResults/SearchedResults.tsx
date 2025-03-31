import { tracksProps } from "../../constants";
import Card from "../Card/Card";

type searchedProps = {
  tracks: tracksProps;
  keyword: string;
};

const SearchedResults: React.FC<searchedProps> = ({ tracks, keyword }) => {
  return (
    <div className="rplayed">
      <h3 className="subtitle"> Searched results for {keyword} </h3>
      <div className="rplayed__grid">
        {tracks.tracks?.hits?.map((hit) => {
          return (
            <Card
              id={Number(hit.track.key)}
              key={hit.track.key}
              title={hit.track.title}
              artist={hit.track.subtitle}
              thumbnail={hit.track.images.coverart}
              url={hit.track.url}
              isFavorite
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchedResults;
