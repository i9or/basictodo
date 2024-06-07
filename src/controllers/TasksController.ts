import { Controller } from "~/framework/Controller.ts";
import { HTTP_NOT_FOUND } from "~/utils/constants.ts";

export class TasksController extends Controller {
  constructor() {
    super();

    this.router.get("/", ...this.index);
  }

  index = this.factory.createHandlers((c) => {
    c.status(HTTP_NOT_FOUND);

    return c.html("<p>Not implemented</p>");
  });

  static get path() {
    return "/tasks";
  }
}
