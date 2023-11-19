import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Layout } from "./templates/Layout";
import { Home } from "./templates/Home";

const app = new Hono();

app.get("/", (c) =>
  c.html(
    <Layout title="Home">
      <Home />
    </Layout>,
  ),
);

serve(app);
