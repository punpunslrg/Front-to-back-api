export async function authCheck(req, res, next) {
  if(false) {
    console.log("This is middleware")
  }
  next()
}