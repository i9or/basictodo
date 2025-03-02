import type { FC } from "hono/jsx";

import {
  PRIVACY_POLICY_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  TERMS_OF_USE_ROUTE,
} from "~/routers/routes";

export const MainPage: FC = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-black">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/public/images/logo.svg"
              alt="BasicTODO Logo"
              class="me-2"
              width="40px"
              height="40px"
            />
            <span>BasicTODO</span>
          </a>
          <i class="bi bi-circle-half fs-3" />
        </div>
      </nav>

      <main class="container flex-grow-1 d-flex align-items-center">
        <div class="col-6">
          <h1 class="display-3 text-white mb-4">Todo List, Simplified.</h1>
          <p class="lead text-light mb-5">
            Experience the most intuitive and privacy-focused todo app.
            <br />
            No clutter, no complexity - just pure productivity.
          </p>

          <div class="mb-5">
            <a
              href={SIGN_UP_ROUTE}
              class="btn btn-light btn-lg hover-grow px-4 mb-3"
            >
              Get Started - It's Free!
            </a>
            <div>
              <a href={SIGN_IN_ROUTE} class="text-light">
                Already have an account? Sign in instead
              </a>
            </div>
          </div>

          <div class="text-light opacity-75">
            <div class="d-flex gap-3 mb-2">
              <div>
                <i class="bi bi-check-circle"></i> No unnecessary features
              </div>
              <div>
                <i class="bi bi-check-circle"></i> Privacy-first approach
              </div>
            </div>
            <div class="d-flex gap-3">
              <div>
                <i class="bi bi-check-circle"></i> Clean interface
              </div>
              <div>
                <i class="bi bi-check-circle"></i> Lightning fast
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-6 d-flex align-items-center justify-content-center"
          style="animation-delay: 0.3s;"
        >
          <img
            src="https://placehold.co/600"
            alt="BasicTODO Interface"
            class="img-fluid hover-grow"
          />
        </div>
      </main>

      <footer class="py-4 bg-transparent">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <span class="text-light">
                © 2025 BasicTODO. All rights reserved.
              </span>
            </div>
            <div class="col-md-6">
              <ul class="list-inline text-center text-md-end mb-0">
                <li class="list-inline-item">
                  <a href={PRIVACY_POLICY_ROUTE} class="text-light">
                    Privacy Policy
                  </a>
                </li>
                <li class="list-inline-item ms-3">
                  <a href={TERMS_OF_USE_ROUTE} class="text-light">
                    Terms of Use
                  </a>
                </li>
                <li class="list-inline-item ms-3">
                  <a href="#" class="text-light">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
