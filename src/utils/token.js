import jwt from "jsonwebtoken";
import config from "../configs/app.config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.auth.secret, { expiresIn: "7d" });
};
