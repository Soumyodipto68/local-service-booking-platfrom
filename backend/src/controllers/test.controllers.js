export const customerDashboard = async (req, res) => {

  res.status(200).json({
    success: true,
    message: `Welcome ${req.user.name}`
  });

};