const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/nimap",{useNewUrlParser:true,useUnifiedTopology:true},
() => {
    console.log(`Database Connected Succefully`);
});