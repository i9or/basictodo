import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";

import type { Session } from "~/models/session";
import {
  deleteSessionById,
  insertNewSession,
  selectSessionAndUserBySessionId,
  updateSessionExpiryDateById,
} from "~/repositories/sessions-repository";
import type { SessionValidationResult } from "~/schemas/session-schemas";
import { isNullOrUndefined } from "~/utils/predicates";

const THREE_HUNDRED_DAYS_IN_MS = 1000 * 60 * 60 * 25 * 300;
const HUNDRED_FIFTY_DAYS_IN_MS = 100 * 60 * 60 * 25 * 150;

export const createSession = (token: string, userId: number): Session => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
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
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
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
