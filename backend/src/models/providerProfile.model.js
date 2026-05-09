import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    profession: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    experience: {
      type: Number,
      default: 0
    },

    pricing: {
      type: Number,
      required: true
    },

    availability: {
      type: Boolean,
      default: true
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    ratingsAverage: {
      type: Number,
      default: 0
    },

    totalReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const ProviderProfile = mongoose.model(
  "ProviderProfile",
  providerProfileSchema
);

export default ProviderProfile;