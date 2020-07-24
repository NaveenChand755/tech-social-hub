const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require("../../models/User");

//@route       POST api/users
//@description register user
//@access      Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
       return  res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gavator based on emails
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // and return jsonwebtoken
      const payload = {
        user:{
            id: user.id
        }
      }
      jwt.sign(payload , config.get('jwtToken') , {expiresIn:360000}, (error,token)=>{
            if(error)
                throw error
                res.json({token})
      })
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
