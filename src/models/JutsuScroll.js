const mongoose = require('mongoose');

const JutsuScrollSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    rank: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    techniques: { type: [String], required: true },
    reservation: { type: Boolean, default: false } // Champ de réservation
});

module.exports = mongoose.model('JutsuScroll', JutsuScrollSchema);
