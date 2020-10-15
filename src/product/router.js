const express = require('express');
const router = express.Router();
const {verify} = require('./../authentication/auth');
const controller = require('./controller');

router.post('/',verify, controller.addProduct);
router.get('/',verify, controller.getAllProduct);
router.get('/:id',verify, controller.getById);
router.put('/:id',verify, controller.updateProduct);
router.delete('/:id',verify, controller.deleteProduct);


module.exports = router;