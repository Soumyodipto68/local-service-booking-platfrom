import Booking from "../models/booking.model.js";


// CREATE BOOKING
export const createBooking = async (req, res) => {

  try {

    const {
      providerId,
      categoryId,
      address,
      city,
      area,
      bookingDate,
      bookingTime,
      notes,
      estimatedPrice
    } = req.body;

    const booking = await Booking.create({

      customerId: req.user._id,

      providerId,

      categoryId,

      address,
      city,
      area,

      bookingDate,
      bookingTime,

      notes,

      estimatedPrice
    });

    res.status(201).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// GET CUSTOMER BOOKINGS
export const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      customerId: req.user._id
    })
    .populate("providerId", "name email")
    .populate("categoryId", "name");

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// GET PROVIDER BOOKINGS
export const getProviderBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      providerId: req.user._id
    })
    .populate("customerId", "name email")
    .populate("categoryId", "name");

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// ACCEPT OR REJECT BOOKING
export const acceptBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    // only requested booking can be accepted
    if (booking.status !== "requested") {

      return res.status(400).json({
        message: "Invalid booking state"
      });

    }

    booking.status = "confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// START WORK
export const startWork = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    // confirmed -> in-progress
    if (booking.status !== "confirmed") {

      return res.status(400).json({
        message: "Only confirmed booking can start"
      });

    }

    booking.status = "in-progress";

    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// COMPLETE BOOKING
export const completeBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    // in-progress -> completed
    if (booking.status !== "in-progress") {

      return res.status(400).json({
        message:
          "Only in-progress booking can complete"
      });

    }

    booking.status = "completed";

    booking.workNotes =
      req.body.workNotes || "";

    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    // completed cannot cancel
    if (booking.status === "completed") {

      return res.status(400).json({
        message:
          "Completed booking cannot be cancelled"
      });

    }

    booking.status = "cancelled";

    booking.cancellationReason =
      req.body.reason || "";

    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

