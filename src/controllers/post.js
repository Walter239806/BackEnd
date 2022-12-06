import mongoose from "mongoose";
import Post from "../model/post.js";

export const CREATEPOST = (req, res, next) => {

    try {

        const input = req.body;
        console.log("input:", input);

        
    } catch (error) {
        
        return next({

            Code:501,
            message: "Post Create Error"
          
        
        });


    }

}