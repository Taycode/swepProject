const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname:{
    type: String,
  },
  lastname: {
      type: String,
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: 8
  },
  terms: {
    type: String,
    default: 'off',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('users', UserSchema);

// UserSchema.pre('save', function (next) {
//   let user = this;
//   bcrypt.hash(user.password, 10, (err, hash) => {
//       if (err)
//           return err;

//       user.password = hash;
//       next();
//   });
// });



const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;