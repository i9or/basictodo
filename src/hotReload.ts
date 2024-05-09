import { WebSocketServer } from "ws";

export const hotReload = () => {
  console.info("[DEV] Notifying clients to reload...");

  if (!globalThis.wss) {
    globalThis.wss = new WebSocketServer({ port: 1338 });
  }

  globalThis.wss.clients.forEach((client) => client.send("reload"));
};
