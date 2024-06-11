import { Controller } from "~/framework/Controller.ts";
import { SignInPage } from "~/views/SignInPage.tsx";

export class AuthController extends Controller {
  constructor() {
    super();

    this.router.get("/sign-in", ...this.signIn);
    this.router.delete("/sign-out", ...this.signOut);
  }

  signIn = this.factory.createHandlers((c) => {
    return c.html(<SignInPage />);
  });

  signOut = this.factory.createHandlers((c) => {
    // Sign out current user
    return c.redirect(`${AuthController.path}/sign-in`);
  });

  static get path() {
    return "/auth";
  }
}
