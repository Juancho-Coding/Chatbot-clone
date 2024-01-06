import { Router } from "express";

import {
    getAllUsers,
    signupUser,
    loginUser,
    userAuthStatus,
    logoutUser,
} from "../controllers/user-controller";
import { validateSignup, validateLogin, tokenValidation } from "../validators/authValidators";

export const userRoutes = Router();

userRoutes.get("/", getAllUsers); // domain/api/v1/user/
userRoutes.post("/signup", validateSignup, signupUser); // domain/api/v1/user/signup
userRoutes.post("/login", validateLogin, loginUser); // domain/api/v1/user/login
userRoutes.get("/auth-status", tokenValidation, userAuthStatus); // domain/api/v1/user/auth-status
userRoutes.get("/logout", tokenValidation, logoutUser); // domain/api/v1/user/auth-status
