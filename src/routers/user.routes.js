import express from "express";
import { AddUser, Login } from "../controllers/user.controller"

const router = express.Router();

router.post("/user/add", AddUser);
router.get("/user/login", Login);

export default router;