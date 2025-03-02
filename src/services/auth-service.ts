import { SQLiteError } from "bun:sqlite";

import { SQLITE_CONSTRAINT_UNIQUE } from "~/constants";
import {
  insertNewUser,
  selectUserByEmail,
} from "~/repositories/users-repository";
import type { SignUpUserDto } from "~/schemas/user-schemas";
import { logger } from "~/utils/logger";
import { isNullOrUndefined } from "~/utils/predicates";

export const createAccount = async (newUser: SignUpUserDto) => {
  const hashedPassword = await Bun.password.hash(newUser.password);
  try {
    const newUserId = insertNewUser({
      email: newUser.email,
      password: hashedPassword,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    logger.debug(`New account created with id: ${newUserId}`);

    return { newUserId };
  } catch (err) {
    logger.error({ err }, "Creating new account failed");

    if (err instanceof SQLiteError && err.code === SQLITE_CONSTRAINT_UNIQUE) {
      return { isUserExist: true };
    }

    throw err;
  }
};

export const authenticate = async (email: string, password: string) => {
  try {
    const user = selectUserByEmail({ email });

    if (isNullOrUndefined(user)) {
      return { user: null };
    }

    if (await Bun.password.verify(password, user.password)) {
      return { user };
    }

    return { user: null };
  } catch (err) {
    logger.error({ err }, "Authentication failed");

    throw err;
  }
};
