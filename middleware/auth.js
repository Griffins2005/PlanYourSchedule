const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'No token found. Authorization denied.' });
  }

  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token found. Authorization denied.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

module.exports = {
  authenticateUser,
};
