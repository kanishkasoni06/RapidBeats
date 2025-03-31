// routes.js
const express = require("express");
const router = express.Router();
const {
  addOrUpdateLists,
  getPlaylistsByUserId,
  getFavListByUserId,
} = require("../controllers/UserController");

// const {
//   addOrUpdateCard,
//   getCardById,
// } = require("../controllers/cardController");

// Route to add or update playlists and/or favList for a user
router.post("/user/lists", addOrUpdateLists);

// Route to get playlists for a user
router.get("/user/playlists/:userId", getPlaylistsByUserId);

// Route to get favList for a user
router.get("/user/favlist/:userId", getFavListByUserId);

// // Route to add or update a card
// router.post("/cards", addOrUpdateCard);

// // Route to get a card by ID
// router.get("/cards/:cardId", getCardById);

module.exports = router;
