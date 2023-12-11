import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
    res.send("ok");
});

router.get("/home", (req, res, next) => {
    res.send("home");
});
