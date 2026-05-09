import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import ProviderProfile from "../models/providerProfile.model.js";


// CREATE REVIEW
export const createReview = async (req, res) => {

  try {

    const {
      bookingId,
      rating,
      review
    } = req.body;

    const booking =
      await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    // only completed booking
    if (booking.status !== "completed") {

      return res.status(400).json({
        message:
          "Review allowed only after completion"
      });

    }

    // prevent duplicate review
    const existingReview =
      await Review.findOne({ bookingId });

    if (existingReview) {

      return res.status(400).json({
        message: "Review already submitted"
      });

    }

    const newReview = await Review.create({

      bookingId,

      customerId: req.user._id,

      providerId: booking.providerId,

      rating,

      review

    });

    // UPDATE PROVIDER RATING
    const providerReviews =
      await Review.find({
        providerId: booking.providerId
      });

    const totalRatings =
      providerReviews.reduce(
        (acc, item) => acc + item.rating,
        0
      );

    const average =
      totalRatings / providerReviews.length;

    await ProviderProfile.findOneAndUpdate(
      { userId: booking.providerId },
      {
        ratingsAverage: average,
        totalReviews: providerReviews.length
      }
    );

    res.status(201).json({
      success: true,
      review: newReview
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};