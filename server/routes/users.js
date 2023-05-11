import express from "express";
import {
	getUser,
	updateUser,
	deleteUser,
	followUser,
	unfollowUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/find/:id", getUser);
router.put("/follow/:id", verifyToken, followUser);
router.put("/unfollow/:id", verifyToken, unfollowUser);

export default router;
