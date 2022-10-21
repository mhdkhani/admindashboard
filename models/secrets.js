const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    }
});
const Secret = mongoose.model('Secrets', UserSchema);
module.exports = Secret;
