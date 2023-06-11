const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment'); need this for thoughts and reactions

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
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
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
