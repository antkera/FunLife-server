const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    funCollection: {
      type: Schema.Types.ObjectId,
      ref: "FunCollection",
      required: [true, "FunCollection is required"],
    },
    comment: String,
    stars: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Stars are required"],
    },
  },
  {
    timestamps: true,
  }
);

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
