const JutsuScroll = require('../models/JutsuScroll');

exports.createJutsuScroll = async (req, res) => {
    try {
        const newJutsuScroll = new JutsuScroll(req.body);
        await newJutsuScroll.save();
        res.status(201).json(newJutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Jutsu Scroll', error });
    }
};

exports.getJutsuScrolls = async (req, res) => {
    try {
        const jutsuScrolls = await JutsuScroll.find();
        res.status(200).json(jutsuScrolls);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Jutsu Scrolls', error });
    }
};

exports.getJutsuScrollById = async (req, res) => {
    try {
        const jutsuScroll = await JutsuScroll.findById(req.params.id);
        if (!jutsuScroll) {
            return res.status(404).json({ message: 'Jutsu Scroll not found' });
        }
        res.status(200).json(jutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Jutsu Scroll', error });
    }
};

exports.updateJutsuScroll = async (req, res) => {
    try {
        const updatedJutsuScroll = await JutsuScroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJutsuScroll) {
            return res.status(404).json({ message: 'Jutsu Scroll not found' });
        }
        res.status(200).json(updatedJutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Jutsu Scroll', error });
    }
};

exports.deleteJutsuScroll = async (req, res) => {
    try {
        const deletedJutsuScroll = await JutsuScroll.findByIdAndDelete(req.params.id);
        if (!deletedJutsuScroll) {
            return res.status(404).json({ message: 'Jutsu Scroll not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Jutsu Scroll', error });
    }
};
