const { Schema, model } = require("mongoose");

const invitationSchema = new Schema(
  {
    inviter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Inviter is required."],
    },
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    fun: {
      type: Schema.Types.ObjectId,
      ref: "Fun",
      required: [true, "Fun is required."],
    },
    isFresh: {
      type: Boolean,
      default: true,
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

const Invitation = model("Invitation", invitationSchema);

module.exports = Invitation;
