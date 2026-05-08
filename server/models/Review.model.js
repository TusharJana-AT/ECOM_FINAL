import { DataTypes } from "sequelize";

import { sequelize } from "../config/db.js";
import { number } from "zod";


const Review=sequelize.define("Review",{
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:5
        }
    },

    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    
},{
    indexes:[
        {
            unique:true,
            fields:["userId","productId"]
        }
    ]
})

export default Review;