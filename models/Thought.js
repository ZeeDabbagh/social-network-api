const { Schema, model, Type } = require('mongoose');
const reactionSchema = require('./Reaction')


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: function(timestamp) {
        const date = new Date(timestamp);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        return `${month}/${day}/${year}`;
      },

    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
      reactionSchema
    ], 
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get( function() {
  return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
