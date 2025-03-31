// controllers/userController.js
const User = require("../models/User");

// Middleware to handle errors
const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

// Controller to add or update playlists and/or favList for a user
const addOrUpdateLists = async (req, res) => {
  try {
    const { userId, playlists, favList } = req.body;
    let user = await User.findOneAndUpdate(
      { userId },
      { playlists, favList },
      { upsert: true, new: true }
    );

    res.json({ message: "Lists added/updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller to get playlists and favList for a user
const getListsByUserId = async (req, res, listType) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user[listType]);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Controller to get playlists for a user
const getPlaylistsByUserId = async (req, res) => {
  await getListsByUserId(req, res, "playlists");
};

// Controller to get favList for a user
const getFavListByUserId = async (req, res) => {
  await getListsByUserId(req, res, "favList");
};

module.exports = { addOrUpdateLists, getPlaylistsByUserId, getFavListByUserId };
