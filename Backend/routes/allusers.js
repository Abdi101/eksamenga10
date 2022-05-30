const {
  generateToken,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndEmployee,
  verifyTokenAndAdmin
} = require('../helpers/webToken');
const User = require("../models/User");
const router = require("express").Router()

// Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// Update user
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { $set: userData }, { new: true });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// Get a user by id
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const { password, ...userData } = user._doc;
    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// Delete user by ID
router.delete("/remove/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(404).json({ error: `User of given ID (${req.params.id}) not found`, err });
    // return res.status(500).json(err);
  }
})

module.exports = router;
