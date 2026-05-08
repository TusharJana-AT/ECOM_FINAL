
import {
  getUser,
  loginUser,
  registerUser,
  updateProfile,
} from "../services/auth.service.js";
import { response } from "../utils/response.util.js";
import { messages } from "../messages/index.js";

export const register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);

    return response(res, {
      statusCode: 201,
      message: messages.auth.SIGNUP_SUCCESS,
      data,
    });
    // return res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   data
    // });
  } catch (err) {
    //   if (err.message === "User already exists") {
    //     return res.status(409).json({
    //       success: false,
    //       message: err.message
    //     });
    //   }

    //   return res.status(500).json({
    //     success: false,
    //     message: err.message
    //   });
    // }
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);

    // return res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   data
    // });
    return response(res, {
      statusCode: 200,
      message: messages.auth.SIGNIN_SUCCESS,
      data,
    });
  } catch (err) {
    // if (err.message === "User not found") {
    //   return res.status(404).json({
    //     success: false,
    //     message: err.message
    //   });
    //   }

    //   if (err.message === "Wrong password") {
    //     return res.status(400).json({
    //       success: false,
    //       message: err.message
    //     });
    //   }

    //   return res.status(500).json({
    //     success: false,
    //     message: err.message
    //   });
    return next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getUser(req.user.id);

    // const { password: _, ...userData } = user.toJSON();
    // res.status(200).json({
    //   success: true,
    //   data: user
    // });
    return response(res, {
      statusCode: 200,
      // message: messages.general.SUCCESS,
      data: user,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to fetch user"
    // });
    return next(err);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const data = await updateProfile(req.user.id, req.body);
    // res.status(200).json({
    //   success:true,
    //   message:"Updated Successfully"
    // })
    return response(res, {
      statusCode: 200,
      message: messages.auth.UPDATE_SUCCESS,
      // data
    });
  } catch (error) {
    // res.status(500).json({
    //   success:"false",
    //   message:error.message,
    // })
    return next(error);
  }
};
