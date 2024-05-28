import { Layout } from "./Layout.ts";

export const MainPage = () => (
  <Layout>
    <main class="vw-100 vh-100 d-flex flex-row">
      <div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src="/public/images/logo.svg"
            alt="BasicTODO Logo"
            width="40px"
            height="40px"
          />
          <span class="fs-2 mx-2">BasicTODO</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/" class="nav-link active" aria-current="page">
              <i class="bi bi-house-door pe-none me-2" />
              Home
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <i class="bi bi-card-checklist pe-none me-2" />
              To Do Lists
            </a>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-circle mx-2 fs-2" />
            <strong>Username</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a href="#" className="dropdown-item">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item">
                Settings
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a href="#" className="dropdown-item">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-fluid w-100 h-100">
        <h1>Hello</h1>
      </div>
    </main>
  </Layout>
);
