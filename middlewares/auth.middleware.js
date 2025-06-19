import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export async function authCheck(req, res, next) {
  try {
    /*
      1. Check header
      2. Split Token Bearer
      3. Verify JWT
      4. Create req.user
    */

    // 1. Check header
    const header = req.headers.authorization;
    // console.log(header)
    if (!header) {
      createError(401, "Token is missing, authorization denied");
    }

    // console.log("headers from middleware ==>", header);
    // 2. Split Token
    const token = header.split(" ")[1];

    // 3. Verify Token
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decode) => {
      // console.log("error", error);
      // console.log("decode", decode);
      if (error) {
        createError(401, "Token is Invalid !");
      }

      req.user = decode;
      next()
    });
  } catch (error) {
    next(error);
  }
}
