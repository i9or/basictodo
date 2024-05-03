import { Layout } from "./Layout.ts";

export const MainPage = () => (
  <Layout>
    <main>
      <div className="container py-4">
        <h1 className="display-5 fw-bold text-body-emphasis">Hello!</h1>
        <p className="lead mb-4">
          <i class="bi bi-cone-striped text-bg-warning p-1" /> This page is under construction...
        </p>
      </div>
    </main>
  </Layout>
);
