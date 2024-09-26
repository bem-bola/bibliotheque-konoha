const express = require('express');
const {
    createNinja,
    getNinjas,
    getNinjaById,
    updateNinja,
    deleteNinja
} = require('../controllers/ninjaController');

const router = express.Router();


/**
 * @swagger
 * /ninjas:
 *   post:
 *     summary: Créer un nouveau ninja
 *     description: Crée un nouveau ninja avec les détails fournis.
 *     tags: [Ninjas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du ninja
 *               rank:
 *                 type: string
 *                 description: Rang du ninja
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des jutsus maîtrisés
 *               clan:
 *                 type: string
 *                 description: Clan du ninja
 *               spécialité:
 *                 type: string
 *                 description: Spécialité du ninja
 *               historique_d_emprunts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Historique des emprunts
 *     responses:
 *       201:
 *         description: Ninja créé avec succès
 *       400:
 *         description: Erreur lors de la création du ninja
 */
router.post('/', createNinja);

/**
 * @swagger
 * /ninjas:
 *   get:
 *     summary: Obtenir tous les ninjas
 *     description: Retourne une liste de tous les ninjas.
 *     tags: [Ninjas]
 *     responses:
 *       200:
 *         description: Liste des ninjas
 */
router.get('/', getNinjas);

/**
 * @swagger
 * /ninjas/{id}:
 *   get:
 *     summary: Obtenir un ninja par ID
 *     description: Retourne les détails d'un ninja spécifique.
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du ninja
 *       404:
 *         description: Ninja non trouvé
 */
router.get('/:id', getNinjaById);  // Route pour récupérer par ID


/**
 * @swagger
 * /ninjas/{id}:
 *   put:
 *     summary: Mettre à jour un ninja
 *     description: Met à jour les détails d'un ninja spécifique.
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
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
 *               rank:
 *                 type: string
 *               jutsus_maîtrisés:
 *                 type: array
 *                 items:
 *                   type: string
 *               clan:
 *                 type: string
 *               spécialité:
 *                 type: string
 *               historique_d_emprunts:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Ninja mis à jour avec succès
 *       404:
 *         description: Ninja non trouvé
 */
router.put('/:id', updateNinja);    // Route pour mise à jour

/**
 * @swagger
 * /ninjas/{id}:
 *   delete:
 *     summary: Supprimer un ninja
 *     description: Supprime un ninja spécifique.
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du ninja
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ninja supprimé avec succès
 *       404:
 *         description: Ninja non trouvé
 */
router.delete('/:id', deleteNinja); // Route pour suppression

module.exports = router;
