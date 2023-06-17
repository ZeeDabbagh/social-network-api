const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment'); need this for thoughts and reactions

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: { // look for activity/syntac got defualt value set to a new object ID (look in mongoose docs too)
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: () => new Types.ObjectId(),

    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(timestamp) {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        return `${month}/${day}/${year}`;
      },

    },
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
