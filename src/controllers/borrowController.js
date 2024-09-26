const Borrow = require('../models/Borrow');
const Joi = require('joi');
const logger = require('../utils/logger');

const borrowSchema = Joi.object({
    ninjaId: Joi.string().required().messages({
        'string.empty': 'Ninja ID est requis.',
    }),
    jutsuScrollId: Joi.string().required().messages({
        'string.empty': 'Jutsu Scroll ID est requis.',
    }),
});


const reserveSchema = Joi.object({
    ninjaId: Joi.string().required().messages({
        'string.empty': 'Ninja ID est requis.',
    }),
    jutsuScrollId: Joi.string().required().messages({
        'string.empty': 'Jutsu Scroll ID est requis.',
    }),
    reservedUntil: Joi.date().greater('now').required().messages({
        'date.greater': 'La date de réservation doit être dans le futur.',
    }),
});

exports.getBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find().populate('ninjaId').populate('jutsuScrollId');
        res.status(200).json(borrows);
    } catch (error) {
        logger.error('Error fetching Borrows', { error });
        res.status(500).json({ message: 'Error fetching Borrows', error });
    }
};

exports.getBorrowById = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id).populate('ninjaId').populate('jutsuScrollId');
        if (!borrow) {
            logger.error('Borrow not found');
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(200).json(borrow);
    } catch (error) {
        logger.error('Error fetching Borrow', {error});
        res.status(500).json({ message: 'Error fetching Borrow', error });
    }
};

exports.updateBorrow = async (req, res) => {
    try {
        const updatedBorrow = await Borrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBorrow) {
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(200).json(updatedBorrow);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Borrow', error });
    }
};

exports.deleteBorrow = async (req, res) => {
    try {
        const deletedBorrow = await Borrow.findByIdAndDelete(req.params.id);
        if (!deletedBorrow) {
            return res.status(404).json({ message: 'Borrow not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Borrow', error });
    }
};

// Emprunter un rouleau de jutsu
exports.borrowJutsuScroll = async (req, res) => {

    const { error } = borrowSchema.validate(req.body); // Validation des données
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Retourner une erreur de validation
    }

    try {
        const { ninjaId, jutsuScrollId } = req.body;
        // Vérifier si le ninja existe
        const ninja = await Ninja.findById(ninjaId);
        if (!ninja) {
            res.status(404).json({ message: 'Ninja not found' });
        }

        // Vérifier si le rouleau de jutsu existe
        const jutsuScroll = await JutsuScroll.findById(jutsuScrollId);
        res.status(200).json({ message: 'Je passe !' });

        if (!jutsuScroll) {
            res.status(404).json({ message: 'Jutsu Scroll not found' });
        }


        // Vérifier si le jutsu scroll est disponible
        if (jutsuScroll.quantity <= 0) {
            res.status(400).json({ message: 'Jutsu Scroll not available' });
        }

        // Vérifier la limite d'emprunts
        const activeBorrows = await Borrow.find({ ninjaId, status: 'active' });
        if (activeBorrows.length >= 3) {
            res.status(400).json({ message: 'Borrow limit reached' });
        }

        // Créer l'emprunt
        const newBorrow = new Borrow({
            ninjaId,
            jutsuScrollId,
            borrowDate: new Date(),
            returnDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 jours d'emprunt
            status: 'active'
        });

        await newBorrow.save();

        // Mettre à jour la quantité de rouleaux de jutsu
        jutsuScroll.quantity -= 1;
        await jutsuScroll.save();

        res.status(201).json(newBorrow);
    } catch (error) {
        res.status(500).json({ message: 'Error borrowing Jutsu Scroll', error });
    }
};

// Réserver un rouleau de jutsu
exports.reserveJutsuScroll = async (req, res) => {
    const { error } = reserveSchema.validate(req.body); // Validation des données
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Retourner une erreur de validation
    }

    try {
        const { ninjaId, jutsuScrollId, reservedUntil } = req.body;

        // Vérifier si le ninja existe
        const ninja = await Ninja.findById(ninjaId);
        if (!ninja) {
            return res.status(404).json({ message: 'Ninja not found' });
        }

        // Vérifier si le rouleau de jutsu existe
        const jutsuScroll = await JutsuScroll.findById(jutsuScrollId);
        if (!jutsuScroll) {
            return res.status(404).json({ message: 'Jutsu Scroll not found' });
        }

        // Vérifier si le jutsu scroll est déjà réservé
        if (jutsuScroll.reservation) {
            return res.status(400).json({ message: 'Jutsu Scroll already reserved' });
        }

        // Créer une réservation
        jutsuScroll.reservation = true;
        jutsuScroll.reservedUntil = reservedUntil; // Ajouter la date de réservation
        await jutsuScroll.save();

        res.status(200).json({ message: 'Jutsu Scroll reserved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error reserving Jutsu Scroll', error });
    }
};

// Recommander des jutsu
exports.recommendJutsu = async (req, res) => {
    try {
        const { ninjaId } = req.params;

        const borrows = await Borrow.find({ ninjaId }).populate('jutsuScrollId');

        const jutsuCount = {};
        borrows.forEach(borrow => {
            const jutsuName = borrow.jutsuScrollId.name;
            jutsuCount[jutsuName] = (jutsuCount[jutsuName] || 0) + 1;
        });

        const recommendedJutsu = Object.keys(jutsuCount)
            .sort((a, b) => jutsuCount[b] - jutsuCount[a])
            .slice(0, 5); // Top 5 recommandations

        res.status(200).json(recommendedJutsu);
    } catch (error) {
        res.status(500).json({ message: 'Error recommending Jutsu', error });
    }
};

// Jutsu du mois
exports.jutsuDuMois = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().setDate(1));
        const borrows = await Borrow.find({
            borrowDate: { $gte: startOfMonth },
        }).populate('jutsuScrollId');

        const jutsuCount = {};
        borrows.forEach(borrow => {
            const jutsuName = borrow.jutsuScrollId.name;
            jutsuCount[jutsuName] = (jutsuCount[jutsuName] || 0) + 1;
        });

        const jutsuOfTheMonth = Object.keys(jutsuCount).reduce((a, b) => jutsuCount[a] > jutsuCount[b] ? a : b);

        res.status(200).json({ jutsuOfTheMonth, count: jutsuCount[jutsuOfTheMonth] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Jutsu of the Month', error });
    }
};