import { useContext } from "react";
import "./TopTracks.css";
import { ApiContext } from "../../utils/ApiContext";
import Card from "../Card/Card";
import Skeleton from "../Skeleton/Skeleton";

const TopTracks = () => {
  const { apiChartTrack, statusTrack } = useContext(ApiContext);

  return (
    <section className="rplayed">
      <h2 className="subtitle">Top Tracks</h2>
      <div className="rplayed__grid">
        {statusTrack === "loading"
          ? [...Array(8).keys()].map((n) => <Skeleton height="220px" key={n} />)
          : apiChartTrack?.map((data) => {
              // setLoading(false);
              const newUrl = data?.attributes?.artwork?.url
                .replace(
                  "{w}",
                  (data?.attributes?.artwork?.width).toString() || "300"
                )
                .replace(
                  "{h}",
                  (data?.attributes?.artwork?.height).toString() || "300"
                );
              return (
                <Card
                  key={data?.id}
                  title={data?.attributes?.albumName}
                  id={Number(data?.id)}
                  artist={data?.attributes?.artistName}
                  url={data?.attributes?.url}
                  thumbnail={newUrl}
                  isFavorite
                />
              );
            })}
      </div>
    </section>
  );
};

export default TopTracks;
