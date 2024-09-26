const mongoose = require('mongoose');

const NinjaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true },
    jutsusMastered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JutsuScroll' }],
    clan: { type: String },
    specialty: { type: String },
    borrowHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Borrow' }],
    location: {
        type: { type: String, enum: ['Point'], required: true }, // Type de géométrie
        coordinates: { type: [Number], required: true } // Coordonnées [longitude, latitude]
    },
});

// Index pour les recherches géospatiales
NinjaSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ninja', NinjaSchema);
