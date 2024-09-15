import { WebSocketServer } from "ws";

import { logger } from "~/utils/logger.ts";

export const hotReload = () => {
  logger.info("Notifying clients to reload...");

  if (!globalThis.wss) {
    globalThis.wss = new WebSocketServer({ port: 1338 });
  }

  globalThis.wss.clients.forEach((client) => client.send("reload"));
};
