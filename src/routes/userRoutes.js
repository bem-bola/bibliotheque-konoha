// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec un nom d'utilisateur et un mot de passe.
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "naruto_uzumaki"
 *               password:
 *                 type: string
 *                 example: "ramenlover"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', userController.registerUser); // Route d'inscription

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     description: Authentifie un utilisateur avec son nom d'utilisateur et son mot de passe.
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "naruto_uzumaki"
 *               password:
 *                 type: string
 *                 example: "ramenlover"
 *     responses:
 *       200:
 *         description: Connexion réussie avec le token JWT
 *       400:
 *         description: Erreur d'authentification
 */
router.post('/login', userController.loginUser); // Route de connexion

module.exports = router;
