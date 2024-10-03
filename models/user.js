const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50, // Correct validation keyword
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address.",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true, // Ensure virtuals are included in the JSON output
    },
    id: false,
  }
);

// Virtual to get friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create and export the User model
const User = model('User', userSchema);

module.exports = User;
