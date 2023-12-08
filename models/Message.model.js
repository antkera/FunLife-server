const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "addressee is required."],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiver is required."],

    },

    fun: {
      type: Schema.Types.ObjectId,
      ref: "Fun",
    },
    isFresh: {
      type: Boolean,
      default: true,
    },
    message: String,
    category: {
      type: String,
      enum: ["invitation", "message", "friendReq"],
      required: true,
      default: "message"
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
