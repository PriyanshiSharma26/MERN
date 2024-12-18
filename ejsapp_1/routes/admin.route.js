import express from "express";
import { singInPage, signInAction , dashboardPageAction } from "../controller/admin.controller.js";

import { verify } from "../middleware/authentication.js";

const router = express.Router();

// http://localhost:3000/admin/sign-in
router.get("/sign-in",singInPage);
router.post("/sign-in",signInAction);
router.get("/dashboard",verify, dashboardPageAction)
export default router;