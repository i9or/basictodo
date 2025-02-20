import type { FC } from "hono/jsx";

export const MainPage: FC = () => {
  return (
    <main class="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <span class="d-flex align-items-center">
        <img
          src="/public/images/logo.svg"
          alt="BasicTODO Logo"
          width="40px"
          height="40px"
        />
        <h1 class="ms-2 my-0">BasicTODO</h1>
      </span>
    </main>
  );
};
