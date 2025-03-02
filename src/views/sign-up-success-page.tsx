import { html } from "hono/html";
import type { FC } from "hono/jsx";

import { SIGN_IN_ROUTE } from "~/routers/routes";

const COUNT_DOWN_ID = "countDown";

export const SignUpSuccessPage: FC = () => {
  return (
    <>
      <main class="container">
        <section class="row min-vh-100 justify-content-center align-items-center">
          <article class="col-12 col-md-8 col-lg-6">
            <div class="card border-1">
              <header class="card-body text-center p-5">
                <figure class="display-1 text-success mb-4">
                  <i class="bi bi-check-circle-fill" aria-hidden="true" />
                  <figcaption class="visually-hidden">
                    Success checkmark icon
                  </figcaption>
                </figure>
                <h1 class="card-title h2 mb-3">Great success!</h1>
                <p class="card-text text-muted mb-4">
                  Your account has been created successfully.
                  <br />
                  You will be automatically redirected to the sign in page in{" "}
                  <span id={COUNT_DOWN_ID}>5</span> seconds.
                </p>
                <nav>
                  <a
                    href={SIGN_IN_ROUTE}
                    class="btn btn-primary btn-lg px-4"
                    role="button"
                  >
                    <i
                      class="bi bi-box-arrow-in-right me-2"
                      aria-hidden="true"
                    />
                    Sign In Now
                  </a>
                </nav>
              </header>
            </div>
          </article>
        </section>
      </main>
      {html`<script>
        let timeLeft = 5;
        const countDownElement = document.getElementById("${COUNT_DOWN_ID}");

        const countDown = setInterval(() => {
          timeLeft--;
          countDownElement.textContent = String(timeLeft);

          if (timeLeft <= 0) {
            clearInterval(countDown);
            window.location.href = "${SIGN_IN_ROUTE}";
          }
        }, 1000);
      </script>`}
    </>
  );
};
