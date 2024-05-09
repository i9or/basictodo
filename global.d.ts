import { WebSocketServer } from "ws";
import "typed-htmx";

declare global {
  var wss: WebSocketServer | undefined;

  namespace Hono {
    interface HTMLAttributes extends HtmxAttributes {}
  }
}
