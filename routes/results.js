const express = require('express');
const ResultController = require('../controller/results');
const router = express.Router();

router.get('/', ResultController.findAll);
router.get('/:id', ResultController.findOne);
router.post('/', ResultController.create);
router.put('/:id', ResultController.update);
router.delete('/:id', ResultController.destroy);

module.exports = router;
