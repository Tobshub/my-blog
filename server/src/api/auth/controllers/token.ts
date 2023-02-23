import jwt from "jsonwebtoken";
import { env } from "../../../index";

// generate token
export async function genToken(salt: string) {
  try {
    if (env.JwtSecret) {
      const token = jwt.sign({ salt, iat: Date.now() / 1000 }, env.JwtSecret);
      return { token };
    } else {
      throw new Error("Error: no jwt secret");
    }
  } catch (error) {
    console.trace(error);
    return "error generating token";
  }
}

// validate token
export async function validateToken(token: string) {
  try {
    if (env.JwtSecret) {
      const salt = jwt.verify(token, env.JwtSecret, { maxAge: 60 * 60 * 24 });
      return { salt } as { salt: string };
    } else {
      throw new Error("Error: no jwt secret");
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return "expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      return "invalid token";
    }
    console.error(error);
    return "error validating token";
  }
}
