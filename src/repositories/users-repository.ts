import { db } from "~/db";
import type { UserWithPassword } from "~/models/user";

type InsertNewUserParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type SelectUserByEmailParams = {
  email: string;
};

const insertNewUserQuery = db.query<never, InsertNewUserParams>(
  `insert into users (email, password, first_name, last_name)
   values ($email, $password, $firstName, $lastName)`,
);

const selectUserByEmailQuery = db.query<
  UserWithPassword,
  SelectUserByEmailParams
>(`select * from users where email = $email`);

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

  return lastInsertRowid as number;
};

export const selectUserByEmail = ({ email }: SelectUserByEmailParams) => {
  return selectUserByEmailQuery.get({
    email,
  });
};
