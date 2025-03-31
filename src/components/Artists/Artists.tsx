import ArtistCard from "../ArtistCard/ArtistCard";

export type artistProps = {
  artists: {
    hits: {
      artist: {
        adamid: number;
        avatar: string;
        name: string;
        verified: boolean;
        weburl: string;
      };
    }[];
  };
};

const Artists = (props: artistProps) => {
  return (
    <section className="rplayed">
      <h2 className="subtitle">Artists</h2>
      <div className="rplayed__grid">
        {props?.artists?.hits.map((hit) => {
          return (
            <ArtistCard
              key={hit.artist.adamid}
              id={hit.artist.adamid}
              artist={hit.artist.name}
              onClick={() => {
                window.open(hit.artist.weburl);
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Artists;
