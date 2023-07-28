const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user model
// Hash the password before saving the user model
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  next();
});
// Add a method to compare the password
// Add a method to compare the password
UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (typeof callback === 'function') { // Ensure callback is a function
            if (err) return callback(err);
            else callback(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);
