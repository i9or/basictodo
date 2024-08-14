import { html } from "hono/html";

export const DevelopmentScripts = () => {
  return html`<script>
    let connectedAfterReload = true;

    const connect = () => {
      const ws = new WebSocket("ws://localhost:1338");
      let timeout;

      ws.onopen = function () {
        if (!connectedAfterReload) {
          window.location.reload();
        } else {
          console.info("[DEV] Connected to development server");
        }
      };

      ws.onmessage = function (event) {
        if (event.data === "reload") {
          clearTimeout(timeout);
          console.info("[DEV] Reloading...");
          window.location.reload();
        }
      };

      ws.onclose = function () {
        timeout = setTimeout(() => {
          connectedAfterReload = false;
          console.info("[DEV] Connection lost, attempting to re-connect...");
          connect();
        }, 1000);
      };
    };

    connect();
  </script>`;
};
