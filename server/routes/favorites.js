const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favorites');

const router = express.Router();

// Все маршруты защищены через verifyToken
router.get('/', verifyToken, getFavorites);
router.post('/', verifyToken, addFavorite);
router.delete('/:id', verifyToken, removeFavorite);

module.exports = router;
