import type { SignInFormData } from "~/schemas/user.ts";
import { DangerAlert } from "~/views/components/danger-alert.tsx";

import { Layout } from "./layout.ts";

type Props = {
  isWrongCredentials?: boolean;
  formData?: SignInFormData;
};

export const SignInPage = ({ isWrongCredentials, formData }: Props) => (
  <Layout
    className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vw-100 vh-100"
    title="Sign In"
  >
    <main class="sign-in-form-container m-auto">
      <form action="/sign-in" method="POST">
        <div class="row g-3">
          <img
            class="align-self-center mb-4"
            width={85}
            height={85}
            src="/public/images/logo.svg"
            alt="BasicTODO Logo"
          />
          <h1 class="fw-normal text-center mb-3">Please Sign In</h1>
          {isWrongCredentials && (
            <div class="col-12">
              <DangerAlert message="Incorrect email or password." />
            </div>
          )}
          <div class="col-12">
            <div class="form-floating">
              <input
                id="emailInput"
                class="form-control"
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData?.email ?? ""}
              />
              <label for="emailInput">Email</label>
            </div>
          </div>
          <div class="col-12">
            <div class="form-floating">
              <input
                id="passwordInput"
                class="form-control"
                type="password"
                placeholder="Password"
                name="password"
              />
              <label for="passwordInput">Password</label>
            </div>
          </div>
          <div class="col-12">
            <div class="form-check text-start">
              <input
                id="rememberMeCheckbox"
                class="form-check-input"
                type="checkbox"
                name="rememberMe"
                checked={formData?.rememberMe === "on"}
              />
              <label class="form-check-label" for="rememberMeCheckbox">
                Remember me
              </label>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
          </div>
          <div class="col-12">
            <p class="text-muted text-center mt-4">
              Don't have an account? <a href="/sign-up">Sing up</a> instead.
            </p>
          </div>
        </div>
      </form>
    </main>
  </Layout>
);
