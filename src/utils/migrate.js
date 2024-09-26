const JutsuScroll = require('../models/JutsuScroll');
const Ninja = require('../models/Ninja');

const seedDatabase = async () => {
    const jutsuScrolls = [
        { name: 'Rasengan', creator: 'Minato', rank: 'A', quantity: 10, description: 'A spinning sphere of chakra.', category: 'Offensive', associatedTechniques: ['Rasenshuriken'] },
        // Ajouter d'autres rouleaux ici si besoin...
    ];

    const ninjas = [
        { name: 'Naruto Uzumaki', rank: 'Genin', clan: 'Uzumaki', specialty: 'Ninjutsu' },
        // Ajouter d'autres ninjas ici si besoin...
    ];

    await JutsuScroll.insertMany(jutsuScrolls);
    await Ninja.insertMany(ninjas);

    console.log('Database seeded with Jutsu Scrolls and Ninjas');
};

module.exports = seedDatabase;
