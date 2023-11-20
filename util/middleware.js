const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'TypeError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'Validation Error') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    } else if(error.name === 'SequelizeValidationError') {
      return response.status(400).json({ error: 'wrong type of email!' })
    }
  
    next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}


module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}