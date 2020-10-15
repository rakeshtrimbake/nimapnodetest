const {productSchema} = require('./productschema');
const mongoose = require('mongoose');

module.exports = mongoose.model('products',productSchema);