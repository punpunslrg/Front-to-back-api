import { object, ref, string } from "yup";

export const registerSchema = object({
  email: string().email("Email is invalid").required("Email is required"),
  name: string().min(3, "Name must be at least 6 characters"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: string().oneOf(
    [ref("password")],
    "Confirm password is not match"
  ),
});

export const loginSchema = object({
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(", ");
    const mergeError = new Error(errTxt);
    // console.log(mergeError)
    next(mergeError);
  }
};
