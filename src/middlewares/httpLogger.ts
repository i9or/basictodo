import type { HonoRequest, MiddlewareHandler } from "hono";
import { nanoid } from "nanoid";

import {
  HTTP_CLIENT_ERROR_CODES,
  HTTP_SERVER_ERROR_CODES,
  NOT_FOUND_INDEX,
  ONE_SECOND_IN_MS,
} from "~/constants.ts";
import { logger, type Severity } from "~/utils/logger.ts";

const MINIMUM_POSITION = 8;

const getRequestPath = (request: HonoRequest) => {
  const url = request.url;
  const queryIndex = url.indexOf("?", MINIMUM_POSITION);

  return url.slice(
    url.indexOf("/", MINIMUM_POSITION),
    queryIndex === NOT_FOUND_INDEX ? undefined : queryIndex,
  );
};

const humanize = (times: string[]) => {
  const orderTimes = times.map((v) =>
    v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
  );

  return orderTimes.join(".");
};

const elapsedFormatted = (start: number) => {
  const delta = Date.now() - start;

  return humanize([
    delta < ONE_SECOND_IN_MS
      ? `${delta}ms`
      : `${Math.round(delta / ONE_SECOND_IN_MS)}s`,
  ]);
};

export const httpLogger = (): MiddlewareHandler => {
  return async function (c, next) {
    const logId = nanoid();
    c.set("logId", logId);

    const { method } = c.req;
    const path = getRequestPath(c.req);

    let severity: Severity = "debug";

    logger[severity](
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

    const { status, headers } = c.res;

    if (status >= HTTP_CLIENT_ERROR_CODES && status < HTTP_SERVER_ERROR_CODES) {
      severity = "error";
    } else if (status >= HTTP_SERVER_ERROR_CODES) {
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
