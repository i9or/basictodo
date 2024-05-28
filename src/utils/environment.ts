import { ENV } from "~/env.ts";

export const isProduction = () => ENV.mode === "production";

export const isDevelopment = () => ENV.mode === "development";
