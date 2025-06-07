import argon2 from "argon2";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.mjs";
import { getUserByID } from "../modules/userModules.mjs";

//modules
import { createUser, getUserByUserName } from "../modules/userModules.mjs";


//function to generate jwt token, payload - id
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};


//function to send cookie to front
const sendTokenCookie = (token, res) => {
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 3600 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOption);
};


//register
export const register = async (req, res, next) => {
  try {
    const newUser = req.body;
   
    
    const hash = await argon2.hash(newUser.password);

    newUser.password = hash;

    const createdUser = await createUser(newUser);

    if (!createdUser) {
      throw new AppError("User not Created", 400);
    }

     //User log ins after registration
    const token = signToken(createdUser.id);
    
    sendTokenCookie(token, res);


    createdUser.password = undefined;

    res.status(201).json({
      status: "Success",
      data: { userId: createdUser.id },
    });
  } catch (error) {
    next(new AppError(error.message || "Registration failed", 500));
  }
};



//login
export const login = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await getUserByUserName(username);

    const token = signToken(user.id);
    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(new AppError(error.message || "Login failed", 500));
  }
};

//logout

export const logout = (req, res) => {
  return res.clearCookie('jwt')
  .status(200)
  .json({
    message: "You are logged out",
  })
}

//protect

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token) {
      throw new Error("You are not loged in.", 401);
    }

    //token verify

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    //check if user exist
    const currentUser = await getUserByID(decoded.id);

    if (!currentUser) {
      throw new Error("User not exist");
    }

    //grant accees to protected rout, add user to req object
    req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
};


//get authenticateduser

export const getAuthenticatedUser = (req,res ) => {

  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      data:user
    });

  } catch (error) {
    throw new Error(error)
  }
}


// role checking
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
