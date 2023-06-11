const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment'); need this for thoughts and reactions

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 50, //trimmed or trim
    },
    email: {
      type: String,
      required: true,
      max_length: 50, //google validation (regex)
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
