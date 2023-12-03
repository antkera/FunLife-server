const { Schema, model } = require("mongoose");

const funCollectionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    funs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fun",
      },
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FunCollection = model("FunCollection", funCollectionSchema);

module.exports = FunCollection;
