const express = require('express');
const router = express.Router();
const {verify} = require('./../authentication/auth');
const controller = require('./controller');

router.post('/',verify, controller.addCategory);
router.get('/',verify, controller.getAllCategory);
router.get('/:id',verify, controller.getById);
router.put('/:id',verify, controller.updateCategory);
router.delete('/:id',verify, controller.deleteCategory);

module.exports = router;