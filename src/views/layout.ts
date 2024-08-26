import { html, raw } from "hono/html";

import { WEBSITE_NAME } from "~/constants.ts";
import { isDevelopment } from "~/utils/environment.ts";

import { DevelopmentScripts } from "./development-scripts.ts";

type LayoutProps = {
  title?: string;
  children?: unknown;
  /**
   * Body tag class
   */
  className?: string;
};

export const Layout = ({ title, children, className }: LayoutProps) => {
  const resolvedTitle = title ? `${title} | ${WEBSITE_NAME}` : WEBSITE_NAME;
  const bodyClassName = className ? raw(`class="${className}"`) : "";

  return html`<!doctype html>
    <html lang="en" data-bs-theme="dark">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="stylesheet" href="/public/css/main.css" />
        <link rel="icon" href="/public/images/logo.svg" />
        <title>${resolvedTitle}</title>
      </head>
      <body ${bodyClassName}>
        ${children}
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/htmx.org@2.0.1"
          integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/"
          crossorigin="anonymous"
        ></script>
        <script src="/public/js/theme-selector.js"></script>
        ${isDevelopment() ? DevelopmentScripts() : ""}
      </body>
    </html>`;
};
