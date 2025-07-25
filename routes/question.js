const express = require('express');
const router = express.Router();

const controller = require('../controller/question.js');

router.post('/', controller.create);                  
router.get('/', controller.findAll);                  
router.get('/paper/:paper', controller.findByPaper);  
router.get('/:id', controller.findOne);               
router.put('/:id', controller.update);                
router.delete('/:id', controller.destroy);            

module.exports = router;
