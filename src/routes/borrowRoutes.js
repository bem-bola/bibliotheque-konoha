const express = require('express');
const { body, validationResult } = require('express-validator');
const {
    createBorrow,
    getBorrows,
    getBorrowById,
    updateBorrow,
    deleteBorrow,
    borrowJutsuScroll,
    reserveJutsuScroll,
    recommendJutsu,
    jutsuDuMois
} = require('../controllers/borrowController');

const router = express.Router();

/**
 * @swagger
 * /borrows:
 *   get:
 *     summary: Obtenir tous les emprunts
 *     description: Retourne une liste de tous les emprunts.
 *     tags: [Emprunts]
 *     responses:
 *       200:
 *         description: Liste des emprunts
 */
router.get('/', getBorrows);

/**
 * @swagger
 * /borrows/{id}:
 *   get:
 *     summary: Obtenir un emprunt par ID
 *     description: Retourne les détails d'un emprunt spécifique.
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'emprunt
 *       404:
 *         description: Emprunt non trouvé
 */
router.get('/:id', getBorrowById);

/**
 * @swagger
 * /borrows/{id}:
 *   put:
 *     summary: Mettre à jour un emprunt
 *     description: Met à jour les détails d'un emprunt spécifique.
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *               dateEmprunt:
 *                 type: string
 *                 format: date
 *               dateRetourPrévue:
 *                 type: string
 *                 format: date
 *               statut:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Emprunt mis à jour avec succès
 *       404:
 *         description: Emprunt non trouvé
 */
router.put('/:id', updateBorrow);

/**
 * @swagger
 * /borrows/{id}:
 *   delete:
 *     summary: Supprimer un emprunt
 *     description: Supprime un emprunt spécifique.
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'emprunt
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Emprunt supprimé avec succès
 *       404:
 *         description: Emprunt non trouvé
 */
router.delete('/:id', deleteBorrow);

/**
 * @swagger
 * /borrows/borrow:
 *   post:
 *     summary: Emprunter un rouleau de jutsu
 *     description: Permet à un ninja d'emprunter un rouleau de jutsu.
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Emprunt effectué avec succès
 *       400:
 *         description: Erreur lors de l'emprunt
 */
router.post('/borrow', [
        body('ninjaId').isString().trim(),
        body('jutsuScrollId').isString().trim(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    borrowJutsuScroll,
    );

/**
 * @swagger
 * /borrows/reserve:
 *   post:
 *     summary: Réserver un rouleau de jutsu
 *     description: Permet à un ninja de réserver un rouleau de jutsu.
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ninjaId:
 *                 type: string
 *               jutsuScrollId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation effectuée avec succès
 *       400:
 *         description: Erreur lors de la réservation
 */
router.post('/reserve', reserveJutsuScroll);

/**
 * @swagger
 * /borrows/recommend/{ninjaId}:
 *   get:
 *     summary: Recommander des jutsus pour un ninja
 *     description: Retourne une liste de jutsus recommandés basés sur l'historique d'emprunt du ninja.
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: ninjaId
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des jutsus recommandés
 *       404:
 *         description: Ninja non trouvé
 */
router.get('/recommend/:ninjaId', recommendJutsu);

/**
 * @swagger
 * /borrows/jutsu-du-mois:
 *   get:
 *     summary: Obtenir le jutsu du mois
 *     description: Retourne le jutsu du mois basé sur les statistiques d'emprunt.
 *     tags: [Emprunts]
 *     responses:
 *       200:
 *         description: Détails du jutsu du mois
 */
router.get('/jutsu-du-mois', jutsuDuMois);

module.exports = router;
