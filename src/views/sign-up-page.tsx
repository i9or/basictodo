import { cx } from "hono/css";
import type { FC } from "hono/jsx";

import type { SignUpFormData } from "~/schemas/user-schemas";
import { isInvalid } from "~/utils/form-validation";
import { DangerAlert } from "~/views/components/danger-alert";

type SignUpPageProps = {
  formData?: SignUpFormData;
  invalidFields?: Set<keyof SignUpFormData>;
  isUserExists?: boolean;
};

export const SignUpPage: FC<SignUpPageProps> = ({
  formData,
  invalidFields,
  isUserExists = false,
}) => {
  return (
    <main class="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vw-100 vh-100">
      <div class="sign-up-form-container m-auto">
        <form action="/sign-up" method="post">
          <div class="row g-3">
            <img
              class="align-self-center mb-4"
              width={85}
              height={85}
              src="/public/images/logo.svg"
              alt="BasicTODO Logo"
            />
            <h1 class="fw-normal text-center mb-3">Create an Account</h1>
            {isUserExists && (
              <div class="col-12">
                <DangerAlert message="Account with this email already exists." />
              </div>
            )}
            <div class="col-6">
              <div class="form-floating">
                <input
                  type="text"
                  class={cx(
                    "form-control",
                    isInvalid(invalidFields, "firstName"),
                  )}
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={formData?.firstName ?? ""}
                />
                <label for="firstName">First Name</label>
                <div class="invalid-feedback">Please provide a first name.</div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-floating">
                <input
                  type="text"
                  id="lastName"
                  class={cx(
                    "form-control",
                    isInvalid(invalidFields, "lastName"),
                  )}
                  placeholder="Last Name"
                  name="lastName"
                  value={formData?.lastName ?? ""}
                />
                <label for="lastName">Last Name</label>
                <div class="invalid-feedback">Please provide a last name.</div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="email"
                  id="emailInput"
                  class={cx("form-control", isInvalid(invalidFields, "email"))}
                  placeholder="email@example.com"
                  name="email"
                  value={formData?.email ?? ""}
                />
                <label for="emailInput">Email</label>
                <div class="invalid-feedback">
                  Please provide valid email address.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="password"
                  id="passwordInput"
                  class={cx(
                    "form-control",
                    invalidFields?.has("password") && "is-invalid",
                  )}
                  placeholder="Password"
                  name="password"
                />
                <label for="passwordInput">Password</label>
                <div class="invalid-feedback">
                  Password should be between 8 and 100 characters long.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="password"
                  id="confirmPasswordInput"
                  class={cx(
                    "form-control",
                    invalidFields?.has("confirmPassword") && "is-invalid",
                  )}
                  placeholder="Confirm password"
                  name="confirmPassword"
                />
                <label for="confirmPasswordInput">Confirm password</label>
                <div class="invalid-feedback">
                  Confirmation does not match the password.
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-check text-start">
                <input
                  type="checkbox"
                  class={cx(
                    "form-check-input",
                    invalidFields?.has("acceptTermsAndPrivacy") && "is-invalid",
                  )}
                  id="acceptTermsAndPrivacy"
                  name="acceptTermsAndPrivacy"
                />
                <label for="acceptTermsAndPrivacy" class="form-check-label">
                  I accept the <a href="/terms-of-use">terms of use</a> &{" "}
                  <a href="/privacy-policy">privacy policy</a>
                </label>
                <div class="invalid-feedback">
                  You must accept before submitting.
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary w-100 py-2">Sign up</button>
            </div>
            <div class="col-12">
              <p class="text-muted text-center mt-4">
                Already have an account? <a href="/sign-in">Sing in</a> instead.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
