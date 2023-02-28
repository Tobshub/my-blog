import { tError, tProcedure, tRouter } from "../../config/trpc";
import listProjects from "./controllers/list-projects";

const projectRouter = tRouter({
  list: tProcedure.query(async () => {
    const res = await listProjects(["resume-builder", "Tuu-Duu", "my-blog"]);

    if (typeof res === "string") {
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "could not load projects from github",
        cause: res,
      });
    } else {
      return res;
    }
  }),
});

export default projectRouter;
