const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const User = require('./user.model');

router.route('/').post(async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    // User exist, compare password
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // Password ok, need generation token
      const token = jwt.sign({
        userId: candidate._id,
        login: candidate.login
      }, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
      res.status(200).send({
        token: `${token}`
      });
    } else {
      // Password wrong
      res.status(403).json({
        message: 'User or password incorrect'
      });
    }
  } else {
    // User not found
    res.status(403).json({
      message: 'User not found'
    });
  }
});

module.exports = router;
