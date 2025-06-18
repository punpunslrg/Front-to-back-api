import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    /*
  0. Validate with yup
  1. Check body
  2. Checl email in DB
  3. Encrypt password => bcrypt
  4. Save to DB => Prisma
  5. Response
*/
    // 1. Check Body
    // console.log(req.body)
    const { email, name, password } = req.body;

    // 2. Check email in DB
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // console.log(user)
    if (user) {
      createError(400, "Email is already exist");
    }

    // 3. Encrypt password
    const hash = await bcrypt.hash(password, 10);

    // 4. Save to DB
    const result = await prisma.user.create({
      data: {
        email,
        password: hash,
        name,
      },
    });

    // 5. Response
    res.json({ message: "Register Success !", result });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  /*
  1. Validate Body
  2. Check Body
  3. Check Email in DB
  4. Check password
  5. Create token
  6. Response 
  */

  try {
    // 1. Validata Body
    // 2. Check Body
    const { email, password } = req.body;

    // 3. Check Email in DB
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      createError(400, "Email is invalid");
    }

    // 4. Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError(400, "Password is invalid");
    }

    // 5. Create token
    const payload = { id: user.id, role: user.role }
    const token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn: "7d",
    });

    // 6. Response
    res.json({ message: "Login Success !", accessToken: token });
  } catch (error) {
    next(error);
  }
}
