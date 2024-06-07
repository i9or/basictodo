import { ENV } from "~/env";

export const isProduction = () => ENV.mode === "production";

export const isDevelopment = () => ENV.mode === "development";
