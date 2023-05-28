import express from "express";
import { AddUser, Login, AddFavoriteProduct } from "../controllers/user.controller"

const router = express.Router();

router.post("/user/add", AddUser);
router.get("/user/login", Login);
router.post("/user/favorites", AddFavoriteProduct);

export default router;