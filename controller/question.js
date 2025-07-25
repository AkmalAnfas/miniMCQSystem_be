const QuestionModel = require('../model/question');

// Create and Save a new Question
exports.create = async (req, res) => {
    const { question, option1, option2, option3, option4, paper, answer } = req.body;

    if (!question || !option1 || !option2 || !option3 || !option4 || !paper || !req.body.answer) {
        return res.status(400).send({ message: "All fields are required!" });
    }

    const newQuestion = new QuestionModel({
        question,
        option1,
        option2,
        option3,
        option4,
        paper,
        answer
    });

    try {
        const saved = await newQuestion.save();
        res.status(201).send({
            message: "Question created successfully!",
            question: saved
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the question."
        });
    }
};

// Retrieve all Questions
exports.findAll = async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Find a single Question by ID
exports.findOne = async (req, res) => {
    try {
        const question = await QuestionModel.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a Question by ID
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    try {
        const updated = await QuestionModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) {
            return res.status(404).send({ message: "Question not found." });
        }

        res.send({ message: "Question updated successfully.", question: updated });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete a Question by ID
exports.destroy = async (req, res) => {
    try {
        const deleted = await QuestionModel.findByIdAndRemove(req.params.id);

        if (!deleted) {
            return res.status(404).send({ message: "Question not found." });
        }

        res.send({ message: "Question deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Find Questions by Paper Name
exports.findByPaper = async (req, res) => {
    const paperName = req.params.paper;

    try {
        const questions = await QuestionModel.find({ paper: paperName });

        if (questions.length === 0) {
            return res.status(404).json({ message: `No questions found for paper: ${paperName}` });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
