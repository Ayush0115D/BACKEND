const mongoose = require('mongoose');
async function connectToMongoDB() {
        await mongoose.connect(url);
}
module.exports = {
    connectToMongoDB
};  