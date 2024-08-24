import { Layout } from "~/views/layout.ts";

export const SignUpPage = () => {
  return (
    <Layout className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vw-100 vh-100">
      <main class="sign-up-form-container m-auto">
        <form class="d-flex flex-column mb-4" action="/sign-up" method="POST">
          <img
            class="align-self-center mb-5"
            width={85}
            height={85}
            src="/public/images/logo.svg"
            alt="BasicTODO Logo"
          />
          <h1 class="h4 mb-3 fw-normal">Create an account</h1>
          <p class="small">All fields are mandatory</p>
          <div class="d-flex mb-3 gap-3">
            <div class="form-floating flex-grow-1">
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder="First Name"
                name="firstName"
              />
              <label for="firstName">First Name</label>
            </div>
            <div class="form-floating flex-grow-1">
              <input
                type="text"
                id="lastName"
                class="form-control"
                placeholder="Last Name"
                name="lastName"
              />
              <label for="lastName">Last Name</label>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              id="emailInput"
              class="form-control"
              placeholder="email@example.com"
              name="email"
            />
            <label for="emailInput">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              id="passwordInput"
              class="form-control"
              placeholder="Password"
              name="password"
            />
            <label for="passwordInput">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              id="confirmPasswordInput"
              class="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
            />
            <label for="confirmPasswordInput">Confirm password</label>
          </div>
          <div class="form-check text-start mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="agreeToTermsAndPrivacy"
              name="agreeToTermsAndPrivacy"
            />
            <label for="agreeToTermsAndPrivacy" class="form-check-label">
              I accept the <a href="/terms-of-use">terms of use</a> &{" "}
              <a href="/privacy-policy">privacy policy</a>
            </label>
          </div>
          <button class="btn btn-primary w-100 py-2">Sign up</button>
        </form>
        <p class="small">
          Already have an account? <a href="/sign-in">Sing in</a> instead.
        </p>
      </main>
    </Layout>
  );
};
