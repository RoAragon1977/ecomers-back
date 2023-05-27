import express from "express";
import { AddUser, Login, AddFavoriteProduct } from "../controllers/user.controller"

const router = express.Router();

router.post("/user/add", AddUser);
router.get("/user/login", Login);
router.post("/users/:usuarioId/favorites/:productoId", AddFavoriteProduct);

export default router;