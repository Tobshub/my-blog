import { tRouter, tProcedure, tError } from "../../config/trpc";
import z from "zod";
import validateUser from "./controllers/validate&gen";
import { validateToken } from "./controllers/token";

const authRouter = tRouter({
  login: tProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const validate = await validateUser(input);
      switch (validate) {
        case "email or password is wrong": {
          throw new tError({
            message: "Are you really Tobs?",
            code: "UNAUTHORIZED",
          });
        }
        case "error validating user": {
          throw new tError({
            message: "an error occurred",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        default: {
          const { token } = validate;
          return token;
        }
      }
    }),
  validate: tProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.token) {
      return false;
    }
    const validate = await validateToken(ctx.auth.token);
    switch (validate) {
      case "expired": {
        return "redirect to login";
      }
      case "error validating token":
      case "invalid token": {
        return false;
      }
      default: {
        return true;
      }
    }
  }),
});

export default authRouter;
