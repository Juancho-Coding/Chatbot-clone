import { Router } from "express";

import { userRoutes } from "./user-routes";
import { chatRoutes } from "./chat-routes";

export const router = Router();

router.use("/user", userRoutes); // domain/api/v1/user
router.use("/chat", chatRoutes); // domain/api/v1/chat
