import { html, raw } from "hono/html";

import { WEBSITE_NAME } from "~/constants.ts";
import { isDevelopment } from "~/utils/environment.ts";
import { ThemeScript } from "~/views/ThemeScript.ts";

import { DevelopmentScripts } from "./DevelopmentScripts.ts";

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
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
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
          src="https://unpkg.com/htmx.org@1.9.12"
          integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
          crossorigin="anonymous"
        ></script>
        ${isDevelopment() ? DevelopmentScripts() : ""} ${ThemeScript()}
      </body>
    </html>`;
};
