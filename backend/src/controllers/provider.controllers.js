import ProviderProfile from "../models/providerProfile.model.js";


// CREATE PROFILE
export const createProviderProfile = async (req, res) => {

  try {

    // check existing profile
    const existingProfile =
      await ProviderProfile.findOne({
        userId: req.user._id
      });

    if (existingProfile) {

      return res.status(400).json({
        success: false,
        message: "Profile already exists"
      });

    }

    const {
      profession,
      description,
      experience,
      pricing
    } = req.body;

    const profile = await ProviderProfile.create({
      userId: req.user._id,
      profession,
      description,
      experience,
      pricing
    });

    res.status(201).json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET MY PROFILE
export const getMyProviderProfile = async (req, res) => {

  try {

    const profile =
      await ProviderProfile.findOne({
        userId: req.user._id
      }).populate("userId", "name email city area");

    if (!profile) {

      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });

    }

    res.status(200).json({
      success: true,
      profile
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// TOGGLE AVAILABILITY
export const toggleAvailability = async (req, res) => {

  try {

    const profile =
      await ProviderProfile.findOne({
        userId: req.user._id
      });

    if (!profile) {

      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });

    }

    profile.availability =
      !profile.availability;

    await profile.save();

    res.status(200).json({
      success: true,
      availability: profile.availability
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};