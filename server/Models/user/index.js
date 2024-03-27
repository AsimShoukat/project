import {DataTypes} from "sequelize";
import sequelize from "../../database/db-details.js";
const userModel = sequelize.define(
    "User",{
        name:{
            type: DataTypes.STRING(20),
        },
        email:{
            type: DataTypes.STRING(50),
        },
        password:{
            type:DataTypes.STRING(),
        },
        phone:{
            type:DataTypes.STRING(15),
        }
    },
    {
        paranoid:true,
    }
);
export default userModel;