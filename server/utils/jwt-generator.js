import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_KEY_FOR_BCRYPT } = process.env;

const jwtGenerator = async (user) => {
    const payload = {
        ...user,
    };
    return await jwt.sign(payload, SECRET_KEY_FOR_BCRYPT, {
        expiresIn: "2 days",
    });
};

export default jwtGenerator;

// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { SECRET_KEY_FOR_BCRYPT } = process.env;

// module.exports = async (user) => {
// 	const payload = {
// 		...user,
// 	};
// 	return await jwt.sign(payload, SECRET_KEY_FOR_BCRYPT, {
// 		expiresIn: "2 days",
// 	});
// };
