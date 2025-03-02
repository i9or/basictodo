import { WebSocketServer } from "ws";
import "typed-htmx";

import type { User } from "~/models/user";

declare global {
  var wss: WebSocketServer | undefined;

  namespace Hono {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props?: { title?: string; className?: string },
    ): Response;
  }

  interface ContextVariableMap {
    csrfToken: string;
    user: User | undefined;
  }
}
