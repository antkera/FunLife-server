const { Schema, model } = require("mongoose");

const commentarySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    fun: {
      type: Schema.Types.ObjectId,
      ref: "Fun",
      required: [true, "Fun is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Commentary = model("Commentary", commentarySchema);

module.exports = Commentary;
comen;
