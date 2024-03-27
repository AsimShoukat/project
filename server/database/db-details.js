// require("dotenv").config();
// const { LOCAL_HOST, USER, PASSWORD, DATABASE, DATABASE_PORT } = process.env;

// const givingDatabaseData = () => {
// 	if (process.env.DATABASE_URL) {
// 		return {
// 			connectionString: process.env.DATABASE_URL,
// 			ssl: { rejectUnauthorized: false },
// 		};
// 	} else {
// 		return {
// 			host: LOCAL_HOST,
// 			user: USER,
// 			database: DATABASE,
// 			password: PASSWORD,
// 			port: DATABASE_PORT,
// 		};
// 	}
// };

// module.exports = givingDatabaseData();

import { config } from 'dotenv';
config({ path: './server/.env' });
import Sequelize  from "sequelize";


const env = process.env;
console.log(env,"env")
const sequelize = new Sequelize(env.DATABASE,env.USER,env.PASSWORD,{
    port: env.DATABASE_PORT || 5432,
    host: env.LOCAL_HOST,
    dialect: "postgres"
});
const connectDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log("Connection established");
    }
    catch(error){
        console.log("Error occurred");
    }
}
export default sequelize;
export {connectDB};
