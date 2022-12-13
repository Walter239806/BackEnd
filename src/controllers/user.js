import mongoose from "mongoose";
import Model from "../model/user.js";

export const CREATEUSR = async (req, res, next) => {

    try {

        const input = req.body;
        console.log("input:", input);

        const newPost = new Model(input);
        const result = await newPost.save();

        console.log("result", result);

        res.send('ok');

        
    } catch (error) {
        
        return next({

            Code:501,
            message: error.message
          
        });


    }

}

export const UPDATEUSR = async (req, res, next) => {

    try {

        const input = req.body;
        console.log("input:", input);

        const response = await Model.updateOne(
                {
                    _id: input._id

                },
                
        {... input}             


        )

        console.log("result", response);

        res.send('ok');

        
    } catch (error) {
        
        return next({

            Code:502,
            message: error.message
          
        });


    }

}

export const DELETEUSR = async (req, res, next) => {
    try {

        const input = req.body;
        console.log("input:", input);

        const response = await Model.deleteOne({

            _id : input._id

        },
        
        
        )

        console.log("result", response);

        res.send('ok');
       
    } catch (error) {
        return next({

            Code:503,
            message: error.message
          
        });
    }



}