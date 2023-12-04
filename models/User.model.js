const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    funs: [{ type: Schema.Types.ObjectId, ref: "Fun" }],
    username: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentaries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Commentary",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required."],
      //---//
      sentMessages: [String],
      messages: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
