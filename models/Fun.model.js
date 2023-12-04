const { Schema, model } = require("mongoose");

const funSchema = new Schema(
  {
    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    collection: {
      type: Schema.Types.ObjectId,
      ref: "FunCollection",
    },
    time: String,
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    mainImg: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
    comentarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Commentary",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Fun = model("Fun", funSchema);

module.exports = Fun;
