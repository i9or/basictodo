import { db } from "~/db.ts";

type InsertNewUserParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const insertNewUserQuery = db.query<never, InsertNewUserParams>(
  `insert into users (email, password, first_name, last_name)
   values ($email, $password, $firstName, $lastName)`,
);

export const insertNewUser = ({
  email,
  password,
  firstName,
  lastName,
}: InsertNewUserParams) => {
  const { lastInsertRowid } = insertNewUserQuery.run({
    email,
    password,
    firstName,
    lastName,
  });

  return lastInsertRowid;
};
