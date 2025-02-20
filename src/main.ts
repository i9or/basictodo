import { ENV } from "~/env";
import { hotReload } from "~/hot-reload";
import { server } from "~/server";
import { isDevelopment } from "~/utils/environment";
import { logger } from "~/utils/logger";

const serverInstance = Bun.serve({
  fetch: server.fetch,
  port: ENV.port,
});

if (isDevelopment()) {
  hotReload();
}

logger.info(`🚀 Listening on ${serverInstance.url}`);
