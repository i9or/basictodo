import { Controller } from "~/framework/Controller.ts";
import { SignInPage } from "~/views/SignInPage.tsx";

export class AuthController extends Controller {
  constructor() {
    super();

    this.router.get("/sign-in", ...this.signIn);
  }

  signIn = this.factory.createHandlers((c) => {
    return c.html(<SignInPage />);
  });

  static get path() {
    return "/auth";
  }
}
