const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/User');
const auth = require('../middleware/auth');

// @router GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router POST api/auth
// @desc Auth user & get token
// @access Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({email});
    if (!user) return res.status(400).json({msg: 'Invalid Credentials'});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});
    const payload = { user: { id: user.id} };
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
    res.status(500).send('Server Error');
  }
});

module.exports = router;
