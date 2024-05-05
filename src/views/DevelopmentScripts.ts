import { html } from "hono/html";

export const DevelopmentScripts = () => {
  return html`<script>
    const ws = new WebSocket("ws://localhost:1338");
    let timeout;

    ws.onopen = function () {
      console.info("[DEV] Connected to development server");
    };

    ws.onclose = function () {
      console.info("[DEV] Server restarts, reloading in 400ms...");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        window.location.reload();
      }, 400);
    };
  </script>`;
};
