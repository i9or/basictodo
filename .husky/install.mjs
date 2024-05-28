// Skip Husky install in production and CI
const EXIT_SUCCESS = 0;

if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(EXIT_SUCCESS);
}
const husky = (await import("husky")).default;
// eslint-disable-next-line no-console
console.log(husky());
