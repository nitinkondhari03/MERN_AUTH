import express from "express";
import { test } from "../controllers/users_controller.js";

const router=express.Router();

router.get("/",test)

export default router