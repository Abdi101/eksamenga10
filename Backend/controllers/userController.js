const User = require("../models/User");
const { generateToken } = require('../helpers/webToken');
const CryptoJS = require('crypto-js');

module.exports = {
  // Register new user
  createUser: async (req, res) => {
    const userData = new User({
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, 'process.env.PASS_SECRET')
    });

    // check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({ error: `User with email (${req.body.email}) already exists, try again.` });
    } else {
      const newUser = new User(userData);
      newUser.save()
        .then((user) => {
          let tokenPayload = {
            id: user._id,
            email: user.email,
            isAnEmployee: user.isAnEmployee,
            isAdmin: user.isAdmin
          }
          res.status(201).json({ newUser, token: generateToken(tokenPayload) });
        })
        .catch((err) => {
          res.status(500).json({ error: 'Failed to add user, try again.', err });
        });
    }

  },

  // Login user
  userLogin: async (req, res) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: req.body.email })

      // Check if a user exist in the database
      if (!user) {
        return res.status(404).json({ error: "User not found!. Please create an account."});
      }

      // Decrypt pasword
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        "process.env.PASS_SECRET"
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      // Compare password entered and the pasword in the database
      if (OriginalPassword !== req.body.password) {
        return res.status(401).json({ error: 'Wrong user password entered, try again.' });
      }

      // send token
      let tokenPayload = {
        id: user._id,
        email: user.email,
        isAnEmployee: user.isAnEmployee,
        isAdmin: user.isAdmin
      }

      // Hide the password from being displayed in the response
      const { password, ...others } = user._doc

      // Send response without a password as its sensitive
      res.status(200).json({ message: "Login successfull", ...others, token: generateToken(tokenPayload) });
    } catch (err) {
      res.status(500).json(err)
    }
  },

};



