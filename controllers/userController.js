export async function listUser(req, res) {
  res.json({ message: "This is List All User" })
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