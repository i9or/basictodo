import type { HonoRequest, MiddlewareHandler } from "hono";
import { nanoid } from "nanoid";

import {
  HTTP_CLIENT_ERROR_CODES,
  HTTP_SERVER_ERROR_CODES,
  NOT_FOUND_INDEX,
  ONE_SECOND_IN_MS,
} from "../utils/constants.ts";
import { type Severity, logger } from "../utils/logger.ts";

const MINIMUM_POSITION = 8;

const getRequestPath = (request: HonoRequest) => {
  const url = request.url;
  const queryIndex = url.indexOf("?", MINIMUM_POSITION);

  return url.slice(
    url.indexOf("/", MINIMUM_POSITION),
    queryIndex === NOT_FOUND_INDEX ? undefined : queryIndex,
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
    delta < ONE_SECOND_IN_MS
      ? `${delta}ms`
      : `${Math.round(delta / ONE_SECOND_IN_MS)}s`,
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
