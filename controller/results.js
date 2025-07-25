const ResultModel = require('../model/results');

// Create and Save a new Result
exports.create = async (req, res) => {
    const { user_id, exam_id, score } = req.body;

    if (!user_id || !exam_id || score === undefined) {
        return res.status(400).send({ message: "All fields (user_id, exam_id, score) are required!" });
    }

    const newResult = new ResultModel({
        user_id,
        exam_id,
        score,
        timestamp: new Date()
    });

    try {
        const saved = await newResult.save();
        res.status(201).send({
            message: "Result created successfully!",
            result: saved
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the result."
        });
    }
};

// Retrieve all Results
exports.findAll = async (req, res) => {
    try {
        const results = await ResultModel.find().populate('user_id'); // Populate user info if needed
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find a single Result by ID
exports.findOne = async (req, res) => {
    try {
        const result = await ResultModel.findById(req.params.id).populate('user_id');
        if (!result) {
            return res.status(404).json({ message: "Result not found." });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a Result by ID
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    try {
        const updated = await ResultModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return res.status(404).send({ message: "Result not found." });
        }

        res.send({ message: "Result updated successfully.", result: updated });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete a Result by ID
exports.destroy = async (req, res) => {
    try {
        const deleted = await ResultModel.findByIdAndRemove(req.params.id);

        if (!deleted) {
            return res.status(404).send({ message: "Result not found." });
        }

        res.send({ message: "Result deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
