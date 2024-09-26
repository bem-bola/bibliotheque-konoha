const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    ninjaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ninja', required: true },
    jutsuScrollId: { type: mongoose.Schema.Types.ObjectId, ref: 'JutsuScroll', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['pending', 'returned', 'overdue', 'reserved'], default: 'pending' },
    notes: { type: String },
    reservedUntil: { type: Date }, // Champ pour la date de réservation
    isReserved: { type: Boolean, default: false } // Indique si le rouleau est réservé
});

module.exports = mongoose.model('Borrow', BorrowSchema);
