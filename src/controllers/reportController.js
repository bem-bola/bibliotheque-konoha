const Ninja = require('../models/Ninja');
const Borrow = require('../models/Borrow');

exports.populariteJutsuParRang = async (req, res) => {
    try {
        const result = await Borrow.aggregate([
            {
                $lookup: {
                    from: 'ninjas',
                    localField: 'ninjaId',
                    foreignField: '_id',
                    as: 'ninjaDetails',
                },
            },
            {
                $unwind: '$ninjaDetails',
            },
            {
                $group: {
                    _id: {
                        rang: '$ninjaDetails.rang',
                        jutsuScrollId: '$jutsuScrollId',
                    },
                    totalEmprunts: { $sum: 1 },
                },
            },
            {
                $sort: { totalEmprunts: -1 }, // Trier par nombre d'emprunts
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la génération du rapport', error });
    }
};
