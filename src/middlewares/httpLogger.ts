import type { HonoRequest, MiddlewareHandler } from "hono";
import { nanoid } from "nanoid";
import { logger, type Severity } from "../utils/logger.ts";

const getRequestPath = (request: HonoRequest) => {
  const url = request.url;
  const queryIndex = url.indexOf("?", 8);

  return url.slice(
    url.indexOf("/", 8),
    queryIndex === -1 ? void 0 : queryIndex,
  );
};

const DELIMITER = ",";
const SEPARATOR = ".";

const humanize = (times: string[]) => {
  const orderTimes = times.map((v) =>
    v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${DELIMITER}`),
  );

  return orderTimes.join(SEPARATOR);
};

const elapsedFormatted = (start: number) => {
  const delta = Date.now() - start;

  return humanize([
    delta < 1000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`,
  ]);
};

export const LOG_ID = "logId";

export const httpLogger = (): MiddlewareHandler => {
  return async function (c, next) {
    const logId = nanoid();
    c.set(LOG_ID, logId);

    const { method } = c.req;
    const path = getRequestPath(c.req);

    logger.info(
      {
        logId,
        method,
        path,
        headers: c.req.header(),
      },
      "REQUEST",
    );

    const startTime = Date.now();

    await next();

    let severity: Severity = "info";
    const { status, headers } = c.res;

    if (status >= 400 && status < 500) {
      severity = "error";
    } else if (status >= 500) {
      severity = "fatal";
    }

    logger[severity](
      {
        logId,
        method,
        path,
        status,
        headers,
        elapsed: elapsedFormatted(startTime),
      },
      "RESPONSE",
    );
  };
};
