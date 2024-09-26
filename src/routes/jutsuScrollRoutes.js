const express = require('express');
const {
    createJutsuScroll,
    getJutsuScrolls,
    getJutsuScrollById,
    updateJutsuScroll,
    deleteJutsuScroll
} = require('../controllers/jutsuScrollController');

const router = express.Router();

/**
 * @swagger
 * /jutsus:
 *   post:
 *     summary: Créer un nouveau rouleau de jutsu
 *     description: Crée un nouveau rouleau de jutsu avec les détails fournis.
 *     tags: [Jutsus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du rouleau de jutsu
 *               creator:
 *                 type: string
 *                 description: Créateur du jutsu
 *               rank:
 *                 type: string
 *                 description: Rang du jutsu
 *               quantity:
 *                 type: integer
 *                 description: Quantité de rouleaux disponibles
 *               description:
 *                 type: string
 *                 description: Description du jutsu
 *               category:
 *                 type: string
 *                 description: Catégorie du jutsu
 *               associatedTechniques:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Rouleau de jutsu créé avec succès
 *       400:
 *         description: Erreur lors de la création du rouleau
 */
router.post('/', createJutsuScroll);

/**
 * @swagger
 * /jutsus:
 *   get:
 *     summary: Obtenir tous les rouleaux de jutsu
 *     description: Retourne une liste de tous les rouleaux de jutsu.
 *     tags: [Jutsus]
 *     responses:
 *       200:
 *         description: Liste des rouleaux de jutsu
 */
router.get('/', getJutsuScrolls);
/**
 * @swagger
 * /jutsus/{id}:
 *   get:
 *     summary: Obtenir un rouleau de jutsu par ID
 *     description: Retourne les détails d'un rouleau de jutsu spécifique.
 *     tags: [Jutsus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du rouleau de jutsu
 *       404:
 *         description: Rouleau de jutsu non trouvé
 */
router.get('/:id', getJutsuScrollById);  // Route pour récupérer par ID

/**
 * @swagger
 * /jutsus/{id}:
 *   put:
 *     summary: Mettre à jour un rouleau de jutsu
 *     description: Met à jour les détails d'un rouleau de jutsu spécifique.
 *     tags: [Jutsus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               creator:
 *                 type: string
 *               rank:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               associatedTechniques:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Rouleau de jutsu mis à jour avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 */
router.put('/:id', updateJutsuScroll);    // Route pour mise à jour

/**
 * @swagger
 * /jutsus/{id}:
 *   delete:
 *     summary: Supprimer un rouleau de jutsu
 *     description: Supprime un rouleau de jutsu spécifique.
 *     tags: [Jutsus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du rouleau de jutsu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rouleau de jutsu supprimé avec succès
 *       404:
 *         description: Rouleau de jutsu non trouvé
 */
router.delete('/:id', deleteJutsuScroll); // Route pour suppression

module.exports = router;
