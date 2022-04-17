const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }
            resolve(user);
        })
    })
}


module.exports = async (req, res, next) => {
    //check if authorization header has been set
    //if not, throw error
    if (!req.headers.authorization) {
        return res.status(400)
            .send({ message: "Authorization token was not provided or token not valid" });

    }
    //check if bearer token is in authorization header 
    //if not thrown error
    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(400)
            .send({ message: "Authorization token was not provided or token not valid" });

    }
    //split the bearer token and get the [1] which is the token
    const token = req.headers.authorization.split(" ")[1]

    //the we will call jsonwebtoken to verify the token 
    let user;
    //if token is invalid then we will thrown an error
    try {
        user = await verifyToken(token);

    } catch (error) {
        return res.status(400)
            .send({ message: "Authorization token was not provided or token not valid" });
    }

    req.user = user.user;

    //if token is valid then we will pu the user retrived from the token, in the req object

    return next()
}



