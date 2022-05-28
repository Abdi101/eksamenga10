const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) res.status(403).json("Token is not valid!")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
}

const verifyTokenAndEmployee = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAnEmployee || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not alowed to do that!");
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
           return res.status(403).json("You are not an admin!");
        }
    });
}

module.exports = { 
    generateToken, 
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndEmployee, 
    verifyTokenAndAdmin 
}

