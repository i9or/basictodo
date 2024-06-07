import { Controller } from "~/framework/Controller.ts";
import { MainPage } from "~/views/MainPage.tsx";

export class HomeController extends Controller {
  constructor() {
    super();

    this.router.get("/", ...this.index);
  }

  index = this.factory.createHandlers((c) => {
    return c.html(<MainPage />);
  });

  static get path() {
    return "/";
  }
}
