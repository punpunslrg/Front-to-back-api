import express from "express";
import { login, register } from "../controllers/authController.js";
// Validate with yup
import { loginSchema, registerSchema, validate } from "../validations/validate.js";

const router = express.Router();

// ENDPOINT http://locahost:8000/auth/register
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
