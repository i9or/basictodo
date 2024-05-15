import { html, raw } from "hono/html";
import { DevelopmentScripts } from "./DevelopmentScripts.ts";

type LayoutProps = {
  title?: string;
  children?: unknown;
  /**
   * Body tag class
   */
  className?: string;
};

const WEBSITE_NAME = "BasicTODO";

export const Layout = ({ title, children, className }: LayoutProps) => {
  const resolvedTitle = title ? `${title} | ${WEBSITE_NAME}` : WEBSITE_NAME;
  const bodyClassName = className ? raw(`class="${className}"`) : "";

  return html`<!doctype html>
    <html lang="en" data-bs-theme="light">
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
        <link rel="stylesheet" href="/public/css/main.css" />
        <link rel="icon" href="/public/images/logo.svg" />
        <title>${resolvedTitle}</title>
      </head>
      <body ${bodyClassName}>
        ${children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/htmx.org@1.9.12"
          integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
          crossorigin="anonymous"
        ></script>
        ${DevelopmentScripts()}
      </body>
    </html>`;
};
