import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

export async function listUser(req, res, next) {
  try {
    const user = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });
    console.log(user);

    res.json({ message: "This is List All User", result: user });
  } catch (error) {
    next(error);
  }
}

export async function updateRoleUser(req, res, next) {
  try {
    // 1. Read params & body
    const { id } = req.params
    const { role } = req.body
    console.log(id, role)

    res.json({ message: "This is Update Role User" });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    res.json({ message: "This is DELETE User" });
  } catch (error) {
    next(error);
  }
}

export async function readUser(req, res) {
  res.json({ message: "This is Read User" });
}

export async function createUser(req, res) {
  res.json({ message: "This is POST User" });
}
