import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
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

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    bookingDate: {
      type: String,
      required: true
    },

    bookingTime: {
      type: String,
      required: true
    },

    notes: {
      type: String
    },

    issueImage: {
      type: String
    },

    estimatedPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,

      enum: [
        "requested",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled"
      ],

      default: "requested"
    },

    cancellationReason: {
      type: String
    },

    workNotes: {
      type: String
    },

    beforeImages: [String],

    afterImages: [String]
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;