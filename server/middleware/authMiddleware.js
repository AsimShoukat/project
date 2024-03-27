import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = async (req, res, next) => {
    try {
        const jwtTokenFromClient = req.header("token");

        if (!jwtTokenFromClient) {
            return res.status(403).json("Not Authorized");
        }

        // jwt.verify compares 'token from client' and the secret key from .env. If they match, it returns the payload.
        const payload = jwt.verify(jwtTokenFromClient, process.env.SECRET_KEY_FOR_BCRYPT);

        req.user = payload;
        next();
    } catch (e) {
        console.error(e.message);
        return res.status(403).json("Not Authorized");
    }
};

export default authMiddleware;



// import jwt from 'jsonwebtoken';
// import { jwtSecret } from '../config.js'; // Assuming you have a config file. Adjust the path as necessary.

// const authMiddleware = async (req, res, next) => {
//     try {
//         const jwtTokenFromClient = req.header("token");

//         if (!jwtTokenFromClient) {
//             return res.status(403).json("Not Authorized");
//         }

//         // jwt.verify compares 'token from client' and 'jwtSecret'. If they match, it returns the payload.
//         const payload = jwt.verify(jwtTokenFromClient,SECRET_KEY_FOR_BCRYPT);

//         req.user = payload;
//         next();
//     } catch (e) {
//         console.error(e.message);
//         return res.status(403).json("Not Authorized");
//     }
// };

// export default authMiddleware;

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { SECRET_KEY_FOR_BCRYPT } = process.env;

// module.exports = async (req, res, next) => {
// 	try {
// 		const jwtTokenFromClient = req.header("token");

// 		if (!jwtTokenFromClient) {
// 			return res.status(403).json("Not Authozied");
// 		}

// 		//jwt.verify compair 'token from client' and secretKeyFrom and if 'jwtTokenFromClient' and 'SECRET_KEY_FOR_BCRYPT' matched the its return payload
// 		const payload = jwt.verify(jwtTokenFromClient, SECRET_KEY_FOR_BCRYPT);

// 		req.user = payload;
// 		next();
// 	} catch (e) {
// 		console.error(e.message);
// 		return res.status(403).json("Not Authozied");
// 	}
// };
