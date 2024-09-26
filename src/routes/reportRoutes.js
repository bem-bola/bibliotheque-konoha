// src/routes/reportRoutes.js
const express = require('express');
const { populariteJutsuParRang } = require('../controllers/reportController');

const router = express.Router();

router.get('/popularite-jutsu-par-rang', populariteJutsuParRang);

module.exports = router;
