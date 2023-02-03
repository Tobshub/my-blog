import { genToken } from "./token";
import { env } from "../../..";
import bson from "bson";

export default async function validateUser(input: {
  email: string;
  password: string;
}) {
  try {
    // validate user
    const valid = env.email === input.email && env.password === input.password;

    if (!valid) {
      return "email or password is wrong";
    }
    // generate jwt token
    const id = new bson.ObjectId();
    const token = await genToken(id.toString());

    if (token === "error generating token") {
      throw new Error("could not generate token");
    }

    return token;
  } catch (error) {
    return "error validating user";
  }
}
