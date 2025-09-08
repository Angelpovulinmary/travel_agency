//Setup files for  Vite
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import fs from "fs";
import path from "path";
const isDev = process.env.NODE_ENV === "development";
const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-js",
  project: "javascript-react",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken:
    "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",
  // ...
};
export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      reactRouter(),
      sentryReactRouter(sentryConfig, config),
    ],
    server: {
      https: isDev
        ? {
            key: fs.readFileSync(
              path.resolve(__dirname, "localhost+2-key.pem")
            ),
            cert: fs.readFileSync(path.resolve(__dirname, "localhost+2.pem")),
          }
        : undefined,
      port: 5173,
    },
    sentryConfig,
    ssr: {
      noExternal: [/@syncfusion/],
    },
  };
});
