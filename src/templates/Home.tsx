import { Fragment } from "hono/jsx";

export const Home = () => {
  return (
    <Fragment>
      <div class="col-lg-8 mx-auto p-4 py-md-5">
        <header class="d-flex align-items-center pb-3 mb-5 border-bottom">
          <a
            href="/"
            class="d-flex align-items-center text-body-emphasis text-decoration-none"
          >
            Home
          </a>
        </header>

        <main>
          <h1 class="text-body-emphasis">
            <i class="bi-house"></i> Welcome!
          </h1>
          <p class="fs-5 col-md-8">Under construction...</p>
        </main>

        <footer class="pt-5 my-5 text-body-secondary border-top">
          Basic ToDo &middot; &copy; 2023
        </footer>
      </div>
    </Fragment>
  );
};
