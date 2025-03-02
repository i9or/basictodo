import type { FC, PropsWithChildren } from "hono/jsx";

type ErrorPageProps = {
  requestId: string;
  title: string;
  subTitle: string;
  errorMessage: string;
  description: string;
};

export const ErrorPage: FC<PropsWithChildren<ErrorPageProps>> = ({
  children,
  requestId,
  title,
  subTitle,
  errorMessage,
  description,
}) => {
  return (
    <main class="min-vh-100 d-flex align-items-center py-5">
      <div class="container">
        <article class="text-center mx-auto">
          <header>
            <p class="display-1 fw-bold text-danger mb-4">{title}</p>
            <h1 class="display-4 mb-5">{subTitle}</h1>
          </header>
          <section class="text-secondary mb-5">
            <p class="lead">{errorMessage}</p>
            <p class="mb-4">{description}</p>
          </section>
          <nav class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {children}
          </nav>
          <footer class="mt-4">
            <p class="text-muted small">
              Request ID: <span id="errorId">{requestId}</span>
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
};
