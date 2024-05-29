import { html } from "hono/html";

export const ThemeScript = () => {
  return html`<script>
    (() => {
      "use strict";

      const getPrefferedTheme = () => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      };

      const setTheme = (theme) => {
        document.documentElement.setAttribute("data-bs-theme", theme);
      };

      setTheme(getPrefferedTheme());

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
          setTheme(getPrefferedTheme());
        });
    })();
  </script>`;
};
