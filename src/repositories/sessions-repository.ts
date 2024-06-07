import { db } from "~/db";
import type { Session } from "~/models/session";
import type { User } from "~/models/user";

type InsertNewSessionParams = {
  id: string;
  userId: number;
  expiresAt: number;
};

type SelectSessionAndUserBySessionIdParams = {
  sessionId: string;
};

type DeleteSessionByIdParams = {
  sessionId: string;
};

type UpdateSessionExpiryDateByIdParams = {
  sessionId: string;
  newExpiresAt: number;
};

// TODO: construct type from existing entities
type SessionAndUserResult = {
  sessionId: string;
  userId: number;
  expiresAt: number;
  email: string;
  firstName: string;
  lastName: string;
};

const insertNewSessionQuery = db.query<never, InsertNewSessionParams>(
  `insert into sessions (id, user_id, expires_at)
   values ($id, $userId, $expiresAt)`,
);

const selectSessionAndUserBySessionIdQuery = db.query<
  SessionAndUserResult,
  SelectSessionAndUserBySessionIdParams
>(
  `select sessions.id         as sessionId,
          sessions.expires_at as expiresAt,
          users.id            as userId,
          users.email,
          users.first_name    as firstName,
          users.last_name     as lastName
   from sessions
          inner join users on users.id = sessions.user_id
   where sessions.id = $sessionId`,
);

const deleteSessionByIdQuery = db.query<never, DeleteSessionByIdParams>(
  `delete from sessions where id = $sessionId`,
);

const updateSessionExpiryDateByIdQuery = db.query<
  never,
  UpdateSessionExpiryDateByIdParams
>(`update sessions set expires_at = $newExpiresAt where id = $sessionId`);

export const insertNewSession = ({
  id,
  userId,
  expiresAt,
}: InsertNewSessionParams) => {
  const { lastInsertRowid } = insertNewSessionQuery.run({
    id,
    userId,
    expiresAt,
  });

  return lastInsertRowid;
};

export const selectSessionAndUserBySessionId = ({
  sessionId,
}: SelectSessionAndUserBySessionIdParams) => {
  const row = selectSessionAndUserBySessionIdQuery.get({ sessionId });

  if (row === null) {
    return null;
  }

  const user: User = {
    id: row.userId,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
  };

  const session: Session = {
    id: row.sessionId,
    userId: row.userId,
    expiresAt: new Date(row.expiresAt * 1000),
  };

  return {
    session,
    user,
  };
};

export const deleteSessionById = ({ sessionId }: DeleteSessionByIdParams) => {
  const { changes } = deleteSessionByIdQuery.run({ sessionId });

  return changes > 0;
};

export const updateSessionExpiryDateById = ({
  sessionId,
  newExpiresAt,
}: UpdateSessionExpiryDateByIdParams) => {
  const { changes } = updateSessionExpiryDateByIdQuery.run({
    sessionId,
    newExpiresAt,
  });

  return changes === 1;
};
