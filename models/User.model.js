const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  contacts: { type: Schema.Types.Mixed, default: null },
  role: { type: String, default: 'user', required: true },
});

module.exports = model('User', UserSchema);
