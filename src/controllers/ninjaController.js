const Ninja = require('../models/Ninja');

exports.createNinja = async (req, res) => {
    try {
        const newNinja = new Ninja(req.body);
        await newNinja.save();
        res.status(201).json(newNinja);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Ninja', error });
    }
};

exports.getNinjas = async (req, res) => {
    try {
        const ninjas = await Ninja.find();
        res.status(200).json(ninjas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Ninjas', error });
    }
};

exports.getNinjaById = async (req, res) => {
    try {
        const ninja = await Ninja.findById(req.params.id);
        if (!ninja) {
            return res.status(404).json({ message: 'Ninja not found' });
        }
        res.status(200).json(ninja);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Ninja', error });
    }
};

exports.updateNinja = async (req, res) => {
    try {
        const updatedNinja = await Ninja.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNinja) {
            return res.status(404).json({ message: 'Ninja not found' });
        }
        res.status(200).json(updatedNinja);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Ninja', error });
    }
};

exports.deleteNinja = async (req, res) => {
    try {
        const deletedNinja = await Ninja.findByIdAndDelete(req.params.id);
        if (!deletedNinja) {
            return res.status(404).json({ message: 'Ninja not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Ninja', error });
    }
};
