import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import type { Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";

import { ENV } from "~/env";
import type { Session } from "~/models/session";
import {
  deleteSessionById,
  insertNewSession,
  selectSessionAndUserBySessionId,
  updateSessionExpiryDateById,
} from "~/repositories/sessions-repository";
import { HOME_ROUTE } from "~/routers/routes";
import type { SessionValidationResult } from "~/schemas/session-schemas";
import { isProduction } from "~/utils/environment";
import { logger } from "~/utils/logger";
import { isNullOrUndefined } from "~/utils/predicates";

const THREE_HUNDRED_DAYS_IN_MS = 1000 * 60 * 60 * 25 * 300;
const HUNDRED_FIFTY_DAYS_IN_MS = 1000 * 60 * 60 * 25 * 150;
export const SESSION_TOKEN_COOKIE = "auth_session";

const encodeSessionToken = (token: string) => {
  return {
    sessionId: encodeHexLowerCase(sha256(new TextEncoder().encode(token))),
  };
};

export const createSession = (token: string, userId: number): Session => {
  const { sessionId } = encodeSessionToken(token);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + THREE_HUNDRED_DAYS_IN_MS),
  };

  insertNewSession({
    id: session.id,
    userId: session.userId,
    expiresAt: Math.floor(session.expiresAt.getTime() / 1000),
  });

  return session;
};

export const validateSessionToken = (
  token: string,
): SessionValidationResult => {
  const { sessionId } = encodeSessionToken(token);
  const sessionAndUser = selectSessionAndUserBySessionId({ sessionId });

  if (isNullOrUndefined(sessionAndUser)) {
    return {
      user: null,
      session: null,
    };
  }

  const { user, session } = sessionAndUser;

  if (Date.now() >= session.expiresAt.getTime()) {
    deleteSessionById({ sessionId });

    return {
      user: null,
      session: null,
    };
  }

  if (Date.now() >= session.expiresAt.getTime() - HUNDRED_FIFTY_DAYS_IN_MS) {
    session.expiresAt = new Date(Date.now() + THREE_HUNDRED_DAYS_IN_MS);
    updateSessionExpiryDateById({
      sessionId: session.id,
      newExpiresAt: Math.floor(session.expiresAt.getTime() / 1000),
    });
  }

  return {
    session,
    user,
  };
};

export const deleteSession = (token: string) => {
  const { sessionId } = encodeSessionToken(token);

  if (!deleteSessionById({ sessionId })) {
    logger.error({ sessionId }, "Failed to delete session by id");
  }
};

export const setSessionTokenCookie = async (
  c: Context,
  token: string,
  expiresAt?: Date,
) => {
  await setSignedCookie(c, SESSION_TOKEN_COOKIE, token, ENV.secret, {
    httpOnly: true,
    sameSite: "Lax",
    secure: isProduction(),
    expires: expiresAt,
    path: HOME_ROUTE,
  });
};

export const getSessionTokenCookie = async (c: Context) => {
  return await getSignedCookie(c, ENV.secret, SESSION_TOKEN_COOKIE);
};

export const deleteSessionTokenCookie = (c: Context) => {
  deleteCookie(c, SESSION_TOKEN_COOKIE, {
    httpOnly: true,
    sameSite: "Lax",
    secure: isProduction(),
    maxAge: 0,
    path: HOME_ROUTE,
  });
};
