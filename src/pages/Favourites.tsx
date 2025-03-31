import Card from "../components/Card/Card";
import Skeleton from "../components/Skeleton/Skeleton";
import { ApiContext } from "../utils/ApiContext";
import { useContext } from "react";

const Favourites = () => {
  const { favList, statusFavorites } = useContext(ApiContext);
  return (
    <>
      <div className="wrap">
        <section className="rplayed">
          <h2 className="subtitle">Favourites</h2>
          <div className="rplayed__grid">
            {statusFavorites === "loading" ? (
              [...Array(4).keys()].map((n) => (
                <Skeleton height="220px" key={n} />
              ))
            ) : favList.length ? (
              favList?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    id={data.id}
                    artist={data.artist}
                    thumbnail={data.thumbnail}
                    title={data.title}
                    url={data.url}
                    isFavorite={data.isFavorite}
                  />
                );
              })
            ) : (
              <div>No favourite songs present</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Favourites;
