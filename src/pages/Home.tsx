import TopTracks from "../components/TopTracks/TopTracks";
import Favourites from "./Favourites";

const Home = () => {
  return (
    <div className="home">
      <TopTracks />
      <Favourites />
    </div>
  );
};

export default Home;
