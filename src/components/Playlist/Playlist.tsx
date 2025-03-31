import { useContext } from "react";
import { ApiContext } from "../../utils/ApiContext";
import PlaylistCards from "../PlaylistsCards/PlaylistsCards";
interface PlaylistProps {
  playlistId: number | null;
  length: number;
}

const Playlist: React.FC<PlaylistProps> = ({ playlistId, length }) => {
  const { playlists } = useContext(ApiContext);

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!length) {
    return <div>No Playlists created yet..</div>;
  }

  if (!playlist) {
    return <div>Select a playlist</div>;
  }

  return (
    <div className="rplayed">
      <h3 className="subtitle">{playlist.name}</h3>
      {playlist.cards.length ? (
        <PlaylistCards cards={playlist.cards} />
      ) : (
        <div>No songs added yet</div>
      )}
    </div>
  );
};

export default Playlist;
