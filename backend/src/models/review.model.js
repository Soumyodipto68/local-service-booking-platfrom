import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    review: {
      type: String
    },

    status: {
      type: String,
      enum: ["visible", "hidden"],
      default: "visible"
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model(
  "Review",
  reviewSchema
);

export default Review;