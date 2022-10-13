const mongoose = require('mongoose');
const dbconfiq = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/strider', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connetcted");
    }

    catch {

        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
        process.exit();
    }

}

module.exports = dbconfiq;