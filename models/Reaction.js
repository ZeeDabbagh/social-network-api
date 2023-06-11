const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment'); need this for thoughts and reactions

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: { // look for activity/syntac got defualt value set to a new object ID (look in mongoose docs too)
      type: String,
      required: true,
      max_length: 280, //trimmed or trim
      min_length: 1,
    },
    createdAt: {
      type: String,
      default: Date.now,
      required: true, // change format of timestamp when getting in insomnia to something that is readable

    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
