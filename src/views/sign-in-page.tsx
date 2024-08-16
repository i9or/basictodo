import { Layout } from "./layout.ts";

export const SignInPage = () => (
  <Layout className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vw-100 vh-100">
    <main class="sign-in-form-container m-auto">
      <form class="d-flex flex-column" action="/sign-in" method="POST">
        <img
          class="align-self-center mb-5"
          width={85}
          height={85}
          src="/public/images/logo.svg"
          alt="BasicTODO Logo"
        />
        <h1 class="h4 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating mb-3">
          <input
            id="emailInput"
            class="form-control"
            type="email"
            placeholder="name@example.com"
            name="email"
          />
          <label for="emailInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            id="passwordInput"
            class="form-control"
            type="password"
            placeholder="Password"
            name="password"
          />
          <label for="passwordInput">Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input
            id="rememberMeCheckbox"
            class="form-check-input"
            type="checkbox"
            name="rememberMe"
          />
          <label class="form-check-label" for="rememberMeCheckbox">
            Remember me
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </main>
  </Layout>
);
