import { WebSocketServer } from "ws";
import "typed-htmx";

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
  }
}
