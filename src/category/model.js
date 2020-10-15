const {categorySchema} = require('./categoryschema');
const mongoose = require('mongoose');

module.exports = mongoose.model('categories',categorySchema);