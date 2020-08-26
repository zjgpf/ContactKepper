const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/User');

// @router POST api/users
// @desc Register a user
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await UserModel.findOne({email}); 
    if (user) {
      return res.status(400).json({msg: 'User already exists'});
    }
    user = UserModel({name, email, password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {user:{id:user.id}};
    jwt.sign(
      payload, 
      config.get('jwtSecret'), 
      { expiresIn: 3600000 }, 
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever Error');
  }
});

module.exports = router;
