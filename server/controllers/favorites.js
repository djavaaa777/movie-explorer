const User = require('../models/User').default;

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites || []);
  } catch (error) {
    console.error("Error in getFavorites:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = req.body;

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyAdded = user.favorites.some(fav => fav.id === movie.id);
    if (alreadyAdded) {
      console.log("Already in favorites:", movie.title);
      return res.status(400).json({ message: 'Already in favorites' });
    }

    user.favorites.push(movie);
    await user.save();
    console.log("Added to favorites:", movie.title);
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    console.error("Error in addFavorite:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movieId = parseInt(req.params.id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const beforeCount = user.favorites.length;
    user.favorites = user.favorites.filter(fav => fav.id !== movieId);
    await user.save();
    const afterCount = user.favorites.length;

    if (beforeCount === afterCount) {
      console.log("Movie not found in favorites:", movieId);
    } else {
      console.log("Removed from favorites:", movieId);
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error("Error in removeFavorite:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
