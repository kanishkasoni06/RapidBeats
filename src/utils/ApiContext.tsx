import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICard, optionsChartTrack } from "../constants/index";
import { ApiData } from "../constants/interface";
import { AuthContext } from "../security/AuthProvider";

export interface IPlaylist {
  id: number;
  name: string;
  cards: ICard[];
}

interface ApiContextType {
  apiChartTrack: ApiData[];
  favList: ICard[];
  addFavorite: (card: ICard) => void;
  removeFavorite: (card: ICard) => void;
  playlists: IPlaylist[];
  addPlaylist: (name: string) => void;
  removePlaylist: (playlistId: number) => void;
  addToPlaylist: (card: ICard, playlistId: number) => void;
  removeFromPlaylist: (card: ICard, playlistId: number) => void;
  statusTrack: Status;
  statusPlaylist: Status;
  statusFavorites: Status;
}

const initialApiContext: ApiContextType = {
  apiChartTrack: [],
  favList: [],
  playlists: [],
  addPlaylist: () => {},
  removePlaylist: () => {},
  addToPlaylist: () => {},
  removeFromPlaylist: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  statusTrack: "loading",
  statusPlaylist: "loading",
  statusFavorites: "loading",
};
type Status = "loading" | "success" | "error";

export const ApiContext = createContext<ApiContextType>(initialApiContext);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid || "";

  const [apiChartTrack, setApiChartTrack] = useState<ApiData[]>([]);
  const [favList, setFavList] = useState<ICard[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [statusTrack, setStatusTrack] = useState<Status>("loading");
  const [statusPlaylist, setStatusPlaylist] = useState<Status>("loading");
  const [statusFavorites, setStatusFavorites] = useState<Status>("loading");

  // Function to post favorites to the API
  const postFavoritesToApi = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_NODE}/user/lists`, {
        userId,
        favList,
      });
    } catch (error) {
      console.error("Error posting favorites to API:", error);
    }
  };

  // Function to post playlists to the API
  const postPlaylistsToApi = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_NODE}/user/lists`, {
        userId,
        playlists,
      });
    } catch (error) {
      console.error("Error posting playlists to API:", error);
    }
  };

  // Function to fetch favorites from the API
  const fetchFavoritesFromApi = async () => {
    try {
      const favoritesResponse = await axios.get(
        `${import.meta.env.VITE_URL_NODE}/user/favlist/${userId}`
      );
      setFavList(favoritesResponse.data);
      setStatusFavorites("success");
      localStorage.setItem("favList", JSON.stringify(favoritesResponse.data));
    } catch (error) {
      console.error("Error fetching favorites from API:", error);
      setStatusFavorites("error");
      // Fallback: Retrieve favorites from local storage if available
      const storedFavList = localStorage.getItem("favList");
      if (storedFavList) {
        setFavList(JSON.parse(storedFavList));
      }
    }
  };

  // Function to fetch playlists from the API
  const fetchPlaylistsFromApi = async () => {
    try {
      const playlistsResponse = await axios.get(
        `${import.meta.env.VITE_URL_NODE}/user/playlists/${userId}`
      );
      setPlaylists(playlistsResponse.data);
      setStatusPlaylist("success");
      localStorage.setItem("playlists", JSON.stringify(playlistsResponse.data));
    } catch (error) {
      console.error("Error fetching playlists from API:", error);
      setStatusPlaylist("error");
      // Fallback: Retrieve playlists from local storage if available
      const storedPlaylists = localStorage.getItem("playlists");
      if (storedPlaylists) {
        setPlaylists(JSON.parse(storedPlaylists));
      }
    }
  };

  // UseEffect to post favorites and playlists to the API whenever they change
  useEffect(() => {
    // Only post favorites to API if fetching from API was successful
    if (statusFavorites === "success") {
      postFavoritesToApi();
    }
  }, [favList, statusFavorites]);

  useEffect(() => {
    // Only post playlists to API if fetching from API was successful
    if (statusPlaylist === "success") {
      postPlaylistsToApi();
    }
  }, [playlists, statusPlaylist]);

  // UseEffect to fetch favorites and playlists from the API during initial load if local storage is empty or outdated
  useEffect(() => {
    fetchFavoritesFromApi();
    fetchPlaylistsFromApi();
  }, []);

  const addFavorite = (card: ICard) => {
    const isCardAlreadyFavorite = favList.some(
      (favCard) => favCard.id === card.id
    );
    if (!isCardAlreadyFavorite) {
      setFavList((prevFavList) => [...prevFavList, card]);
    }
  };

  const removeFavorite = (card: ICard) => {
    setFavList((prevFavList) => prevFavList.filter((c) => c.id !== card.id));
  };

  const addPlaylist = (name: string) => {
    const newPlaylist: IPlaylist = {
      id: Date.now(),
      name: name,
      cards: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const removePlaylist = (playlistId: number) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const addToPlaylist = (card: ICard, playlistId: number) => {
    setPlaylists((prevPlaylists) => {
      return prevPlaylists.map((playlist) => {
        if (
          playlist.id === playlistId &&
          !playlist.cards.some((c) => c.id === card.id)
        ) {
          return {
            ...playlist,
            cards: [...playlist.cards, card],
          };
        }
        return playlist;
      });
    });
  };

  const removeFromPlaylist = (card: ICard, playlistId: number) => {
    setPlaylists((prevPlaylists) => {
      return prevPlaylists.map((playlist) => {
        if (
          playlist.id === playlistId &&
          playlist.cards.some((c) => c.id === card.id)
        ) {
          return {
            ...playlist,
            cards: playlist.cards.filter((c) => c.id !== card.id),
          };
        }
        return playlist;
      });
    });
  };

  useEffect(() => {
    const searchKeyword = async () => {
      try {
        const response = await axios.request(optionsChartTrack);
        // console.log(response.data.data);
        setApiChartTrack(response.data.data);
        setStatusTrack("success");
      } catch (error) {
        console.error(error);
        setStatusTrack("error");
      }
    };
    searchKeyword();
  }, []);

  // UseEffect to fetch data from local storage when there is an error while fetching data from the API
  useEffect(() => {
    if (statusTrack === "error") {
      fetchFavoritesFromApi();
      fetchPlaylistsFromApi();
    }
  }, [statusTrack]);

  return (
    <ApiContext.Provider
      value={{
        apiChartTrack,
        favList,
        addPlaylist,
        removePlaylist,
        addFavorite,
        removeFavorite,
        playlists,
        addToPlaylist,
        removeFromPlaylist,
        statusTrack,
        statusPlaylist,
        statusFavorites,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
