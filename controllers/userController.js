import { createError } from "../utils/createError.js"

export async function listUser(req, res, next) {
  try {
    if(true){
      createError(400, "Email is already exists")
    } else {
      throw new Error('Password is invalid !!')
    }
    res.json({ message: "This is List All User" })
  } catch (error) {
    next(error)
  }
}

export async function readUser(req, res) {
  res.json({ message: "This is Read User" })
}

export async function createUser(req, res) {
  res.json({ message: "This is POST User" })
}

export async function updateRoleUser(req, res) {
  res.json({ message: "This is Update Role User" })
}

export async function deleteUser(req, res) {
  res.json({ message: "This is DELETE User" })
}