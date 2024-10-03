const { Schema, model, Types } = require('mongoose');

// Schema for Reactions
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Corrected to use maxlength
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Optional timestamp formatting
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Schema for Thoughts
const thoughtSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Optional timestamp formatting
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
      virtuals: true, // Make sure virtual fields are serialized
    },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Model for Thought
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
