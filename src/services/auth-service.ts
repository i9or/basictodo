import { SQLiteError } from "bun:sqlite";

import { SQLITE_CONSTRAINT_UNIQUE } from "~/constants";
import { insertNewUser } from "~/repositories/users-repository";
import type { SignUpUserDto } from "~/schemas/user-schemas";
import { logger } from "~/utils/logger";

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
    logger.error(err);

    if (err instanceof SQLiteError && err.code === SQLITE_CONSTRAINT_UNIQUE) {
      return { isUserExist: true };
    }

    throw err;
  }
};
