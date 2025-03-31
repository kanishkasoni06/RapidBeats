// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  playlists: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      cards: [
        {
          id: { type: Number, required: true, unique: true },
          title: { type: String, required: true },
          artist: { type: String, required: true },
          thumbnail: { type: String, required: true },
          url: { type: String, required: true },
          isFavorite: { type: Boolean, required: true },
          playlists: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
          ],
        },
      ],
    },
  ],
  favList: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      artist: { type: String, required: true },
      thumbnail: { type: String, required: true },
      url: { type: String, required: true },
      isFavorite: { type: Boolean, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
