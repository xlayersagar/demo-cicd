const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
},{collection: 'User'});

module.exports = mongoose.model('User', userSchema);
