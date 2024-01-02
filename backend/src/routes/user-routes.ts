import { Router } from "express";

import { getAllUsers, signupUser, loginUser } from "../controllers/user-controller";
import { validateSignup, validateLogin, tokenValidation } from "../validators/authValidators";

export const userRoutes = Router();

userRoutes.get("/", getAllUsers); // domain/api/v1/user/
userRoutes.post("/signup", validateSignup, signupUser); // domain/api/v1/user/signup
userRoutes.post("/login", validateLogin, loginUser); // domain/api/v1/user/login
userRoutes.get("/auth-status", tokenValidation); // domain/api/v1/user/auth-status
