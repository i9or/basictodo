import { SQLiteError } from "bun:sqlite";

import { SQLITE_CONSTRAINT_UNIQUE } from "~/constants.ts";
import { insertNewUser } from "~/repositories/users-repository.ts";
import type { SignUpUserDto } from "~/schemas/user.ts";
import { logger } from "~/utils/logger.ts";

export const createAccount = async (newUser: SignUpUserDto) => {
  const hashedPassword = await Bun.password.hash(newUser.password);
  try {
    insertNewUser({
      email: newUser.email,
      password: hashedPassword,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    return true;
  } catch (err) {
    logger.error(err);

    if (err instanceof SQLiteError && err.code === SQLITE_CONSTRAINT_UNIQUE) {
      return false;
    }

    throw err;
  }
};
