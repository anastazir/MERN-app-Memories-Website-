import express from "express";

import { signin, signup, getPostsByUserID } from "../controllers/user.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

// GET POSTS BY USER ID
router.get('/:id', getPostsByUserID);
export default router;