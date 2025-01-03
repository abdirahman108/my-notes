const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({err: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (err) {
    console.log(err)
    res.status(401).json({err: 'Request is not authorized'})
  }
}

module.exports = requireAuth