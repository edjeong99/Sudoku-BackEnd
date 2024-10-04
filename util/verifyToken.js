const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']; // Expecting 'Bearer <token>'
    
    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    try {
    const bearerToken = token.split(' ')[1]; // Extract the actual token

    const decoded = await jwt.verify(bearerToken, process.env.JWT_SECRET) 

        req.userId = decoded.id; // Store user info from token (e.g., userId)
     //   req.userRole = decoded.role; // Store
        next(); // Proceed to next middleware or route handler
   
 }   catch (err) {
        res.status(401).send('Invalid token');
    }
    ;
};

module.exports = {verifyToken};
