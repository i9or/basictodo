import type { FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";

import { CSRF_FORM_FIELD } from "~/middlewares/csrf-protection";

/**
 * CSRF hidden input component to be used with forms
 * @example
 *
 * <form action="/sign-out" method="post">
 *   <CsrfToken />
 *   <input type="text" name="someInput" />
 *   <button type="submit" class="btn btn-danger">
 *     Submit!
 *   </button>
 * </form>
 */
export const CsrfToken: FC = () => {
  const c = useRequestContext();
  const token = c.get("csrfToken");

  return <input type="hidden" name={CSRF_FORM_FIELD} value={token} />;
};
