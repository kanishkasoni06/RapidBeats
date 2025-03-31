// import axios from "axios";

// import { optionsFetchSong } from "../constants/optionConfig";
// import { ICard } from "../constants";

// export const fetchSongDetails = async (cardId: number) => {
//     try {
//         const response = await axios.request(optionsFetchSong(cardId));      
//       return formatCardData(response.data);
//     } catch (error) {
//       console.error("Error fetching song details:", error);
//       return null;
//     }
//   };

// export const fetchSongDetails = async (cardId: number) => {
//   try {
//     const response = await axios.get(`${import.meta.env.VITE_URL_NODE}/cards/${cardId}`);
//     return response.data;

//   } catch (error) {
//     console.error("Error fetching song details:", error);
//     return null;
//   }
// };
  
// export  const formatCardData = (data: any): ICard => {
//     // Format the data to match the ICard interface
//     const formattedCardData: ICard = {
//       id: Number(data.key),
//       title: data.title,
//       artist: data.subtitle,
//       thumbnail: data.images?.coverart || "",
//       url: data.url || "",
//       isFavorite: false,
//       playlists: [],
//     };
  
//     return formattedCardData;
//   };
  

// export const postCardDetailsToApi = async (cardDetails: ICard) => {
//   try {
//     await axios.post(`${import.meta.env.VITE_URL_NODE}/cards`, {
//       cardDetails: cardDetails,
//     });
//   } catch (error) {
//     console.error("Error posting card details to API:", error);
//   }
// };