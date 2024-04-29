import { html } from "hono/html";

type LayoutProps = {
  title?: string;
  children?: any;
};

const WEBSITE_NAME = "BasicTODO";

export const Layout = ({ title, children }: LayoutProps) => {
  const resolvedTitle = title ? `${title} | ${WEBSITE_NAME}` : WEBSITE_NAME;

  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/public/css/main.css" />
        <link rel="icon" href="/public/images/logo.svg" />
        <title>${resolvedTitle}</title>
      </head>
      <body class="bg-amber-50 dark:bg-slate-800">
        ${children}
      </body>
    </html>`;
};
