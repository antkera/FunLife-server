const { Schema, model } = require("mongoose");

const invitationSchema = new Schema(
  {
    inviter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Inviter is required."],
    },
    invitee: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["friendship", "fun"],
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = model("Invitation", invitationSchema);

module.exports = Invitation;
