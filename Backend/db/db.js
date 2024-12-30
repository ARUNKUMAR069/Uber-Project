const mongoose = require('mongoose')
function connectToDb() {
    mongoose.connect(process.env.DB_URL, {
    }).then(() => {
        console.log("MongoDB connected successfully");
    }).catch((error) => {
        console.log("MongoDB connection failed");
        console.error(error);
        process.exit(1);
    })
}

module.exports = connectToDb